import { Hono } from "hono";

const utilsRouter = new Hono().get("/getRandomUUID", (c) => {
  return c.json({ uuid: crypto.randomUUID() }, 200);
});

export default utilsRouter;
