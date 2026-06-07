const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function loader({ src }) {
  if (src.startsWith('http')) return src
  return `${basePath}${src}`
}
