import { cp, mkdir, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const output = new URL('../dist/', import.meta.url)
const client = new URL('../dist/client/', import.meta.url)
const server = new URL('../dist/server/', import.meta.url)

await mkdir(client, { recursive: true })
await mkdir(server, { recursive: true })

const entries = await readdir(output, { withFileTypes: true })
for (const entry of entries) {
  if (entry.name === 'client' || entry.name === 'server' || entry.name === '.openai') continue
  await cp(join(output.pathname, entry.name), join(client.pathname, entry.name), { recursive: true })
}

const worker = `const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404) return response

    const acceptsHtml = request.headers.get('accept')?.includes('text/html')
    if (!acceptsHtml) return response

    const fallback = new URL('/index.html', request.url)
    return env.ASSETS.fetch(new Request(fallback, request))
  },
}

export default worker
`

await writeFile(new URL('../dist/server/index.js', import.meta.url), worker)
