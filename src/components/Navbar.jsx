import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Vendure Store</a>
        </Link>
        <div>
          <Link href="/">
            <a className="mx-2">Home</a>
          </Link>
          <Link href="/cart">
            <a className="mx-2">Cart</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
