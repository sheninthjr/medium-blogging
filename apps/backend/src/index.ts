import { Hono } from "hono";
import { userRouter } from "./route/user";
import { blogRoute } from "./route/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
}>();
app.use('*', cors({
  origin: 'http://localhost:5173',
  allowedHeaders: ['Origin', 'Content-Type', 'Authorization'],
  allowMethods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRoute);

export default app;
