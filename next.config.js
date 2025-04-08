/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
		// typedRoutes: true
	},
	typescript: {
		ignoreBuildErrors: true,
		ignoreDuringBuilds: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	}
};

module.exports = nextConfig;
