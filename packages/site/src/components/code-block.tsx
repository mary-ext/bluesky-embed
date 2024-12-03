const CodeBlock = ({ code }: { code: string }) => {
	return (
		<div class="code-block">
			<pre>
				<code>{code}</code>
			</pre>

			<div class="actions">
				<button
					title="Copy"
					onClick={() => {
						navigator.clipboard.writeText(code).catch(() => alert(`Failed to copy to clipboard`));
					}}
					class="copy-button"
				>
					<svg fill="none" viewBox="0 0 24 24">
						<path
							stroke="currentColor"
							stroke-linecap="square"
							stroke-width="2"
							d="M15 5h4v16H5V5h4m0-2h6v4H9V3Z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default CodeBlock;
