import { AsteroidIdPage } from '@/pages/asteroidIdPage';
import { MainPage } from '@/pages/mainPage';
import NotFoundPage from '@/pages/notFoundPage/ui/notFoundPage.vue';
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
    },
    {
      path: '/:pathMathc(.*)*',
      name: 'NotFound',
      component: NotFoundPage
    }
  ]
});

export default router;
