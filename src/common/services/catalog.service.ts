import type { Category, Product } from '@models/restaurant.interface';

export const CATALOG_ENDPOINT = (id: string) =>
  `https://api.last.app/frontend-interview/restaurants/${id}/catalog`;

const getCatalogData = async (restaurantId: string) => {
  const data: Category[] = await fetch(CATALOG_ENDPOINT(restaurantId)).then((res) => res.json());

  const categories = data.map(({ name }: Category) => ({ name }));
  const products = data.reduce((accumulator: Product[], { name: category, products }: Category) => {
    const list = products!.map((product) => ({ ...product, category })) as Product[];
    return [...accumulator, ...list];
  }, []);

  return { categories, products };
};

export { getCatalogData };
