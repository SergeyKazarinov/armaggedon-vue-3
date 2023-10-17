import { NAMESPACE_ASTEROID_RESOLVE, asteroidModule } from '@/pages/mainPage';
import { createStore } from 'vuex';

import type { IStoreSchema } from './store.types';

export default createStore<IStoreSchema>({
  modules: {
    [NAMESPACE_ASTEROID_RESOLVE]: asteroidModule
  }
});
