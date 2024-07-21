import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // Chartjs
  {
    path: '/chartjs/chart1',
    name: 'Chart1',
    component: () => import('../views/Chartjs/Chart.vue'),
  },
  {
    path: '/chartjs/chart2',
    name: 'Chart2',
    component: () => import('../views/Chartjs/ChartComposition.vue'),
  },
  {
    path: '/chartjs/chart3',
    name: 'Chart3',
    component: () => import('../views/Chartjs/ChartTimeLine.vue'),
  },
  // Plotly
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
  // Model3D
  {
    path: '/model3d/model3d1',
    name: 'Model3D1',
    component: () => import('../views/Model3D/Model3D.vue'),
  },
  {
    path: '/model3d/model3d2',
    name: 'Model3D2',
    component: () => import('../views/Model3D/Model3DComposition.vue'),
  },
  // その他
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/listtest',
    name: 'ListTest',
    component: () => import('../views/ListTest.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
