import Ajv from 'ajv'
import { JTDDataType } from 'ajv/dist/core';

export type ConfigType<S> = JTDDataType<S>;

export function Config<T>(schema: any, location?: string) {
  const validator = new Ajv({ useDefaults: true }).compile<T>(schema);
  return {
    location: location,
    validate: validator,
    create<T>(args: any): T {
      if (!validator(args)) {
        throw new Error(`Invalid config: ${validator.errors?.map(e => e.message).join('\n')}`);
      }
      return args as unknown as T;
    }
  }
}
