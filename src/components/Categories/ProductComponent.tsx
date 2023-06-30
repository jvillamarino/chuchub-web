import type { Product } from '@models/restaurant.interface';
import { useState } from 'react';

export interface Props {
  product: Product;
  updateQuantityCallback: Function;
}

export default function Product({ product: productData, updateQuantityCallback }: Props) {
  const [product, updateProduct] = useState(productData);

  function handleUpdateQuantity(type: 'add' | 'remove') {
    let updatedProduct: Product = { ...product };

    if (type === 'add') {
      updatedProduct.quantity = product.quantity ? ++product.quantity : 1;
    }

    if (type === 'remove' && product.quantity) {
      updatedProduct.quantity = product.quantity ? --product.quantity : 0;
    }

    updateProduct(updatedProduct);
    updateQuantityCallback(updatedProduct);
  }

  return (
    <div className="product">
      <img className="product__image" src={product.image} alt={product.name} />
      <h3 className="product__name">{product.name}</h3>
      <div className="product-footer">
        <p className="product-footer__price">{product.price.toString().replace('.', ',')} €</p>
        <div className="product-footer-actions">
          <button
            className={`footer__button btn-circle ${
              !!product.quantity || 'footer__button--hidden'
            }`}
            onClick={() => handleUpdateQuantity('remove')}
          >
            -
          </button>
          <p className="footer__quantity">{product.quantity ?? 0}</p>
          <button className="footer__button btn-circle" onClick={() => handleUpdateQuantity('add')}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
