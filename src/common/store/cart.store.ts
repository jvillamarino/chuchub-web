import type { Product } from '@models/restaurant.interface';
import { atom } from 'nanostores';

export const LOCALSTORAGE_CART_KEY = 'cart';

export const setCart = (data: Product[]) => {
  $cart.set(data);
  localStorage.setItem(LOCALSTORAGE_CART_KEY, JSON.stringify(data ?? {}));
};

export const getCart = (): Product[] => {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_KEY) ?? '[]');
};
export const $cart = atom<Product[]>(getCart());

export function updateCart(product: Product) {
  const cart = $cart.get();
  const productIndex = cart.findIndex((item) => item.name === product.name);

  if (product.quantity === 0) {
    cart.splice(productIndex, 1);
    setCart([...cart]);
    return;
  }

  if (productIndex !== -1) {
    cart[productIndex] = product;
  } else {
    cart.push(product);
  }
  setCart([...cart]);
}
