import type { Category } from './restaurant.interface';

/**
 * RestaurantCatalog
 *
 * @export
 * @interface RestaurantCatalog
 */
export interface RestaurantCatalog {
  [id: number]: Category[];
}
