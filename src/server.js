import Koa from 'koa';
import Router from 'koa-router';
import koaStatic from 'koa-static';
import appServer from '@/index-server';
import jsondata from '@/../mock/products.json';
import cors from 'koa-cors';
import creatServerStore from '@/store/server';
import routes from '@/routes';
import path from 'path';
import fs from 'fs';
import waitAll from './sagas/waitAll';

const htmlFile = path.resolve('dist/index.html')
const staticFolder = path.join('dist')
const port = process.env.PORT || 3000;
const excludes = ['/static', '/api'];

function server(port) {
  const app = new Koa()
  const router = new Router()
  const template = fs.readFileSync(htmlFile, { encoding: 'utf-8' })

  app.use(cors())

  router.get('*', async (ctx, next) => {
    if (excludes.some(v => ctx.url.includes(v))) {
      await next()
    } else {
      let initialState = '{}'
      const store = creatServerStore()
      let route = routes.find(r => r.path === ctx.url)
      if (route && route.preload) {
        let task = store.runSaga(waitAll([].concat(route.preload('params 555'))))
        let t = task.toPromise().then(() => {
          // let v = JSON.stringify(store.getState())
        })
        initialState = JSON.stringify(store.getState())
      }
      const html = appServer(ctx)
      ctx.body = template.replace('<!-- HTML_PLACEHOLDER -->', html)
        .replace('<!-- INITIAL_STATE -->', `<script>window.__INITIAL_STATE__ = ${initialState}</script>`)
    }
  })

  router.get('/api/products', (ctx) => {
    ctx.body = JSON.stringify(jsondata)
  })

  app.use(router.routes())
  app.use(koaStatic(staticFolder))

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`)
  })
}

server(port)
