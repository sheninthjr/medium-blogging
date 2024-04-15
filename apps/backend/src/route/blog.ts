import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

interface Post {
  title: string;
  content: string;
  authorId: string;
}

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_TOKEN: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRoute.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("authorization");
  if (!header) {
    c.status(401);
    return c.json({
      Error: "Unauthorized",
    });
  }
  const token = header.split(" ")[1];
  const response = await verify(token, c.env.JWT_TOKEN);
  if (response.id) {
    c.set("userId", response.id);
    await next();
  } else {
    c.status(403);
    return c.json({
      Error: "Unauthorized User",
    });
  }
});

blogRoute.post("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body: Post = await c.req.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: body.authorId,
    },
  });
  return c.json({
    id: post.id,
  });
});

blogRoute.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const updateData = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.text("Post Updated Successfully");
});

blogRoute.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
  return c.json(post);
});

blogRoute.get("/blogs", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const posts = await prisma.post.findMany({});
  return c.json(posts);
});
