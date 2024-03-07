import { router } from "./routes/routes.js";
import { Application, Session } from "./deps.js";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { userMiddleware } from "./middlewares/userMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";

const app = new Application();

app.use(Session.initMiddleware());
app.use(serveStaticMiddleware);
app.use(renderMiddleware);
app.use(errorMiddleware);
app.use(router.routes());
app.use(authMiddleware);
app.use(userMiddleware);
app.use(oakCors());

export { app };
