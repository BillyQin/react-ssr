if (typeof window === 'undefined') {
  global.window = {}
}

const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const appServer = require('./dist/app-server.js')
// const ReactDOMServer = require('react-dom/server');

const port = process.env.PORT || 3000;

function server (port) {
  const app = new Koa()
  const router = new Router()
  const html = fs.readFileSync('./index-server.html', {encoding: 'utf-8'})
  // const component = ReactDOMServer.renderToString(appServer)

  app.use(router.routes())
  console.log(appServer)
  router.get('/', ctx => {
    ctx.body = html.replace('${content}', appServer.default)
  })

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`)
  })
}

server(port)
