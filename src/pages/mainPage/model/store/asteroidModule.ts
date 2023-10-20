import { AxiosError, type AxiosResponse } from 'axios';
import { DateTime } from 'luxon';
import type { Module } from 'vuex';

import type { IStoreSchema } from '@/app/store/store.types';
import { apiNeowsInstance } from '@/shared/api/apiInstance';

import type { IAsteroidResolve, IAsteroidState, TDistanceType } from '../types/asteroidState.types';
import type { IFetchAsteroidListArgs } from '../types/fetchAsteroidList.types';

export const NAMESPACE_ASTEROID_RESOLVE = 'asteroidResolve';

export const asteroidModule: Module<IAsteroidState, IStoreSchema> = {
  namespaced: true,
  state: () => ({
    data: {
      element_count: 0,
      link: {
        next: '',
        previous: '',
        self: ''
      },
      near_earth_objects: {}
    },
    error: '',
    isLoading: false,
    page: 0,
    asteroids: [],
    distanceType: 'luna',
    inited: false
  }),

  mutations: {
    setLoading(state, boolean: boolean) {
      state.isLoading = boolean;
    },
    setDate(state, data: IAsteroidResolve) {
      state.data = data;
    },
    setError(state, error: string) {
      state.error = error;
    },
    setDistanceType(state, distanceType: TDistanceType) {
      state.distanceType = distanceType;
    }
  },

  actions: {
    async getAsteroidList(
      { state, commit },
      { startDate, endDate = startDate }: IFetchAsteroidListArgs
    ) {
      try {
        commit('setLoading', true);
        state.error = '';
        const asteroidResolve: AxiosResponse<IAsteroidResolve, any> = await apiNeowsInstance.get(
          '/',
          {
            params: {
              start_date: startDate,
              end_date: endDate
            }
          }
        );

        if (!asteroidResolve.data) {
          throw new Error();
        }

        const dataArray = Object.values(asteroidResolve.data.near_earth_objects)[0];
        state.asteroids = dataArray;

        state.data = asteroidResolve.data;
        state.inited = true;
        state.page += 1;
      } catch (e) {
        console.log(e);
        state.error = (e as AxiosError).message;
      } finally {
        commit('setLoading', false);
      }
    },

    async getNextAsteroids({ state, commit }) {
      try {
        const startDate = DateTime.now().plus({ days: state.page }).toFormat('yyyy-LL-dd');
        const asteroidResolve: AxiosResponse<IAsteroidResolve, any> = await apiNeowsInstance.get(
          '/',
          {
            params: {
              start_date: startDate,
              end_date: startDate
            }
          }
        );

        if (!asteroidResolve.data) {
          throw new Error();
        }

        const dataArray = Object.values(asteroidResolve.data.near_earth_objects)[0];
        state.asteroids = [...state.asteroids, ...dataArray];

        state.data.element_count += asteroidResolve.data.element_count;
        state.data.link = asteroidResolve.data.link;
        state.data.near_earth_objects = {
          ...state.data.near_earth_objects,
          ...asteroidResolve.data.near_earth_objects
        };
        state.page += 1;
      } catch (e) {
        console.log(e);
        state.error = (e as AxiosError).message;
      }
    }
  }
};

export const asteroidActions = {
  getAsteroidListAction: `${NAMESPACE_ASTEROID_RESOLVE}/getAsteroidList`,
  getNextAsteroidsAction: `${NAMESPACE_ASTEROID_RESOLVE}/getNextAsteroids`
};

export const asteroidMutations = {
  setDistanceType: `${NAMESPACE_ASTEROID_RESOLVE}/setDistanceType`
};
