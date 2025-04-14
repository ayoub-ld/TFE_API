declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Common
      NODE_ENV: string;
      PORT: string;
      // Database
      DATABASE_URL: string;
      // Json Web Token
      JWT_SECRET: string;
      JWT_ISSUER: string;
      JWT_AUDIENCE: string;
    }
  }
}

export default global;
