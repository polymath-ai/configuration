import test from 'ava';
import { Config, ConfigType } from './index.js';

const simple_schema = {
  type: "object",
  properties: {
    bar: { type: "string", default: 'simple' },
    baz: { type: "integer", default: 42 },
    items: { type: "array", items: { type: "integer" }, default: [] },
    bag: {
      type: "object",
      properties: {
        values: { type: "integer" },
      },
      default: {},
    },
  },
}; 

type SimpleConfigType = ConfigType<typeof simple_schema>;
const SimpleConfig = Config(simple_schema, 'simple');


test('simple config', t => {
  let simple_args: any = {
    'bar': 'bar',
    'baz': 0,
    'items': [1, 2, 3],
    'bag': { 'a': 1 }
  }

  t.true(SimpleConfig.validate(simple_args));
});

test('simple config defaults', t => {
  const simple_config: SimpleConfigType = SimpleConfig.create({});
  t.is(simple_config.bar, 'simple');
});

test('config has location', t => {
  t.is(SimpleConfig.location, 'simple');
});

const required_field_schema = {
  type: "object",
  properties: {
    bar: { type: "string" },
    baz: { type: "integer", default: 42 },
  },
  required: ['bar']
}; 

type RequiredFieldConfigType = ConfigType<typeof required_field_schema>;
const RequiredFieldConfig = Config(required_field_schema);

test('required fields supplied', t => {
  t.true(RequiredFieldConfig.validate({ bar: 'bar' }));
});

test('complain when required field is missing', t => {
  t.false(RequiredFieldConfig.validate({}));
});


// class RequiredFieldConfig extends Config {
//   bar: string;
//   baz: number = 42;

//   constructor(args: any) { super(args) }
// }