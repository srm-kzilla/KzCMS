import { EnvSchemaType } from '@/config/index';
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {}
  }
}
