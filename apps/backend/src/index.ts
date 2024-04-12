import { Hono } from "hono";
import { userRouter } from "./route/user";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
}>();

app.route("/api/v1/user", userRouter);

export default app;
