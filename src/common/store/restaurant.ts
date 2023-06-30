import type { Category, Product } from '@models/restaurant.interface';
import type { RestaurantStore } from '@models/store.interface';
import { atom, deepMap, listenKeys } from 'nanostores';

// --- --- --- LOCALSTORAGE MANIPULATION --- --- --- //
const LOCALSTORAGE_RESTAURANT_KEY = 'restaurant';

const getStorage = () => {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_RESTAURANT_KEY) ?? '{}');
};

export const $restaurantsStore = deepMap<RestaurantStore>(getStorage());

const setStorage = () => {
  localStorage.setItem(LOCALSTORAGE_RESTAURANT_KEY, JSON.stringify($restaurantsStore.get() ?? {}));
};

setStorage();

// --- --- --- LOCALSTORAGE MANIPULATION --- --- --- //

// --- --- --- NANOSTORE MANIPULATION --- --- --- //

export const addRestaurant = (restaurant: RestaurantStore) => {
  $restaurantsStore.set({ ...$restaurantsStore.get(), ...restaurant });
  setStorage();
};

export const markAsFavorite = (restaurantId: string) => {
  const restaurant = $restaurantsStore.get()[restaurantId];
  restaurant.isFavorite = !restaurant.isFavorite;
  const restaurants = { ...$restaurantsStore.get(), [restaurantId]: restaurant };
  $restaurantsStore.set(restaurants);
  setStorage();
};

export const getRestaurantById = (restaurantId: string) => {
  return $restaurantsStore.get()[restaurantId];
};

export const updateProductQuantityByRestaurant = (
  restaurantId: string,
  updatedProduct: Product
) => {
  let restaurant = $restaurantsStore.get()[Number(restaurantId)];

  const categories = restaurant.categories.map(({ name, products }: Category) => {
    products = products.map((product: Product) => {
      if (updatedProduct.name === product.name) {
        return updatedProduct;
      }
      return product;
    });
    return { name, products };
  });

  const restaurants = { ...$restaurantsStore.get(), [restaurantId]: { ...restaurant, categories } };

  $restaurantsStore.set(restaurants);

  setStorage();
  return restaurant;
};

// --- --- --- NANOSTORE MANIPULATION --- --- --- //
