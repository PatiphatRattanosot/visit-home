import { Elysia } from "elysia";
// Connect Database
import "./database/db.setup";
const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
