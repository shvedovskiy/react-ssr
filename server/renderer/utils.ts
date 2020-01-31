import { readFileSync } from 'fs';
import path from 'path';
import sourceMappingURL from 'source-map-url';

import { paths } from 'config/settings';

const RUNTIME_JS = new RegExp(/runtime-.+[.]js$/);

export function getJavaScript(entrypoints: string[]) {
  return entrypoints.filter(file => file.match(/\.js$/) && !file.match(RUNTIME_JS));
}

export function getInlinedJavaScript(entrypoints: string[], readFile: typeof readFileSync) {
  return entrypoints
    .filter(file => file.match(RUNTIME_JS))
    .map(file => {
      const filePath = path.join(paths.client.output, ...file.split('/'));
      return sourceMappingURL.removeFrom(readFile(filePath, 'utf8'));
    });
}
