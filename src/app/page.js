import { gql } from "@apollo/client";
import client from "../lib/apollo-client";

export const dynamic = "force-dynamic"; // Ensures SSR for this page

export default async function Home() {
  const { data } = await client.query({
    query: gql`
      query GetProducts {
        products {
          items {
            id
            name
            description
            featuredAsset {
              preview
            }
          }
        }
      }
    `,
  });

  const products = data.products.items;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Vendure Storefront</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-2 shadow">
            <img src={product.featuredAsset?.preview} alt={product.name} />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
