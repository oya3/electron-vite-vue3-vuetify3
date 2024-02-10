import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('../views/Chart.vue')
  },
  {
    path: '/chart2',
    name: 'Chart2',
    component: () => import('../views/ChartComposition.vue')
  },
  {
    path: '/model3d',
    name: 'Model3D',
    component: () => import('../views/Model3D.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
