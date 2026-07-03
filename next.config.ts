import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	allowedDevOrigins: ['192.168.1.35', '192.168.1.18:3000', '192.168.1.88', '10.49.4.160'],

	// ── Transpile Three.js ecosystem so Next.js can tree-shake it ────────────
	transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing', 'lamina'],

	// ── Gzip compression for all responses ───────────────────────────────────
	compress: true,

	// ── Remove the X-Powered-By header (minor hardening + smaller response) ──
	poweredByHeader: false,

	// ── Optimise named imports so bundler only ships what is actually used ────
	experimental: {
		optimizePackageImports: ['framer-motion', 'gsap', 'three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
		// Inline CSS into the HTML document on first load, eliminating the
		// render-blocking <link rel="stylesheet"> waterfall. Improves FCP/LCP
		// for first-time visitors. Trade-off: no separate CSS cache across pages,
		// but this app is a single-page SPA so that's perfectly fine here.
		inlineCss: true,
	},

	// ── Long-lived caching headers for immutable static assets ───────────────
	async headers() {
		return [
			// 3D models — content-hashed filenames, safe to cache for 1 year
			{
				source: '/models/:path*',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
			},
			// Images
			{
				source: '/images/:path*',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
			},
			// /img/ folder (menu webp, kyas.jpg, …)
			{
				source: '/img/:path*',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
			},
			// Bundled JS (self-hosted Leaflet, helper.js, …)
			{
				source: '/js/:path*',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
			},
			// SVG favicons / icons
			{
				source: '/:file*.svg',
				headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
			},
		];
	},
};

export default nextConfig;
