bluesky-embed is a monorepository, a collection of custom elements for embedding Bluesky content
into any web page.

the packages live under `packages/`:

- `bluesky-post-embed/`: `<bluesky-post>`, displays a post
- `bluesky-profile-card-embed/`: `<bluesky-profile-card>`, displays a user's profile
- `bluesky-profile-feed-embed/`: `<bluesky-profile-feed>`, displays a user's feed
- `internal/`: shared components components, render runtime, utilities, and the build plugin
- `svelte-site/`: demo and documentation site

## development notes

### project management

- tools like Node.js and pnpm are managed by mise
- check `pnpm view <package>` before adding a new dependency

#### root-level tasks

- format via `pnpm run fmt` (oxfmt)

#### package-level tasks

run these inside the package directory, e.g. `cd packages/bluesky-post-embed; pnpm run ...`

- develop via `pnpm run dev` (vite)
- build via `pnpm run build` (vite)
- typecheck via `pnpm run check` (svelte-check + tsc)

### code writing

#### formatting

- name new files in kebab-case. `svelte-site` predates this and names its components in PascalCase;
  match the surrounding directory rather than mixing conventions within one
- indent with tabs (spaces allowed for diagrams in comments)
- use single quotes for strings; reserve template literals for localization (user-facing strings,
  error messages)
- add trailing commas
- order list-like constructs (arrays, object keys, union/intersection members, enum variants,
  imports, etc.) by whatever meaning the list carries — a discriminant leads the object it tags, an
  external spec or call signature keeps its own sequence — and alphabetically when nothing does.
  - CSS properties go in outside-in concentric order.

#### control flow and structure

- use braces for control statements, even single-line bodies
- group related code and limit variable scope with bare blocks `{ }`
- use `switch` over `if`/`else if` chains when branching on a single discriminant value
- use `if` over ternaries for complex statements
- delimit sections of larger files with `// #region <name>` and `// #endregion`
- import directly from source; barrel files (index modules that re-export) are out

#### functions and methods

- prefer arrow functions; use method shorthand for object/class methods
- make a parameter optional only when callers genuinely split between passing a value and relying on
  the default. drop unused defaults; promote always-passed params to required; split into a separate
  function when presence/absence flips behavior
- prefer an options object when the function takes a boolean flag (split into two functions if the
  flag selects between distinct behaviors), when two same-typed params could be swapped at the call
  site, or when there are already 2+ optional/defaulted params. positional is fine at any count when
  each param has a distinct type and a clear semantic order

#### types

- write code that satisfies the type system naturally; reach for `as Type` or `as const` only when
  TypeScript errors and no cleaner solution exists

#### mutation

- treat function arguments as immutable; callers expect their inputs to come back unchanged.
  in-place operations like `array.sort()` or `Object.assign(target, ...)` are fine on values the
  function owns — locals, clones, freshly constructed objects — but copy first (`array.toSorted()`,
  `{ ...obj, ...patch }`) before touching anything reachable through a parameter. the exception is a
  function whose documented purpose is to mutate its argument; the name and JSDoc should make that
  intent obvious

### commit workflow

we use conventional commits with these rules:

- a commit represents one logical work
- accepted types: `feat`, `fix`, `refactor`, `docs`, `chore`
  - feat
    - new additions to public API surface
  - docs
    - Markdown document changes (README.md and similar)
  - chore
    - build/tooling/dependency changes
    - tests, code comments, or JSDoc changes
    - mass-autofixes from linters and formatters
- commit type describes the substance of the change as a whole, not a category to split it by. tests
  written for a feature ship in the `feat` commit; `chore` applies when test, comment, or JSDoc work
  is the entire change
- no scopes; write `feat: ...` / `refactor: ...`, never `feat(post-embed): ...`
- append `!` after the type to mark breaking changes, e.g. `feat!:` or `refactor!:`

### documentation

"documentation" here means READMEs, code comments, JSDoc, and commit messages.

- write in lowercase, except for proper nouns, acronyms, and 'I'. public-facing interfaces (web UI)
  are exempt
- comment non-trivial code only, focusing on _why_ rather than _what_
- add JSDoc to new publicly exported functions, methods, classes, fields, and enums:
  - `@param` for parameters (no dashes after param names)
  - `@returns` for return values
  - `@throws` for exceptions when applicable
  - document the caller-facing contract: _what_ the API does, not _how_. implementation details
    (anything that could change without breaking callers) and _why_ explanations belong in regular
    code comments; the exception is rationale that constrains callers, like a precondition, which
    stays in the JSDoc
  - keep descriptions concise but informative

### agentic coding

- `.research/` in the project root is an ephemeral workspace for experiments, analysis, and planning
  materials, and may contain cloned repositories or other reference materials that inform
  implementation decisions. create if not present. its contents are local to a single working copy
  and may be wiped or absent in any future session, so committed source code (including comments,
  docstrings, commit messages, READMEs, or other docs) must not reference paths under `.research/`
  or rely on its contents existing
- this document is intentionally incomplete; discover everything else by exploring the repo
- explore the code first when unsure about plans, requirements, or existing behavior. ask for
  clarification when exploration leaves the question unresolved
- when debugging, isolate the root cause before attempting fixes: add logging, reproduce the issue,
  narrow down the scope, and confirm the exact source of the problem
- find and read code yourself with Grep/Glob/Read — they locate things directly and return the real
  source. a subagent hands back only its paraphrase of what it saw, so you'd have to verify it
  against the source anyway, and the round-trip rarely pays off: even 'where does X live?' is
  usually one search away. reserve subagents for genuinely large parallel sweeps
