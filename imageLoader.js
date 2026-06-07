export default function imageLoader({ src }) {
  if (src.startsWith('http')) return src
  return `/baatz-performance${src}`
}
