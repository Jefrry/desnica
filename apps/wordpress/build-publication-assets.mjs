import { copyFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(new URL('../web/package.json', import.meta.url));
const { build } = require('esbuild');
const dist = new URL('./theme/assets/dist/', import.meta.url);

await build({
  entryPoints: [fileURLToPath(new URL('./theme/assets/publication-code.js', import.meta.url))],
  outfile: fileURLToPath(new URL('publication-code.js', dist)),
  alias: { 'highlight.js': require.resolve('highlight.js') },
  bundle: true,
  minify: true,
  target: 'es2020',
});
await copyFile(
  require.resolve('highlight.js/LICENSE'),
  new URL('highlight.js-LICENSE.txt', dist),
);
