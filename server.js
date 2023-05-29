import 'dotenv/config';

import fs from 'fs/promises'
import path from 'path'
import _http from "http";
import express from "express";
import helmet from "helmet";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from 'vite'


const { PORT, NODE_ENV } = process.env;
const DEV_ENV = 'development';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();
if (NODE_ENV !== DEV_ENV) {
  app.use(helmet())
}

const http = new _http.Server(app);

const bootstrap = async () => {
  let vite

  if (NODE_ENV === DEV_ENV) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })

    app.use(vite.middlewares)
  } else {
    app.use(express.static(path.resolve(__dirname, "dist/client/pages")))
    app.use(express.static(path.resolve(__dirname, "dist/client")))
  }

  app.get(
    '*',
    async (req, res, next) => {
      const url = req.originalUrl

      let template, render

      try {
        if (NODE_ENV === DEV_ENV) {
          template = await fs.readFile(path.resolve('./index.html'), 'utf-8')
          template = await vite.transformIndexHtml(url, template)

          render = (await vite.ssrLoadModule('/src/entry-server.tsx')).SSRRender
        } else {
          template = await fs.readFile(
            path.resolve('dist/client/index.html'),
            'utf-8'
          )
          render = (await import('./dist/server/entry-server.js')).SSRRender
        }

        const appHtml = await render({ path: url })
        const html = template.replace('<!--ssr-outlet-->', appHtml)

        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html').end(html)
      } catch (error) {
        vite.ssrFixStacktrace(error)
        next(error)
      }
    }
  )

  return { app, http }
}

bootstrap()
  .then(async ({ app, http }) => {
    http.listen(PORT || 3333, () => {
      console.log(
        `  App is running at http://localhost:${PORT} in ${NODE_ENV} mode`,
      );
      console.log("  Press CTRL-C to stop\n");
    });
  })
  .catch(console.error)
