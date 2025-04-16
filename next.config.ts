import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
				pathname: '/**',
				search: '',
			},
		],
	},
	experimental: {
		viewTransition: true,
	},
};

export default nextConfig;
