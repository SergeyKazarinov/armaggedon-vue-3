import { AsteroidIdPage } from '@/pages/asteroidIdPage';
import { MainPage } from '@/pages/mainPage';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/asteroids/:asteroidId',
      name: 'asteroidId',
      component: AsteroidIdPage
    }
  ]
});

export default router;
