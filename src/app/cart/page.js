"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border p-4 rounded shadow mb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          {/* Checkout Button */}
          <div className="mt-4">
            <Link href="/checkout">
              <button className="w-full p-2 bg-green-600 text-white rounded">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
