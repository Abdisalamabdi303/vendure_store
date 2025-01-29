"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Vendure Store
        </Link>
        <div>
          <Link href="/"className="mx-2">
            Home
          </Link>
          <Link href="/cart"className="mx-2">
            Cart ({cart.length})
          </Link>
        </div>
      </div>
    </nav>
  );
}
