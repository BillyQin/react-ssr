const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const static = require('koa-static');
const appServer = require('./server/app-server.js')

const htmlFile = path.join(__dirname, './dist/index.html')
const staticFolder = path.join(__dirname, './dist')
const port = process.env.PORT || 3000;

function server (port) {
  const app = new Koa()
  const router = new Router()
  const template = fs.readFileSync(htmlFile, {encoding: 'utf-8'})

  router.get('*', async (ctx,next) => {
    if (ctx.url.startsWith('/static')) {
      await next()
    } else {
      const html = appServer.default(ctx)
      ctx.body = template.replace('<!-- HTML_PLACEHOLDER -->', html)
    }
  })

  app.use(router.routes())
  app.use(static(staticFolder))

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`)
  })
}

server(port)
