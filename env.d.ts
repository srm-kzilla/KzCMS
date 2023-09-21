import { envSchemaType } from './src/config/index';
declare global {
  namespace NodeJS {
    interface ProcessEnv extends envSchemaType {
      JATIN: string;
    }
  }
}
