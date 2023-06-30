import type { Product, Category } from '@models/restaurant.interface';
import './categories.css';
import { useEffect, useState } from 'react';
import ProductComponent from '@components/Categories/ProductComponent';
import { useStore } from '@nanostores/react';
import {
  addRestaurant,
  $restaurantsStore,
  updateProductQuantityByRestaurant,
  $queryFilter,
  updateCart,
  $cart,
} from '@common/store';
import { CatalogService } from '@common/services';

export interface Props {
  restaurantId: string;
}

export default function Categories({ restaurantId }: Props) {
  const [categories, updateCategories] = useState<Category[]>([]);
  const [products, updateProducts] = useState<Product[]>([]);

  const [filteredProducts, updateFilteredProducts] = useState<Product[]>([]);
  const [allCategoryProducts, updateAllCategoryProducts] = useState<Product[]>([]);

  const restaurant = useStore($restaurantsStore);
  const queryFilter = useStore($queryFilter);
  const cartStore = useStore($cart);

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
    let products: Product[] = [];

    if (!(restaurantId in restaurant)) {
      const data = await CatalogService.getCatalogData(restaurantId);
      categories = data.categories;
      products = data.products;
      addRestaurant({ [restaurantId]: { categories, products, isFavorite: false } });
    } else {
      categories = restaurant[Number(restaurantId)].categories;
      products = restaurant[Number(restaurantId)].products;
    }

    updateCategories([...categories]);
    updateProducts([...products]);
    handleChangeCategory(categories[0], categories, products);
  }

  function handleChangeCategory(
    selectedCategory: Category,
    argCategories: Category[] = categories,
    argsProducts: Product[] = products
  ) {
    argCategories.forEach((category: Category) => (category.isSelected = false));
    selectedCategory.isSelected = true;

    const filteredProducts =
      selectedCategory.name === 'All' && allCategoryProducts.length
        ? allCategoryProducts
        : (argsProducts.filter(
            (product: Product) => product.category === selectedCategory.name
          ) as Product[]);

    updateFilteredProducts(filteredProducts);
  }

  function handleUpdateQuantityCallback(updatedProduct: Product, index: number) {
    filteredProducts[index] = updatedProduct;
    const productIndex: number = products.findIndex(
      (product: Product) => product.name === updatedProduct.name
    );
    products[productIndex] = { ...products[productIndex], quantity: updatedProduct.quantity };
    updateProductQuantityByRestaurant(restaurantId, updatedProduct);
    updateCart(updatedProduct);
  }

  function filterByQuery(query: string) {
    let filteredProducts = products.filter((product: Product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    filteredProducts = filteredProducts.map((product: Product) => ({
      ...product,
      category: 'All',
    }));

    const allCategory: Category = getAllCategoryFromList();
    updateFilteredProducts([...filteredProducts]);
    updateAllCategoryProducts([...filteredProducts]);
    handleChangeCategory(allCategory, categories, filteredProducts);
  }

  function getAllCategoryFromList(): Category {
    const categoryIndex = categories.findIndex((category: Category) => category.name === 'All');
    const allCategory: Category = { name: 'All', isSelected: true };
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
    updateFilteredProducts([...products]);
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
        {filteredProducts.map((product: Product, index: number) => (
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
