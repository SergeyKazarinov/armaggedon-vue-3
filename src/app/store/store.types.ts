import type { IAsteroidState, NAMESPACE_ASTEROID_RESOLVE } from '@/pages/mainPage';

export interface IStoreSchema {
  [NAMESPACE_ASTEROID_RESOLVE]: IAsteroidState;
}
