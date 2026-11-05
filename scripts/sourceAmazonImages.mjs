import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile, appendFile } from 'node:fs/promises'
import path from 'node:path'
import { tmpdir } from 'node:os'
import { createServer } from 'vite'

const root = process.cwd()
const productsDir = path.join(root, 'public', 'products')
const sourceMap = path.join(root, 'src', 'data', 'productImages.js')
const reportPath = path.join(root, 'artifacts', 'amazon-image-source-report.json')
const concurrency = Math.max(1, Math.min(4, Number(process.argv.find((arg) => arg.startsWith('--concurrency='))?.split('=')[1] ?? 3)))
const pauseMs = Math.max(0, Number(process.argv.find((arg) => arg.startsWith('--pause='))?.split('=')[1] ?? 450))
const limitArg = Number(process.argv.find((arg) => arg.startsWith('--limit='))?.split('=')[1] ?? 0)
const stopWords = new Set('the and for with from by in on at of to a an men man women woman mens womens latest new original genuine official buy online price india gb tb ram rom 5g road edt edp eau toilette'.split(' '))
const colorWords = new Set('black white gray grey blue navy red green purple lavender violet pink silver gold beige cream brown tan graphite titanium midnight starlight rose orange yellow teal ivory mocha sand storm indigo copper'.split(' '))
const storageNumbers = new Set('16 32 64 128 256 512 1024 2048'.split(' '))
const categoryAccessories = { mobiles: 'case cover charger cable protector adapter holder mount skin', laptops: 'case sleeve bag charger adapter stand skin' }
const decode = (text) => text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const tokens = (text) => new Set(text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/([a-z])(\d)/g, '$1 $2').replace(/(\d)([a-z])/g, '$1 $2').replace(/[^a-z0-9]+/g, ' ').split(' ').filter((token) => (token.length > 1 || /^\d$/.test(token)) && !stopWords.has(token)))
const attr = (tag, key) => decode(tag.match(new RegExp(`\\b${key}=["']([^"']*)["']`, 'i'))?.[1] ?? '')
const slug = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const modelNumbers = (title, wanted) => {
  const measured = new Set()
  for (const match of title.toLowerCase().matchAll(/(\d+(?:\.\d+)?)\s*(?:gb|tb|kg|mg|ml|mah|hz|w|g|cm|mm|inch(?:es)?|in|l|m|pieces?|pcs?)\b/g)) for (const part of match[1].split('.')) measured.add(part)
  return [...wanted].filter((token) => /\d/.test(token) && !storageNumbers.has(token) && !measured.has(token))
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const vite = await createServer({ configFile: false, cacheDir: path.join(tmpdir(), 'bazaar-vite-amazon-cache'), optimizeDeps: { noDiscovery: true, include: [] }, logLevel: 'error', server: { middlewareMode: true }, appType: 'custom' })
let products
try { ({ products } = await vite.ssrLoadModule('/src/data/products.js')) } finally { await vite.close() }

const existingFiles = await readFile(sourceMap, 'utf8')
const knownFiles = new Set([...existingFiles.matchAll(/file:\s*'([^']+)'/g)].map((match) => match[1]))
const seenHashes = new Set()
for (const file of knownFiles) {
  try { seenHashes.add(createHash('sha256').update(await readFile(path.join(productsDir, file))).digest('hex')) } catch { /* Keep report of any broken source separately. */ }
}
const unresolved = products.filter((product) => !product.image && !product.photo?.generated)
const targets = limitArg > 0 ? unresolved.slice(0, limitArg) : unresolved
const report = { startedAt: new Date().toISOString(), totalProducts: products.length, flipkartUnmatched: targets.length, sourced: [], skipped: [], failed: [] }
await mkdir(productsDir, { recursive: true })
await mkdir(path.dirname(reportPath), { recursive: true })

let nextIndex = 0
let completed = 0
async function sourceOne(product) {
  const query = `${product.brand} ${product.title}`.replace(/\s+/g, ' ').trim()
  const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`
  try {
    const response = await fetch(searchUrl, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/132.0.0.0 Safari/537.36', accept: 'text/html,application/xhtml+xml' }, signal: AbortSignal.timeout(25000) })
    if (!response.ok) throw new Error(`search HTTP ${response.status}`)
    const html = await response.text()
    const wanted = tokens(query)
    const titleTokens = tokens(product.title)
    const brandTokens = tokens(product.brand)
    const candidates = []
    for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
      const title = attr(tag, 'alt')
      if (!title) continue
      const got = tokens(title)
      const overlap = [...wanted].filter((token) => got.has(token))
      const brandOverlap = [...brandTokens].filter((token) => got.has(token)).length
      const titleOverlap = [...titleTokens].filter((token) => got.has(token)).length
      const identityTokens = [...titleTokens].filter((token) => !brandTokens.has(token) && !/\d/.test(token) && !colorWords.has(token))
      const identityOverlap = identityTokens.filter((token) => got.has(token)).length
      const expectedColors = [...titleTokens].filter((token) => colorWords.has(token))
      const listedColors = [...got].filter((token) => colorWords.has(token))
      const requiredModelNumbers = modelNumbers(product.title, wanted)
      const score = overlap.length / Math.max(wanted.size, 1)
      if (brandOverlap === 0 || titleOverlap < 2 || score < 0.28) continue
      if (identityTokens.length && identityOverlap < 1) continue
      if (requiredModelNumbers.length && !requiredModelNumbers.every((token) => got.has(token))) continue
      if (expectedColors.length && listedColors.length && !expectedColors.some((color) => listedColors.includes(color))) continue
      const accessories = (categoryAccessories[product.category] ?? '').split(' ').filter(Boolean)
      if (accessories.some((term) => got.has(term) && !titleTokens.has(term))) continue
      const srcset = attr(tag, 'srcset')
      const srcsetUrls = [...srcset.matchAll(/(https?:\/\/[^\s,]+)\s+([\d.]+)x/g)].map((match) => ({ url: match[1], density: Number(match[2]) }))
      const imageUrl = srcsetUrls.sort((a, b) => b.density - a.density)[0]?.url || attr(tag, 'src')
      if (!imageUrl.startsWith('https://m.media-amazon.com/images/')) continue
      candidates.push({ title, imageUrl, score, titleOverlap })
    }
    candidates.sort((a, b) => b.score - a.score || b.titleOverlap - a.titleOverlap)
    if (!candidates.length) {
      report.skipped.push({ id: product.id, query, reason: 'No Amazon result passed product, model and color checks' })
      return
    }
    for (const candidate of candidates.slice(0, 6)) {
      const imageResponse = await fetch(candidate.imageUrl, { headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/132.0.0.0 Safari/537.36', referer: 'https://www.amazon.in/' }, signal: AbortSignal.timeout(18000) })
      if (!imageResponse.ok) continue
      const bytes = Buffer.from(await imageResponse.arrayBuffer())
      if (bytes.length < 5000 || !(bytes[0] === 0xff && bytes[1] === 0xd8) && !(bytes[0] === 0x89 && bytes[1] === 0x50) && !(bytes[0] === 0x52 && bytes[1] === 0x49)) continue
      const hash = createHash('sha256').update(bytes).digest('hex')
      if (seenHashes.has(hash)) continue
      seenHashes.add(hash)
      const file = `amazon-${slug(product.id)}.jpg`
      await writeFile(path.join(productsDir, file), bytes)
      report.sourced.push({ id: product.id, file, title: candidate.title, sourceUrl: candidate.imageUrl, score: Number(candidate.score.toFixed(3)), bytes: bytes.length })
      await appendFile(sourceMap, `\nproductPhotos['${product.id}'] = { file: '${file}', title: ${JSON.stringify(candidate.title)}, author: 'Amazon India product listing', license: 'Product image sourced from Amazon India for this practice project' }\n`)
      return
    }
    report.skipped.push({ id: product.id, query, reason: 'Candidate image downloads failed or duplicated another product image' })
  } catch (error) {
    report.failed.push({ id: product.id, query, reason: error?.message ?? String(error) })
  }
}

async function worker() {
  while (nextIndex < targets.length) {
    await sourceOne(targets[nextIndex++])
    completed++
    if (completed % 20 === 0 || completed === targets.length) {
      report.updatedAt = new Date().toISOString()
      await writeFile(reportPath, JSON.stringify(report, null, 2))
      process.stdout.write(`checked ${completed}/${targets.length}; sourced ${report.sourced.length}; skipped ${report.skipped.length}; failed ${report.failed.length}\n`)
    }
    if (pauseMs) await sleep(pauseMs)
  }
}
await Promise.all(Array.from({ length: concurrency }, () => worker()))
report.completedAt = new Date().toISOString()
report.added = report.sourced.length
report.remainingUnmatched = report.skipped.length + report.failed.length
await writeFile(reportPath, JSON.stringify(report, null, 2))
process.stdout.write(`done: ${report.added} Amazon images added; ${report.remainingUnmatched} remain unmatched\n`)
