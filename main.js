const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const static = require('koa-static');
const appServer = require('./server/app-server.js')
const jsondata = require('./mock/products.json')

const htmlFile = path.join(__dirname, './dist/index.html')
const staticFolder = path.join(__dirname, './dist')
const port = process.env.PORT || 3000;
const excludes = ['/static', '/api'];

function server (port) {
  const app = new Koa()
  const router = new Router()
  const template = fs.readFileSync(htmlFile, {encoding: 'utf-8'})

  router.get('*', async (ctx,next) => {
    if (excludes.some(v => ctx.url.includes(v))) {
      await next()
    } else {
      const html = appServer.default(ctx)
      ctx.body = template.replace('<!-- HTML_PLACEHOLDER -->', html)
    }
  })

  router.get('/api/products', (ctx) => {
    ctx.body = JSON.stringify(jsondata)
  })

  app.use(router.routes())
  app.use(static(staticFolder))

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`)
  })
}

server(port)
