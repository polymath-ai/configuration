/* Adapter for loading and saving configuration as JSON files */

import { promises as fs } from 'fs';

export class JSONStore {
  root: string;

  constructor(root: string) {
    this.root = root;
  }

  async load<T>(config: any): Promise<T> {
    const filename = `${this.root}/config.${config.location}.json`
    const data: any = await fs.readFile(filename, 'utf8');
    return config.create(JSON.parse(data)) as T;
  }
}