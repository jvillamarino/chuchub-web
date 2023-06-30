import { $cart } from '@common/store';
import type { Product } from '@models/restaurant.interface';
import { useStore } from '@nanostores/react';
import { useEffect, useState } from 'react';

export interface Props {
  children: React.ReactNode;
  payButtonText: string;
}

export default function Cart({ children, payButtonText }: Props) {
  const [totalProducts, updateTotalProducts] = useState(0);
  const [totalAmount, updateTotalAmount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const cart: Product[] = useStore($cart);
  useEffect(() => {
    const mapProducts = cart.map(({ quantity, price }) => ({ quantity, price }));
    const total = mapProducts.reduce((accumulator, product) => accumulator + product.quantity!, 0);
    const totalAmount = mapProducts.reduce(
      (accumulator, product) => accumulator + product.quantity! * product.price,
      0
    );
    updateTotalProducts(total);
    updateTotalAmount(totalAmount);
  }, [cart]);

  return (
    <div className="dropdown dropdown-end" onClick={() => setShowDropdown(!showDropdown)}>
      <label
        tabIndex={0}
        className={`btn btn-circle btn-md ${cart.length && 'btn-primary bg-opacity-80'}`}
      >
        <div className="indicator">
          <span className="badge badge-sm indicator-item">{cart.length}</span>
          {children}
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-3 z-10 card card-compact dropdown-content w-80 bg-base-100 shadow"
      >
        <div className="card-body">
          {cart.map((product) => (
            <div className="flex items-center gap-4" key={`${product.name}-index`}>
              <img className="w-8 h-8" src={product.image} alt="" />
              <p className="text-[--lastBlack] font-bold">{product.name}</p>
              <div className="flex flex-auto gap-1 items-center justify-end">
                <span>{product.quantity} x</span>
                <span className="font-semibold text-[--lastBlack] text-base">
                  {product.price} €
                </span>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-end">
            <span className="font-bold text-lg">Total: {totalAmount.toFixed(2)} €</span>
          </div>
          <div className="card-actions">
            <button className="btn btn-block bg-orange-300 hover:bg-orange-400 text-white border">
              {payButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
