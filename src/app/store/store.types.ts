import type { IAsteroidState, NAMESPACE_ASTEROID_RESOLVE } from '@/pages/mainPage';

import type { IBasketState, NAMESPACE_BASKET } from '@/widgets/basket';

export interface IStoreSchema {
  [NAMESPACE_ASTEROID_RESOLVE]: IAsteroidState;
  [NAMESPACE_BASKET]: IBasketState;
}
