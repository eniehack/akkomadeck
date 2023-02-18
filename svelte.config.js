import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: typeof import.meta.env.VITE_VERCEL_URL === "undefined"
			? adapter({
				pages: "build",
				assets: "build",
				fallback: null,
				precompress: false,
				strict: true,
			})
			: adapter({}),
		prerender: {
			entries: [
				"/",
				"/signin",
				"/signin/callback"
			]
		}
	}
};

export default config;
