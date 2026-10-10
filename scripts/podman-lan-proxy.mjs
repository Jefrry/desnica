import net from 'node:net'
import { execFileSync } from 'node:child_process'

const listenHost = process.env.LAN_PROXY_HOST || '0.0.0.0'
const targetHost = process.env.PODMAN_VM_IP || discoverPodmanVmIp()

function discoverPodmanVmIp() {
  const output = execFileSync(
    'podman',
    ['machine', 'ssh', "ip -4 addr show eth0 | sed -n 's/.*inet \\([^/]*\\).*/\\1/p'"],
    { encoding: 'utf8' },
  ).trim()

  if (!output) {
    throw new Error('Could not determine the Podman VM IP address')
  }

  return output
}

const forwards = [
  { name: 'web', port: 3000 },
  { name: 'cms', port: 1337 },
]

for (const forward of forwards) {
  const server = net.createServer((client) => {
    const upstream = net.connect({ host: targetHost, port: forward.port })

    client.pipe(upstream)
    upstream.pipe(client)

    const close = () => {
      client.destroy()
      upstream.destroy()
    }

    client.on('error', close)
    upstream.on('error', close)
  })

  server.on('error', (error) => {
    console.error(`${forward.name} proxy failed:`, error)
    process.exitCode = 1
  })

  server.listen(forward.port, listenHost, () => {
    console.log(`${forward.name}: ${listenHost}:${forward.port} -> ${targetHost}:${forward.port}`)
  })
}
