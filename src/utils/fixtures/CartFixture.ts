import { dateVO } from 'utils/format';

import { createFixture } from './createFixture';

interface IProduct {
  productId: number;
  quantity: number;
}

export interface ICart {
  id: number;
  userId: number;
  date: string;
  products: Array<IProduct>;
}

export const CartFixture = createFixture<ICart>({
  id: 1,
  date: dateVO.past(),
  userId: 1,
  products: [{ productId: 1, quantity: 2 }],
});
