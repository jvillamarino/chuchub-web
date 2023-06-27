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
