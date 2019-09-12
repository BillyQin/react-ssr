import Koa from 'koa';
import Router from 'koa-router';
import koaStatic from 'koa-static';
import cors from 'koa-cors';
import path from 'path';
import fs from 'fs';
import appServer from '@/index-server';
import jsondata from '@/../mock/zhihu.json';
import creatServerStore from '@/store/server';
import routes from '@/routes';
import waitAll from './sagas/waitAll';

const htmlFile = path.resolve('dist/index.html');
const staticFolder = path.join('dist');
const defaultPort = process.env.PORT || 3000;
const excludes = ['/static', '/api'];

function server(port) {
  const app = new Koa();
  const router = new Router();
  const template = fs.readFileSync(htmlFile, { encoding: 'utf-8' });

  app.use(cors());

  router.get('*', async (ctx, next) => {
    if (excludes.some((v) => ctx.url.includes(v))) {
      await next();
    } else {
      let initialState = '{}';
      const store = creatServerStore();
      const route = routes.find((r) => r.path === ctx.url);
      if (route && route.preload) {
        const task = store.runSaga(waitAll([].concat(route.preload('params 555'))));
        await task.done;
        initialState = JSON.stringify(store.getState());
      }
      const html = appServer(ctx);
      ctx.body = template.replace('<!-- HTML_PLACEHOLDER -->', html)
        .replace('<!-- INITIAL_STATE -->', `<script type="text/javascript">window.__INITIAL_STATE__=${initialState}</script>`);
    }
  });

  router.get('/api/products', (ctx) => {
    ctx.body = JSON.stringify(jsondata);
  });

  app.use(router.routes());
  app.use(koaStatic(staticFolder));

  app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
  });
}

server(defaultPort);
