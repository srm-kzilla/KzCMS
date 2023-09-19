declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    MONGODB_URI: string;
    PORT: number;
    LOG_LEVEL: string;
    NODE_ENV: string;
    AWS_CLIENT_KEY: string;
    AWS_CLIENT_SECRET: string;
    AWS_BUCKET_NAME: string;
    AWS_REGION: string;
  }
}
