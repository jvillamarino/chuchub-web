import type { Category, Product } from './restaurant.interface';

/**
 * RestaurantCatalog
 *
 * @export
 * @interface RestaurantCatalog
 */
export interface RestaurantStore {
  [id: string]: {
    isFavorite?: boolean;
    categories: Category[];
    products: Product[];
  };
}
