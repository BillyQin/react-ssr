import Home from '@/pages/home';
import About from '@/pages/about';
import NotFound from '@/pages/notFound';

export default [
  {
    path: '/',
    component: Home,
    exact: true,
    key: 'home',
    preload: Home.preload
  },
  {
    path: '/about',
    component: About,
    exact: true,
    key: 'about',
  },
  {
    path: '*',
    component: NotFound,
    key: 'notfound'
  }
];
