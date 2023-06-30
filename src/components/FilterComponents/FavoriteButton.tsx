import { $restaurantsStore, addFavorite, markAsFavorite } from '@common/store';
import type { Restaurant } from '@models/restaurant.interface';
import { useStore } from '@nanostores/react';

export interface Props {
  children: React.ReactNode;
  restaurant: Restaurant;
}

export default function FavoriteButton({ restaurant, children }: Props) {
  const selectedRestaurant = useStore($restaurantsStore)[restaurant.id];

  function handleMarkAsFavorite() {
    markAsFavorite(restaurant.id);
    addFavorite(restaurant);
  }

  return (
    <button
      onClick={() => handleMarkAsFavorite()}
      className={`btn btn-circle btn-sm  hover:bg-orange-200 ${
        selectedRestaurant?.isFavorite && 'favorite-button'
      }`}
    >
      {children}
    </button>
  );
}
