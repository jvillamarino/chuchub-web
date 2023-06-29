import type { Category, Product } from '@models/restaurant.interface';
import type { RestaurantCatalog } from '@models/store.interface';
import { atom } from 'nanostores';

const LOCALSTORAGE_RESTAURANT_KEY = 'restaurant';
const CACHED_RESTAURANT_DATA = localStorage.getItem(LOCALSTORAGE_RESTAURANT_KEY) ?? '{}';

export const restaurantsStore = atom<RestaurantCatalog>(JSON.parse(CACHED_RESTAURANT_DATA));

export const addRestaurant = (restaurant: RestaurantCatalog) => {
  restaurantsStore.set({ ...restaurantsStore.get(), ...restaurant });
  setStorage();
};

export const updateProductQuantityByRestaurant = (
  restaurantId: string,
  updatedProduct: Product
) => {
  const restaurant = restaurantsStore.get()[Number(restaurantId)];

  const newRestaurantData = restaurant.map(({ name, products }: Category) => {
    products = products.map((product: Product) => {
      if (updatedProduct.name === product.name) {
        return updatedProduct;
      }
      return product;
    });
    return { name, products };
  });

  restaurantsStore.set({ ...restaurantsStore.get(), [restaurantId]: newRestaurantData });
  setStorage();
};

const setStorage = () => {
  localStorage.setItem(LOCALSTORAGE_RESTAURANT_KEY, JSON.stringify(restaurantsStore.get()));
};

setStorage();
