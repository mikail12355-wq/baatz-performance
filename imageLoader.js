const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function loader({ src, width, quality }) {
  if (src.startsWith('http')) return src
  return `${basePath}${src}${width ? `?w=${width}` : ''}${quality ? `&q=${quality}` : ''}`
}
