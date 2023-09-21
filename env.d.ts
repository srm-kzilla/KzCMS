import { EnvSchemaType } from './src/config/index';
declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvSchemaType {
      JATIN: string;
    }
  }
}
