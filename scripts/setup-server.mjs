import { randomBytes } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { isIP } from 'node:net'
import { resolve } from 'node:path'
import { parseArgs } from 'node:util'

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      'web-port': { type: 'string', default: '3000' },
      'cms-port': { type: 'string', default: '1337' },
    },
  })
  const [host] = positionals
  if (positionals.length !== 1 || (!isIP(host ?? '') && host !== 'localhost')) {
    throw new Error('Usage: node scripts/setup-server.mjs SERVER_IP [--web-port 3000] [--cms-port 1337]')
  }

  const webPort = values['web-port']
  const cmsPort = values['cms-port']
  for (const port of [webPort, cmsPort]) {
    if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) {
      throw new Error('Ports must be integers between 1 and 65535.')
    }
  }
  if (Number(webPort) === Number(cmsPort)) {
    throw new Error('Web and CMS ports must be different.')
  }

  const address = isIP(host) === 6 ? `[${host}]` : host
  const cmsUrl = `http://${address}:${Number(cmsPort)}`
  const secret = () => randomBytes(32).toString('hex')
  const overrides = {
    WEB_PORT: String(Number(webPort)),
    CMS_PORT: String(Number(cmsPort)),
    PUBLIC_URL: cmsUrl,
    NUXT_PUBLIC_STRAPI_URL: cmsUrl,
    APP_KEYS: Array.from({ length: 4 }, secret).join(','),
    API_TOKEN_SALT: secret(),
    ADMIN_JWT_SECRET: secret(),
    TRANSFER_TOKEN_SALT: secret(),
    JWT_SECRET: secret(),
    ENCRYPTION_KEY: secret(),
    DATABASE_PASSWORD: secret(),
  }
  const template = readFileSync(new URL('../.env.example', import.meta.url), 'utf8')
  const contents = template.replace(/^([A-Z_]+)=.*$/gm, (line, key) => (
    Object.hasOwn(overrides, key) ? `${key}=${overrides[key]}` : line
  ))

  writeFileSync(resolve('.env'), contents, { flag: 'wx', mode: 0o600 })
  console.log(`Created .env. Site: http://${address}:${Number(webPort)}`)
  console.log(`Strapi: ${cmsUrl}/admin`)
}
catch (error) {
  console.error(error.code === 'EEXIST'
    ? '.env already exists; it was not changed. Edit it manually to preserve existing secrets and database access.'
    : error.message)
  process.exitCode = 1
}
