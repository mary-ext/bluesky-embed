import * as path from 'node:path';

import type {
	ArrowFunctionExpression,
	BlockStatement,
	Expression,
	FunctionDeclaration,
	FunctionExpression,
	Node,
	Pattern,
	Program,
	Property,
	SpreadElement,
} from 'estree';
import { print } from 'esrap';
import ts from 'esrap/languages/ts';
import { compile } from 'svelte/compiler';
import type { Plugin } from 'vite';
import { walk, type Context, type Visitors } from 'zimmerframe';

const HYDRATION_COMMENT = /<!--(?:\[-?\d*|\]|)-->/g;

const RENDERER = '$$renderer';
const RUNTIME = '$';
const RUNTIME_MODULE = 'internal/render/runtime.js';

/** Tells the literal visitors to remove hydration comments from the subtree. */
type State = { strip: boolean };

type WalkContext = Context<Node, State>;

interface StaticSvelteOptions {
	cssHashPrefix: string;
	root: string;
}

export function staticSvelte({ cssHashPrefix, root }: StaticSvelteOptions): Plugin {
	const stylesheets = new Map<string, string>();

	return {
		name: 'static-svelte',
		resolveId(id) {
			return stylesheets.has(id) ? id : null;
		},
		load(id) {
			const css = stylesheets.get(id);
			if (css === undefined) return null;

			this.addWatchFile(id.slice(0, -4));
			return { code: css };
		},
		transform(source, id) {
			if (!id.endsWith('.svelte')) return null;

			const result = compile(source, {
				generate: 'server',
				css: 'external',
				cssHash({ hash, filename }) {
					return `s-` + hash(cssHashPrefix + path.relative(root, filename));
				},
				runes: true,
				filename: id,
				// We render once to a static string, so nothing is ever reactive.
				warningFilter: (warning) => warning.code !== 'state_referenced_locally',
			});

			let code = transformServerOutput(this.parse(result.js.code), id);
			if (result.css) {
				const cssId = `${id}.css`;
				code += `\nimport ${JSON.stringify(cssId)};\n`;
				stylesheets.set(cssId, result.css.code);
			}

			for (const warning of result.warnings) this.warn(warning);
			return { code };
		},
	};
}

export function transformServerOutput(program: Program, filename = 'component.svelte'): string {
	const fail: (message: string) => never = (message) => {
		throw new Error(`${filename}: ${message}`);
	};

	const isRenderer = (node: Node) => node.type === 'Identifier' && node.name === RENDERER;

	const isMethod = (node: Node, object: string, name: string) =>
		node.type === 'MemberExpression' &&
		!node.computed &&
		node.object.type === 'Identifier' &&
		node.object.name === object &&
		node.property.type === 'Identifier' &&
		node.property.name === name;

	const isEmptyString = (node: Node) =>
		(node.type === 'Literal' && node.value === '') ||
		(node.type === 'TemplateLiteral' && node.expressions.length === 0 && node.quasis[0].value.raw === '');

	const isSlots = (node: Property | SpreadElement) =>
		node.type === 'Property' &&
		!node.computed &&
		((node.key.type === 'Identifier' && node.key.name === '$$slots') ||
			(node.key.type === 'Literal' && node.key.value === '$$slots'));

	/**
	 * Replaces a `{ $$renderer.component((renderer) => { ... }) }` function body with the body of the
	 * callback. Components without state have no wrapper, their body stays as it is.
	 */
	const unwrapComponent = (body: BlockStatement): BlockStatement => {
		if (body.body.length !== 1) return body;

		const [statement] = body.body;
		if (statement.type !== 'ExpressionStatement' || statement.expression.type !== 'CallExpression') {
			return body;
		}

		const call = statement.expression;
		if (!isMethod(call.callee, RENDERER, 'component')) return body;

		const callback = call.arguments[0];
		if (
			call.arguments.length !== 1 ||
			callback.type !== 'ArrowFunctionExpression' ||
			callback.body.type !== 'BlockStatement'
		) {
			fail('unsupported Svelte component wrapper');
		}

		return callback.body;
	};

	const stripRenderer = (
		node: FunctionDeclaration | FunctionExpression | ArrowFunctionExpression,
		{ next, visit }: WalkContext,
	): Node | void => {
		const first = node.params[0];
		if (!first || !isRenderer(first)) return next();

		const params = node.params.slice(1).map((param) => visit(param) as Pattern);
		const body = visit(node.body.type === 'BlockStatement' ? unwrapComponent(node.body) : node.body);

		return { ...node, params, body } as Node;
	};

	const strip = (value: string) => value.replace(HYDRATION_COMMENT, '');

	const visitors: Visitors<Node, State> = {
		ImportDeclaration(node, { next }) {
			if (node.source.value !== 'svelte/internal/server') return next();

			return { ...node, source: { type: 'Literal', value: RUNTIME_MODULE } };
		},

		ObjectExpression(node, { next, visit }) {
			const properties = node.properties.filter((property) => !isSlots(property));
			if (properties.length === node.properties.length) return next();

			return {
				...node,
				properties: properties.map((property) => visit(property) as Property | SpreadElement),
			};
		},

		ExpressionStatement(node, { next, visit }) {
			const call = node.expression;
			if (call.type !== 'CallExpression' || !isMethod(call.callee, RENDERER, 'push')) {
				return next();
			}

			if (call.arguments.length !== 1) {
				fail('unsupported renderer push call');
			}

			const value = visit(call.arguments[0], { strip: true }) as Expression;
			if (isEmptyString(value)) {
				// esrap leaves empty statements out of the statement lists that it prints.
				return { type: 'EmptyStatement' };
			}

			return {
				type: 'ExpressionStatement',
				expression: {
					type: 'CallExpression',
					optional: false,
					callee: {
						type: 'MemberExpression',
						optional: false,
						computed: false,
						object: { type: 'Identifier', name: RUNTIME },
						property: { type: 'Identifier', name: 'push' },
					},
					arguments: [value],
				},
			};
		},

		CallExpression(node, { next, visit }) {
			if (isMethod(node.callee, RENDERER, 'component')) {
				fail('unsupported Svelte component wrapper');
			}

			if (isMethod(node.callee, RUNTIME, 'ensure_array_like')) {
				if (node.arguments.length !== 1) {
					fail('unsupported ensure_array_like call');
				}

				return visit(node.arguments[0]);
			}

			const first = node.arguments[0];
			if (first && isRenderer(first)) {
				return {
					...node,
					callee: visit(node.callee) as typeof node.callee,
					arguments: node.arguments.slice(1).map((argument) => visit(argument) as Expression),
				};
			}

			return next();
		},

		FunctionDeclaration: stripRenderer,
		FunctionExpression: stripRenderer,
		ArrowFunctionExpression: stripRenderer,

		Literal(node, { state }) {
			if (!state.strip || typeof node.value !== 'string') return;

			const value = strip(node.value);
			if (value === node.value) return;

			// `raw` is left out on purpose, esrap quotes the value for us.
			return { type: 'Literal', value };
		},

		TemplateElement(node, { state }) {
			if (!state.strip) return;

			const raw = strip(node.value.raw);
			if (raw === node.value.raw) return;

			return {
				...node,
				value: { raw, cooked: node.value.cooked != null ? strip(node.value.cooked) : node.value.cooked },
			};
		},
	};

	const transformed = walk(program as Node, { strip: false }, visitors);
	const { code } = print(transformed, ts());

	if (code.includes(RENDERER) || code.includes('$$slots')) {
		throw new Error(`${filename}: unsupported Svelte server output escaped the static transform`);
	}
	return code;
}
