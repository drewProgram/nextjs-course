import { GetStaticProps } from "next";

interface IProduct {
  id: string;
  title: string;
}

interface ITop10Props {
  products: IProduct[];
}

export default function Top10({ products }) {
  return (
    <div>
      <h1>Top 10</h1>

      <ul>
        {products.map(recommendedProduct => {
          return (
            <li key={recommendedProduct.id}>
              {recommendedProduct.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// static rendering
export const getStaticProps: GetStaticProps<ITop10Props> = async (context) => {
  const response = await fetch('http://localhost:3333/products');
  const products = await response.json();

  return {
    props: {
      products
    },
    // time to the page update (in seconds)
    revalidate: 5,
  }
}
