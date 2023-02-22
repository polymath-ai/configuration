/* Adapter for loading and saving configuration as JSON files */

import * as fs from 'fs';
import { ConfigHandler } from '.';

export class JSONStore {
  root: string;

  constructor(root: string) {
    this.root = root;
  }

  load<T>(config: ConfigHandler<T>): T {
    const filename = `${this.root}/config.${config.location}.json`
    const data: any = fs.readFileSync(filename, 'utf8');
    return config.create(JSON.parse(data)) as T;
  }
}