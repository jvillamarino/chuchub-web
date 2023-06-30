import type { Category, Product, Restaurant } from '@models/restaurant.interface';
import type { RestaurantStore } from '@models/store.interface';
import { atom, deepMap, listenKeys } from 'nanostores';

// --- --- --- LOCALSTORAGE MANIPULATION --- --- --- //
export const LOCALSTORAGE_RESTAURANT_KEY = 'restaurants';
export const LOCALSTORAGE_FAVORITES_KEY = 'favorites';

const getStorage = () => {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_RESTAURANT_KEY) ?? '{}');
};

export const $restaurantsStore = deepMap<RestaurantStore>(getStorage());

const setStorage = () => {
  localStorage.setItem(LOCALSTORAGE_RESTAURANT_KEY, JSON.stringify($restaurantsStore.get() ?? {}));
};

export const setFavorites = (data: Restaurant[]) => {
  localStorage.setItem(LOCALSTORAGE_FAVORITES_KEY, JSON.stringify(data ?? {}));
};

export const getFavorites = (): Restaurant[] => {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_FAVORITES_KEY) ?? '[]');
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

export const addFavorite = (restaurant: Restaurant) => {
  const favorites = getFavorites();
  const favoriteIndex = favorites.findIndex(
    (favorite: Restaurant) => favorite.id === restaurant.id
  );

  if (favoriteIndex === -1) {
    favorites.push(restaurant);
  } else {
    favorites.splice(favoriteIndex, 1);
  }

  setFavorites(favorites);
};

export const updateProductQuantityByRestaurant = (
  restaurantId: string,
  updatedProduct: Product
) => {
  let restaurant = $restaurantsStore.get()[Number(restaurantId)];

  const products = restaurant.products.map((product: Product) => {
    if (updatedProduct.name === product.name) {
      return updatedProduct;
    }
    return product;
  });

  const restaurants = { ...$restaurantsStore.get(), [restaurantId]: { ...restaurant, products } };

  $restaurantsStore.set(restaurants);

  setStorage();
  return restaurant;
};

// --- --- --- NANOSTORE MANIPULATION --- --- --- //
