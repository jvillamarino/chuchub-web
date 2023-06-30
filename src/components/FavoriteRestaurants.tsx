import type { Restaurant } from '@models/restaurant.interface';
import { getFavorites } from '@common/store';

export function FavoriteRestaurants() {
  const favorites: Restaurant[] = getFavorites();
  return (
    <div className="restaurants-container">
      {favorites.map((restaurant) => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
    </div>
  );
}
