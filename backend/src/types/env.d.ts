export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_SECRET: string;
      DB_URL: string;
      FRONTEND_URL: string;
      NODE_ENV: "dev" | "production";
    }
  }
}
