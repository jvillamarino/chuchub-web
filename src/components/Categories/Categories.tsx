import type { Product, Category } from '@models/restaurant.interface';
import './categories.css';
import { useEffect, useState } from 'react';
import ProductComponent from '@components/Categories/ProductComponent';
import { CATALOG_ENDPOINT } from '@common/environments.constants';
import { useStore } from '@nanostores/react';
import {
  addRestaurant,
  restaurantsStore,
  updateProductQuantityByRestaurant,
} from '@common/store/restaurant';

export interface Props {
  restaurantId: string;
}

export default function Categories({ restaurantId }: Props) {
  const [categories, updateCategories] = useState<Category[]>([]);
  const [products, updateProducts] = useState<Product[]>([]);
  const [cart, updateCart] = useState<Product[]>([]);

  const $restaurant = useStore(restaurantsStore);

  useEffect(() => {
    getCatalogData();
  }, []);

  async function getCatalogData() {
    let data: Category[] = [];

    if (!(restaurantId in $restaurant)) {
      data = await fetch(CATALOG_ENDPOINT(restaurantId)).then((res) => res.json());
      addRestaurant({ [restaurantId]: data });
    } else {
      data = $restaurant[Number(restaurantId)];
    }

    data[0].isSelected = true;
    updateCategories([...data]);
    updateProducts(data[0].products);
  }

  function handleChangeCategory(category: Category) {
    categories.forEach((category: Category) => (category.isSelected = false));
    category.isSelected = true;
    updateCategories([...categories]);
    updateProducts(category.products);
  }

  function handleUpdateQuantityCallback(product: Product) {
    const newCart = [...cart];
    const index = newCart.findIndex((item: Product) => item.name === product.name);
    if (index === -1) {
      newCart.push(product);
    } else {
      newCart[index] = product;
    }
    updateCart(newCart);
    updateProductQuantityByRestaurant(restaurantId, product);
  }

  return (
    <div className="categories-container">
      <div className="categories-titles">
        {categories.map((category: Category, index: number) => (
          <div
            onClick={() => handleChangeCategory(category)}
            className={`categories__name ${
              category.isSelected ? 'categories__name--selected' : ''
            }`}
            key={`${category.name}${index}`}
          >
            {category.name}
          </div>
        ))}
      </div>

      {cart
        .reduce((accumulated: number, product: Product) => {
          return accumulated + product.price * product.quantity!;
        }, 0)
        .toPrecision(4)}

      <div className="categories-products">
        {products.map((product: Product, index: number) => (
          <ProductComponent
            updateQuantityCallback={handleUpdateQuantityCallback}
            product={product}
            key={`${product.name}${index}`}
          ></ProductComponent>
        ))}
      </div>
    </div>
  );
}
