import { Config, ConfigType } from '.';

const environment_schema = {
  type: 'object',
  properties: {
    openai_api_key: { type: 'string' },
    library_filename: { type: 'string', default: '' },
  },
  required: ['openai_api_key'],
};

export type EnvironmentType = ConfigType<typeof endpoint_schema>;
export const Enviornment = Config(environment_schema, 'env');

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

const restricted_schema = {
  type: 'object',
  properties: {
    count: { type: 'boolean', default: false },
    message: { type: 'string', default: '' },
  }
};

const token_schema = {
  type: 'object',
  properties: {
    token: { type: 'string' },
    description: { type: 'string', default: '' },
    access_tags: { 
      type: 'array', 
      items: { type: 'string' }, 
      default: [] 
    },
  },
}

const completions_options_schema = {
  type: 'object',
  properties: {
    model: { type: 'string', default: 'text-davinci-003' },
    prompt_template: { type: 'string', default: 'Answer the question as truthfully as possible using the provided context, and if don\'t have the answer, say \'I don\'t know\' and suggest looking for this information elsewhere.\n\nContext:\n{context} \n\nQuestion:\n{query}\n\nAnswer:' },
    max_tokens: { type: 'integer', default: 256 },
    temperature: { type: 'number', default: 0.0 },
    top_p: { type: 'number', default: 1.0 },
    n: { type: 'integer', default: 1 },
    stream: { type: 'boolean', default: false },
    logprobs: { type: 'integer' },
    stop: { type: 'string', default: '\n' },
    debug: { type: 'boolean', default: false },
  }
}

const host_schema = {
  type: 'object',
  properties: {
    endpoint: { type: 'string' },
    default_private_access_tag: { type: 'string', default: '' },
    restricted: restricted_schema,
    default_api_key: { type: 'string', default: '' },
    info: info_schema,
    tokens: {
      type: 'object',
      properties: { values: token_schema },
    },
    completions_options: completions_options_schema
  }
};

export type HostType = ConfigType<typeof host_schema>;
export const Host = Config(host_schema, 'host');

const endpoint_schema = {
  type: 'object',
  properties: {
    endpoint: { type: 'string' },
    dev_endpoint: { type: 'string', default: '' },
    token: { type: 'string', default: '' },
  },
  required: ['endpoint'],
};

const directory_schema = {
  type: 'object',
  properties: {
    hosts: {
      type: 'object',
      properties: { values: endpoint_schema }
    }
  }
};

export type DirectoryType = ConfigType<typeof directory_schema>;
export const Directory = Config(directory_schema, 'directory');