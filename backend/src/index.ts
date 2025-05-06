import { Elysia } from "elysia";
import { html, Html } from "@elysiajs/html";
import { swagger } from "@elysiajs/swagger";
import { jwt } from "@elysiajs/jwt";
import { cors } from "@elysiajs/cors";

// Connect Database
import "./database/db_setup";

// Import Controllers
import AuthController from "./controllers/auth_controller";
import TeacherController from "./controllers/users/teacher_controller";
import UserController from "./controllers/users/user_controller";
import YearController from "./controllers/year_controller";

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
          version: "0.3.0",
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
          {
            name: "App",
            description: "API ทั่วไปของระบบ",
          },
          {
            name: "Auth",
            description: "API สำหรับการเข้าสู่ระบบและยืนยันตัวตน ",
          },
          {
            name: "User",
            description: "API สำหรับการจัดการผู้ใช้",
          },
          {
            name: "Teacher",
            description: "API สำหรับการจัดการข้อมูลครู",
          },
        ],
      },
    })
  )
  // Controllers
  .group("/auth", (app) => app.use(AuthController.sign))
  .group("/users", (app) =>
    app
      // User
      .use(UserController.get_users)
      .use(UserController.delete_user)
      .use(UserController.add_admin_role)
      .use(UserController.remove_admin_role)
      // Teacher
      .group("/teacher", (app) =>
        app
          .use(TeacherController.create_teacher)
          .use(TeacherController.get_teacher)
          .use(TeacherController.update_teacher)
      )
      // Student
      // Year
      .group("/year", (app) =>
        app.use(YearController.create_year).use(YearController.auto_create_year)
      )
  )
  // Home Page
  .get(
    "/",
    () =>
      `<html>
        <head>
          <title>Visit Home API</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-100 flex items-center justify-center min-h-screen">
          <div class="text-center p-8 bg-white shadow-lg rounded-lg">
            <h1 class="text-4xl font-bold text-blue-600 mb-6">
              ยินดีต้อนรับสู่ API ระบบเยี่ยมบ้านนักโรงเรียนบางแพปฐมพิทยา
            </h1>
            <p class="text-lg text-gray-700">
              ไปที่ 
              <a href='/swagger' class="text-blue-500 underline hover:text-blue-700">
                เอกสาร API
              </a> 
              เพื่อดูรายละเอียด API ทั้งหมดที่มีในระบบ
            </p>
          </div>
        </body>
      </html>`,
    { detail: { tags: ["App"] } }
  )
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
