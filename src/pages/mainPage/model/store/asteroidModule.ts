import { AxiosError, type AxiosResponse } from 'axios';
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
    distanceType: 'luna'
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
        state.page += 1;
      } catch (e) {
        console.log(e);
        state.error = (e as AxiosError).message;
      } finally {
        commit('setLoading', false);
      }
    }
  }
};

export const asteroidActions = {
  getAsteroidListAction: `${NAMESPACE_ASTEROID_RESOLVE}/getAsteroidList`
};

export const asteroidMutations = {
  setDistanceType: `${NAMESPACE_ASTEROID_RESOLVE}/setDistanceType`
};
