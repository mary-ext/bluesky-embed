import { useEffect, useMemo, useState } from 'preact/hooks';

import type { AppBskyActorDefs, AppBskyFeedDefs, AppBskyFeedPost } from '@atcute/client/lexicons';
import { fetchPost, type PostData } from 'bluesky-post-embed/core';
import { fetchProfileFeed, type ProfileFeedData } from 'bluesky-profile-feed-embed/core';

import { getPostUrl } from 'internal/utils/bsky-url.ts';
import { formatLongDate } from 'internal/utils/date.ts';
import { parseAtUri } from 'internal/utils/syntax/at-url.ts';

import { escapeHtml } from './utils/html';
import { isValidAtIdentifier, isValidRecordKey } from './utils/strings';

import BlueskyPost from './components/bluesky-post';
import BlueskyProfileFeed from './components/bluesky-profile-feed';
import CodeBlock from './components/code-block';

const DEFAULT_URL = 'https://bsky.app/profile/did:plc:ragtjsm2j2vknwkz3zp4oxrd/post/3kj2umze7zj2n';

const App = () => {
	const [urlInput, setUrlInput] = useState('');

	const matched = useMemo(() => extractUrl(urlInput || DEFAULT_URL), [urlInput]);

	return (
		<div class="app">
			<h1 class="header">
				<code>&lt;bluesky-embed&gt;</code>
			</h1>

			<label class="input-wrapper">
				<span class="label">Bluesky post or profile URL</span>
				<input
					type="url"
					placeholder={DEFAULT_URL}
					value={urlInput}
					onInput={(ev) => setUrlInput(ev.currentTarget.value)}
					class="text-input"
				/>
			</label>

			{!matched ? (
				<main class="main">
					<div class="alert">Invalid URL, did you type it correctly?</div>
				</main>
			) : matched.type === 'post' ? (
				<PostEmbedding key={urlInput} matched={matched} />
			) : matched.type === 'profile' ? (
				<ProfileFeedEmbedding key={urlInput} matched={matched} />
			) : null}

			<footer class="footer">
				<span>
					made with ❤️ by <a href="https://bsky.app/profile/did:plc:ia76kvnndjutgedggx2ibrem">@mary.my.id</a>
				</span>
				<span aria-hidden="true"> · </span>
				<span>
					<a href="https://github.com/mary-ext/bluesky-embed">source code</a>
				</span>
				<span aria-hidden="true"> · </span>
				<span>MIT License</span>
			</footer>
		</div>
	);
};

export default App;

const CircularSpinner = () => {
	return (
		<svg viewBox="0 0 32 32" class="circular-spinner">
			<circle cx="16" cy="16" fill="none" r="14" stroke-width="4" class="background" />
			<circle
				cx="16"
				cy="16"
				fill="none"
				r="14"
				stroke-width="4"
				stroke-dasharray="80px"
				stroke-dashoffset="60px"
				class="accented"
			/>
		</svg>
	);
};

// #region Post embedding
type PostEmbeddingResult = { ok: true; data: PostData } | { ok: false; message: string };

const PostEmbedding = ({ matched }: { matched: ExtractedPostInfo }) => {
	const [result, setResult] = useState<PostEmbeddingResult>();

	useEffect(() => {
		if (result) {
			return;
		}

		const controller = new AbortController();
		const signal = controller.signal;

		const promise = fetchPost({
			uri: `at://${matched.author}/app.bsky.feed.post/${matched.rkey}`,
			signal: signal,
			contextless: false,
		});

		promise.then(
			(data) => {
				if (signal.aborted) {
					return;
				}

				setResult({ ok: true, data });
			},
			(err) => {
				if (signal.aborted) {
					return;
				}

				setResult({ ok: false, message: '' + err });
			},
		);

		return () => controller.abort();
	}, [matched, result]);

	return (
		<main class="main">
			{!result ? (
				<CircularSpinner />
			) : !result.ok ? (
				<div class="alert">{result.message}</div>
			) : (
				<>
					<BlueskyPost data={result.data} />

					{result.data.thread ? (
						<div class="guide">
							<h4 class="guide-header">How do I embed this to my website?</h4>

							<div class="inform">
								Doing server-side rendering? Check out examples for{' '}
								<a href="https://github.com/mary-ext/bluesky-embed-astro">Astro</a> and{' '}
								<a href="https://github.com/mary-ext/bluesky-embed-sveltekit">SvelteKit</a>.
							</div>

							<ol class="guide-instructions">
								<li>
									<p>
										Insert the following scripts and stylesheets to the <code>&lt;head&gt;</code> of your
										website.
									</p>
									<CodeBlock code={getPrerequisitePostMarkup()} />
								</li>

								<li>
									<p>Insert the following markup in wherever you want the post to be.</p>
									<CodeBlock code={getPostMarkup(result.data.thread.post)} />
								</li>
							</ol>
						</div>
					) : null}
				</>
			)}
		</main>
	);
};

const getPrerequisitePostMarkup = () => {
	const JSDELIVR_URL = `https://cdn.jsdelivr.net/npm/bluesky-post-embed@^1.0.0`;

	return `<!-- Core web component and styling -->
<script type="module" src="${JSDELIVR_URL}/+esm"></script>
<link rel="stylesheet" href="${JSDELIVR_URL}/dist/core.min.css">

<!-- Built-in themes -->
<link rel="stylesheet" href="${JSDELIVR_URL}/themes/light.min.css" media="(prefers-color-scheme: light)">
<link rel="stylesheet" href="${JSDELIVR_URL}/themes/dim.min.css" media="(prefers-color-scheme: dark)">

<!-- Fallback/placeholder elements if JS script is taking a while to load or is failing -->
<style>
  .bluesky-post-fallback {
    margin: 16px 0;
    border-left: 3px solid var(--divider);
    padding: 4px 8px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
  .bluesky-post-fallback p {
    margin: 0 0 8px 0;
  }
</style>
`;
};

const getPostMarkup = (post: AppBskyFeedDefs.PostView) => {
	const author = post.author;
	const record = post.record as AppBskyFeedPost.Record;

	return `<bluesky-post src="${escapeHtml(post.uri)}">
  <blockquote class="bluesky-post-fallback">
    <p dir="auto">${escapeHtml(record.text)}</p>
    — ${author.displayName?.trim() ? `${escapeHtml(author.displayName)} (@${escapeHtml(author.handle)})` : `@${escapeHtml(author.handle)}`}
    <a href="${escapeHtml(getPostUrl(author.did, parseAtUri(post.uri).rkey))}">${formatLongDate(post.indexedAt)}</a>
  </blockquote>
</bluesky-post>
`;
};
// #endregion

// #region Profile feed embedding
type ProfileFeedEmbeddingResult = { ok: true; data: ProfileFeedData } | { ok: false; message: string };

const ProfileFeedEmbedding = ({ matched }: { matched: ExtractedProfileInfo }) => {
	const [result, setResult] = useState<ProfileFeedEmbeddingResult>();

	useEffect(() => {
		if (result) {
			return;
		}

		const controller = new AbortController();
		const signal = controller.signal;

		const promise = fetchProfileFeed({
			actor: matched.actor,
			signal: signal,
			includePins: true,
		});

		promise.then(
			(data) => {
				if (signal.aborted) {
					return;
				}

				setResult({ ok: true, data });
			},
			(err) => {
				if (signal.aborted) {
					return;
				}

				setResult({ ok: false, message: '' + err });
			},
		);

		return () => controller.abort();
	}, [matched, result]);

	return (
		<main class="main">
			{!result ? (
				<CircularSpinner />
			) : !result.ok ? (
				<div class="alert">{result.message}</div>
			) : (
				<>
					<BlueskyProfileFeed data={result.data} />

					{result.data.profile ? (
						<div class="guide">
							<h4 class="guide-header">How do I embed this to my website?</h4>

							<div class="inform">
								Doing server-side rendering? Check out examples for{' '}
								<a href="https://github.com/mary-ext/bluesky-embed-astro">Astro</a> and{' '}
								<a href="https://github.com/mary-ext/bluesky-embed-sveltekit">SvelteKit</a>.
							</div>

							<ol class="guide-instructions">
								<li>
									<p>
										Insert the following scripts and stylesheets to the <code>&lt;head&gt;</code> of your
										website.
									</p>
									<CodeBlock code={getPrerequisiteProfileFeedMarkup()} />
								</li>

								<li>
									<p>Insert the following markup in wherever you want the profile feed to be.</p>
									<CodeBlock code={getProfileFeedMarkup(result.data.profile)} />
								</li>
							</ol>
						</div>
					) : null}
				</>
			)}
		</main>
	);
};

const getPrerequisiteProfileFeedMarkup = () => {
	const JSDELIVR_URL = `https://cdn.jsdelivr.net/npm/bluesky-profile-feed-embed@^1.0.0`;

	return `<!-- Core web component and styling -->
<script type="module" src="${JSDELIVR_URL}/+esm"></script>
<link rel="stylesheet" href="${JSDELIVR_URL}/dist/core.min.css">

<!-- Built-in themes -->
<link rel="stylesheet" href="${JSDELIVR_URL}/themes/light.min.css" media="(prefers-color-scheme: light)">
<link rel="stylesheet" href="${JSDELIVR_URL}/themes/dim.min.css" media="(prefers-color-scheme: dark)">
`;
};

const getProfileFeedMarkup = (profile: AppBskyActorDefs.ProfileViewDetailed) => {
	const url = `https://bsky.app/profile/${profile.did}`;

	return `<bluesky-profile-feed actor="${escapeHtml(profile.did)}" include-pins>
  <a target="_blank" href="${escapeHtml(url)}" class="bluesky-profile-feed-fallback">
    ${
			profile.displayName?.trim()
				? `Posts by ${escapeHtml(profile.displayName)} (@${escapeHtml(profile.handle)})`
				: `Posts by @${escapeHtml(profile.handle)}`
		}
  </a>
</bluesky-profile-feed>
`;
};

// #endregion

type ExtractedPostInfo = { type: 'post'; author: string; rkey: string };
type ExtractedProfileInfo = { type: 'profile'; actor: string };
type ExtractedInfo = ExtractedPostInfo | ExtractedProfileInfo;

const safeParseUrl = (str: string): URL | null => {
	let url: URL | null | undefined;
	if ('parse' in URL) {
		url = URL.parse(str);
	} else {
		try {
			// @ts-expect-error: `'parse' in URL` is giving truthy
			url = new URL(str);
		} catch {}
	}

	if (url && (url.protocol === 'https:' || url.protocol === 'http:')) {
		return url;
	}

	return null;
};

const extractUrl = (str: string): ExtractedInfo | null => {
	const url = safeParseUrl(str);
	if (!url) {
		return null;
	}

	let match: RegExpExecArray | null | undefined;
	if (url.host === 'bsky.app' || url.host === 'staging.bsky.app' || url.host === 'main.bsky.dev') {
		if ((match = /^\/profile\/([^/]+)\/post\/([^/]+)\/?$/.exec(url.pathname))) {
			if (!isValidAtIdentifier(match[1]) || !isValidRecordKey(match[2])) {
				return null;
			}

			return { type: 'post', author: match[1], rkey: match[2] };
		}

		if ((match = /^\/profile\/([^/]+)\/?$/.exec(url.pathname))) {
			if (!isValidAtIdentifier(match[1])) {
				return null;
			}

			return { type: 'profile', actor: match[1] };
		}
	}

	return null;
};
