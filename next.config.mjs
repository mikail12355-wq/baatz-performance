/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  ...(basePath ? { output: 'export', basePath } : {}),
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.js',
  },
}

export default nextConfig
