import fs from 'fs';
import path from 'path';
import sourceMappingURL from 'source-map-url';

import { paths } from '../../config/settings';

const RUNTIME_JS = new RegExp(/runtime-.+[.]js$/);

export function getJavaScript(entrypoints) {
  return entrypoints.filter(file => file.match(/\.js$/)); // && !file.match(RUNTIME_JS))
}

export function getInlinedJavaScript(manifest) {
  return manifest.entrypoints
    .filter(file => file.match(RUNTIME_JS))
    .map(file => {
      const filePath = path.join(paths.client.output, ...file.split('/'));
      return sourceMappingURL.removeFrom(fs.readFileSync(filePath, { encoding: 'utf8' }));
    });
}
