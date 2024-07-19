import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/listtest',
    name: 'ListTest',
    component: () => import('../views/ListTest.vue'),
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import('../views/Chart.vue'),
  },
  {
    path: '/chart2',
    name: 'Chart2',
    component: () => import('../views/ChartComposition.vue'),
  },
  {
    path: '/plotly/bar',
    name: 'PlotlyBar',
    component: () => import('../views/Plotly/Bar.vue'),
  },
  {
    path: '/plotly/gantt',
    name: 'PlotlyGantt',
    component: () => import('../views/Plotly/Gantt.vue'),
  },
  {
    path: '/model3d',
    name: 'Model3D',
    component: () => import('../views/Model3D.vue'),
  },
  {
    path: '/model3d2',
    name: 'Model3D2',
    component: () => import('../views/Model3DComposition.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
