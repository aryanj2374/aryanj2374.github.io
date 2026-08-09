import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const outputDirectory = join(projectRoot, 'dist')
const indexPath = join(outputDirectory, 'index.html')

let html = await readFile(indexPath, 'utf8')
const scriptTag = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)
const styleTag = html.match(/<link rel="stylesheet" crossorigin href="([^"]+)">/)

if (!scriptTag || !styleTag) {
  throw new Error('Expected Vite JavaScript and stylesheet assets were not found in dist/index.html')
}

const resolveAsset = (assetUrl) => join(outputDirectory, assetUrl.replace(/^\.\//, ''))
const javascript = (await readFile(resolveAsset(scriptTag[1]), 'utf8')).replaceAll('</script', '<\\/script')
const stylesheet = (await readFile(resolveAsset(styleTag[1]), 'utf8')).replaceAll('</style', '<\\/style')

html = html
  .replace(scriptTag[0], () => `<script type="module">${javascript}</script>`)
  .replace(styleTag[0], () => `<style>${stylesheet}</style>`)

await writeFile(indexPath, html)
