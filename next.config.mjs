/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/baatz-performance',
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
}

export default nextConfig
