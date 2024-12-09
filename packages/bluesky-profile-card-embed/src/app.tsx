import { useEffect, useMemo, useState } from 'preact/hooks';

import type { ProfileCardData } from 'internal/types/profile-card.js';
import { fetchProfileCard, renderProfileCard } from '../lib/core';

const actor = `patak.dev`;

const App = () => {
	const [state, setState] = useState<{ actor: string; data: ProfileCardData }>();

	useEffect(() => {
		if (state && state.actor === actor) {
			return;
		}

		const controller = new AbortController();
		const promise = fetchProfileCard({
			actor: actor,
			signal: controller.signal,
			allowUnauthenticated: true,
		});

		promise.then((data) => {
			setState({ actor, data });
		});

		return () => {
			controller.abort();
		};
	}, [actor]);

	return <div class="app">{state && <BlueskyProfileCard data={state.data} />}</div>;
};

export default App;

const BlueskyProfileCard = ({ data }: { data: ProfileCardData }) => {
	const html = useMemo(() => renderProfileCard(data), [data, renderProfileCard]);

	return (
		<bluesky-profile-card
			actor={data.profile?.did}
			dangerouslySetInnerHTML={{ __html: html }}
		></bluesky-profile-card>
	);
};

declare module 'preact' {
	namespace JSX {
		interface BlueskyProfileCardAttributes extends HTMLAttributes<HTMLElement> {
			actor?: string;
		}

		interface IntrinsicElements {
			'bluesky-profile-card': BlueskyProfileCardAttributes;
		}
	}
}
