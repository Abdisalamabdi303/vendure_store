import { gql } from "@apollo/client";
import client from "../../../lib/apollo-client";

export async function generateMetadata({ params }) {
  return { title: `Product Details - ${params.id}` };
}

export default async function ProductPage({ params }) {
  const { id } = params;

  const { data } = await client.query({
    query: gql`
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          name
          description
          variants {
            price
          }
          featuredAsset {
            preview
          }
        }
      }
    `,
    variables: { id },
  });

  const product = data.product;

  return (
    <div className="p-4">
      <img src={product.featuredAsset?.preview} alt={product.name} />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold">Price: ${product.variants[0].price / 100}</p>
    </div>
  );
}
