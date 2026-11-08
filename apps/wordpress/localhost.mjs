// Windows fallback when WSL does not forward Podman's published port to localhost.
import net from 'node:net';
import { execFileSync } from 'node:child_process';

const port = Number(process.argv[2] ?? 8080);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid port.');

const addresses = execFileSync('podman', ['machine', 'ssh', 'ip -4 -o addr show eth0'], {
  encoding: 'utf8',
});
const targetHost = addresses.match(/\binet (\d+\.\d+\.\d+\.\d+)\//)?.[1];
if (!targetHost) throw new Error('Could not determine the Podman machine IPv4 address.');

const server = net.createServer((client) => {
  const upstream = net.connect({ host: targetHost, port });
  client.pipe(upstream);
  upstream.pipe(client);
  const close = () => { client.destroy(); upstream.destroy(); };
  client.on('error', close);
  upstream.on('error', close);
  client.on('close', () => upstream.destroy());
  upstream.on('close', () => client.destroy());
});
server.on('error', (error) => {
  console.error(`Local WordPress forwarding failed: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`http://localhost:${port} -> Podman ${targetHost}:${port}; Ctrl+C to stop forwarding.`);
});
