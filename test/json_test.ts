import test from 'ava';

import { JSONStore } from '../src/json.js';
import { Config, ConfigType, ConfigHandler } from '../src/config.js';


const info_schema = {
  type: 'object',
  properties: {
    headername: { type: 'string', default: '' },
    placeholder: { type: 'string', default: '' },
    fun_queries: { type: 'array', items: { type: 'string' }, default: [] },
    source_prefixes: {
      type: 'object',
      properties: { values: { type: 'string' } }, default: {}
    },
  }
};

const host_schema = {
  type: 'object',
  properties: {
    endpoint: { type: 'string' },
    info: info_schema,
  }
};

type HostType = ConfigType<typeof host_schema>;
const Host: ConfigHandler<HostType> = Config(host_schema, 'host');

test('load JSON file', t => {
  const store = new JSONStore('./test');
  const config: HostType = store.load(Host);
  t.is(config.endpoint, 'https://polymath.glazkov.com/');
});