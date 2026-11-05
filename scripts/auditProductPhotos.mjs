import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { tmpdir } from 'node:os'
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'vite'

const root = process.cwd()
const vite = await createServer({ configFile: false, cacheDir: path.join(tmpdir(), 'bazaar-vite-audit-cache'), optimizeDeps: { noDiscovery: true, include: [] }, logLevel: 'error', server: { middlewareMode: true }, appType: 'custom' })
let products
let productPhotos
try {
  ({ products } = await vite.ssrLoadModule('/src/data/products.js'))
  ;({ productPhotos } = await vite.ssrLoadModule('/src/data/productImages.js'))
} finally { await vite.close() }
const categories = {}
const sources = {}
const assets = new Map()
const missing = []
const invalid = []
for (const product of products) {
  const category = categories[product.category] ??= { total: 0, images: 0, missing: 0, invalid: 0, multiImage: 0 }
  category.total++
  if (product.image) {
    category.images++
    const source = product.photo?.author ?? 'Unattributed existing asset'
    sources[source] = (sources[source] ?? 0) + 1
    if (product.images.length > 1) category.multiImage++
    const file = decodeURIComponent(product.image.split('/').pop())
    const bytes = await readFile(path.join(root, 'public', 'products', file))
    const hash = createHash('sha256').update(bytes).digest('hex')
    const current = assets.get(hash) ?? []
    current.push({ id: product.id, file })
    assets.set(hash, current)
  } else if (product.imageReview === 'needs-product-photo-review') {
    category.invalid++
    invalid.push({ id: product.id, category: product.category, title: product.title, photoTitle: productPhotos[product.id]?.title, source: productPhotos[product.id]?.author })
  } else {
    category.missing++
    missing.push({ id: product.id, category: product.category, title: product.title })
  }
}
const duplicateAssets = [...assets.values()].filter((rows) => rows.length > 1)
const summary = {
  total: products.length,
  mapped: products.filter((product) => product.image).length,
  missing: missing.length,
  invalid: invalid.length,
  multiImageProducts: products.filter((product) => product.image && product.images.length > 1).length,
  uniqueImageFiles: new Set(products.filter((product) => product.image).map((product) => product.image)).size,
  sources,
  duplicateImageHashes: duplicateAssets,
  categories,
  missingProducts: missing,
  invalidProducts: invalid,
}
await mkdir(path.join(root, 'artifacts'), { recursive: true })
await writeFile(path.join(root, 'artifacts', 'product-image-audit.json'), JSON.stringify(summary, null, 2))
process.stdout.write(JSON.stringify({ total: summary.total, mapped: summary.mapped, missing: summary.missing, invalid: summary.invalid, multiImageProducts: summary.multiImageProducts, duplicateImageFiles: summary.duplicateImageHashes.length, sources: summary.sources, categories: summary.categories }, null, 2) + '\n')
