import { Elysia } from "elysia";
import { html, Html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";

// Connect Database
import "./database/db.setup";

// Import Controllers
import AuthController from "./controllers/auth.controller";

const app = new Elysia()
  //middleware
  // HTML
  .use(html())
  // CORS
  .use(
    cors({
      origin:
        process.env.FRONTEND_URL || "mongodb://localhost:27017/dev-visit-home",
      credentials: true,
    })
  )
  // JWT
  .use(jwt({ secret: process.env.JWT_SECRET }))
  // Swagger
  .use(
    swagger({
      documentation: {
        info: {
          title: "เอกสาร API ระบบเยี่ยมบ้าน",
          description: "description",
          version: "0.1.0",
          contact: {
            name: "Elysia",
            url: "https://elysiajs.com",
            email: "",
          },
        },
        servers: [
          {
            url: "http://localhost:3000",
            description: "Development server",
          },
          {
            url: "https://api.example.com",
            description: "Production server",
          },
        ],
        tags: [
          { name: "App", description: "API ทั่วไปของระบบ" },
          {
            name: "Auth",
            description: "API สำหรับการเข้าสู่ระบบและยืนยันตัวตน ",
          },
        ],
      },
    })
  )
  // Controllers
  .group("/auth", (app) => app.use(AuthController.sign))
  // Home Page
  .get(
    "/",
    () =>
      `<html>
        <head>
          <title>Visit Home API</title>
        </head>
        <body>
          <h1>Hello Elysia</h1>
          <p>Go to <a href='/swagger'>swagger</a> for API documentation.</p>
        </body>
      </html>`,
    { detail: { tags: ["App"] } }
  )
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
