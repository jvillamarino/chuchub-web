/**
 * Restaurant
 *
 * @export
 * @interface Restaurant
 */
export interface Restaurant {
  id: string;
  name: string;
  image: string;
  logo: string;
  ratings: Rating;
  coordinates: Coordinate;
}

/**
 * Rating
 *
 * @interface Rating
 */
interface Rating {
  total: string;
  average: string;
}

/**
 * Coordinate
 *
 * @interface Coordinate
 */
interface Coordinate {
  latitude: number;
  longitude: number;
}

/**
 * Category
 *
 * @export
 * @interface Category
 */
export interface Category {
  name: string;
  isSelected?: boolean;
  products?: Product[];
}

/**
 * Product
 *
 * @export
 * @interface Product
 */
export interface Product {
  name: string;
  image: string;
  price: number;
  quantity?: number;
  category?: string;
}
