import { $restaurantsStore, markAsFavorite } from '@common/store';
import { useStore } from '@nanostores/react';

export interface Props {
  children: React.ReactNode;
  restaurantId: string;
}

export default function FavoriteButton({ restaurantId, children }: Props) {
  const restaurant = useStore($restaurantsStore)[restaurantId];

  function handleMarkAsFavorite() {
    markAsFavorite(restaurantId);
  }

  return (
    <button
      onClick={() => handleMarkAsFavorite()}
      className={`btn btn-circle btn-md absolute bg-orange-200 hover:bg-orange-400  top-10 right-10 ${
        restaurant?.isFavorite && 'bg-orange-400'
      }`}
    >
      {children}
    </button>
  );
}
