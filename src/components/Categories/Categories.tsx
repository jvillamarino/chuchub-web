import type { Product, Category } from '@models/restaurant.interface';
import './categories.css';
import { useEffect, useState } from 'react';
import ProductComponent from '@components/Categories/ProductComponent';
import { CATALOG_ENDPOINT } from '@common/environments.constants';
import { useStore } from '@nanostores/react';
import {
  addRestaurant,
  $restaurantsStore,
  updateProductQuantityByRestaurant,
  $queryFilter,
} from '@common/store';

export interface Props {
  restaurantId: string;
}

export default function Categories({ restaurantId }: Props) {
  const [categories, updateCategories] = useState<Category[]>([]);
  const [products, updateProducts] = useState<Product[]>([]);

  const restaurant = useStore($restaurantsStore);
  const queryFilter = useStore($queryFilter);

  useEffect(() => {
    getCatalogData();
  }, []);

  useEffect(() => {
    if (queryFilter?.length > 0) {
      filterByQuery(queryFilter);
    } else if (categories?.length) {
      cleanFilters();
    }
  }, [queryFilter]);

  async function getCatalogData() {
    let categories: Category[] = [];

    if (!(restaurantId in restaurant)) {
      categories = await fetch(CATALOG_ENDPOINT(restaurantId)).then((res) => res.json());
      addRestaurant({ [restaurantId]: { categories, isFavorite: false } });
    } else {
      categories = restaurant[Number(restaurantId)].categories;
    }

    categories[0].isSelected = true;
    updateCategories([...categories]);
    updateProducts(categories[0].products);
  }

  function handleChangeCategory(selectedCategory: Category) {
    categories.forEach((category: Category) => (category.isSelected = false));
    selectedCategory.isSelected = true;
    updateProducts(selectedCategory.products);
  }

  function handleUpdateQuantityCallback(product: Product, index: number) {
    products[index] = product;
    updateProductQuantityByRestaurant(restaurantId, product);
  }

  function filterByQuery(query: string) {
    const flattenProducts: Product[] = restaurant[Number(restaurantId)].categories.flatMap(
      (category: Category) => category.products
    );

    const filteredProducts = flattenProducts.filter((product: Product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    const allCategory: Category = getAllCategoryFromList(filteredProducts);
    handleChangeCategory(allCategory);
  }

  function getAllCategoryFromList(products: Product[]): Category {
    const categoryIndex = categories.findIndex((category: Category) => category.name === 'All');
    const allCategory: Category = { name: 'All', products, isSelected: true };
    if (categoryIndex === -1) {
      updateCategories([allCategory, ...categories]);
    } else {
      categories[categoryIndex] = allCategory;
      updateCategories([...categories]);
    }

    return allCategory;
  }

  function cleanFilters() {
    const [, ...restCategories] = categories;

    updateCategories([...restCategories]);
    handleChangeCategory(restCategories[0]);
  }

  return (
    <div className="categories-container">
      <div className="categories-titles">
        {categories.map((category: Category, index: number) => (
          <div
            onClick={() => handleChangeCategory(category)}
            className={`categories__name ${category.isSelected && 'categories__name--selected'}`}
            key={`${category.name}${index}`}
          >
            {category.name}
          </div>
        ))}
      </div>

      <div className="categories-products">
        {products.map((product: Product, index: number) => (
          <ProductComponent
            updateQuantityCallback={(product: Product) =>
              handleUpdateQuantityCallback(product, index)
            }
            product={product}
            key={`${product.name}${index}`}
          ></ProductComponent>
        ))}
      </div>
    </div>
  );
}
