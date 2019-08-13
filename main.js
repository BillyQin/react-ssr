const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const static = require('koa-static');
const appServer = require('./server/app-server.js')
const ReactDOMServer = require('react-dom/server');

const htmlFile = path.join(__dirname, './dist/index.html')
const staticFolder = path.join(__dirname, './dist')

const port = process.env.PORT || 3000;

function server (port) {
  const app = new Koa()
  const router = new Router()
  let html = fs.readFileSync(htmlFile, {encoding: 'utf-8'})

  router.get('*', ctx => {
    let component = appServer.default(ctx.url, ctx)
    // console.log(ctx.url, ReactDOMServer.renderToString(component))
    ctx.body = html.replace('<!-- HTML_PLACEHOLDER -->', ReactDOMServer.renderToString(component))
  })

  app.use(router.routes())
  app.use(static(staticFolder))

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`)
  })
}

server(port)
