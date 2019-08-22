if(typeof window === 'undefined') {
  global.window = {}
}

const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const static = require('koa-static');
const appServer = require('./server/app-server.js').default
const jsondata = require('./mock/products.json')
const cors = require('koa-cors')
const http = require('http')
const creatServerStore = require('./server/store-server.js').default

const htmlFile = path.join(__dirname, './dist/index.html')
const staticFolder = path.join(__dirname, './dist')
const port = process.env.PORT || 3000;
const excludes = ['/static', '/api'];
const routes = require('./server/route-server.js').default;

function server (port) {
  const app = new Koa()
  const router = new Router()
  const template = fs.readFileSync(htmlFile, {encoding: 'utf-8'})

  app.use(cors())

  router.get('*', async (ctx,next) => {
    if (excludes.some(v => ctx.url.includes(v))) {
      await next()
    } else {
      let initialState = ''
      const store = creatServerStore()
      let route = routes.find(r => r.path === ctx.url)
      if (route && route.loadData) {
        await route.loadData(store)
        initialState = JSON.stringify(store.getState())
      }
      const html = appServer(ctx)
      ctx.body = template.replace('<!-- HTML_PLACEHOLDER -->', html)
      .replace('<!-- INITIAL_STATE -->', `<script>window.__INITIAL_STATE__ = ${initialState}</script>`)
    }
  })

  router.get('/api/products', (ctx) => {
    ctx.header = {
      'Access-Control-Allow-Origin': '*'
    }
    ctx.body = JSON.stringify(jsondata)
  })

  app.use(router.routes())
  app.use(static(staticFolder))

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`)
  })
}

server(port)

let options = {
  port: 3000,
  host: 'localhost', // 请求地址 域名，google.com等..
  path:`/api/products?name=zhihu`, // 具体路径eg:/upload
  method: 'GET', // 请求方式, 这里以post为例
  headers: { // 必选信息,  可以抓包工看一下
    'Content-Type': 'application/json'
  }
};
let req = http.get(options, (res) => {
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
});