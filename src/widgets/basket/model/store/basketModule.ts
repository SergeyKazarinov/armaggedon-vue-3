import type { IAsteroid } from '@/pages/mainPage';
import type { Module } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';

import type { IBasketState } from '../types/basketState.types';

export const NAMESPACE_BASKET = 'basket';

export const basketModule: Module<IBasketState, IStoreSchema> = {
  namespaced: true,
  state: () => ({
    asteroids: []
  }),

  mutations: {
    addAsteroid(state, asteroid: IAsteroid) {
      state.asteroids.push(asteroid);
    },

    removeAsteroid(state, asteroid: IAsteroid) {
      state.asteroids = state.asteroids.filter((item) => item.id !== asteroid.id);
    },

    clearAsteroids(state) {
      state.asteroids = [];
    }
  }
};

export const basketMutations = {
  addAsteroid: `${NAMESPACE_BASKET}/addAsteroid`,
  removeAsteroid: `${NAMESPACE_BASKET}/removeAsteroid`,
  clearAsteroids: `${NAMESPACE_BASKET}/clearAsteroids`
};
