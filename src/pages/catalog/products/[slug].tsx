import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';

// component lazy load
const AddToCartModal = dynamic(
  () => import('@/components/AddToCartModal'),
  // ssr false is used when the component needs to use some global var that only the
  // browser can access
  { loading: () => <p>Loading...</p>, ssr: false }
);



export default function Product() {
  const router = useRouter();
  const [isAddToCartModalVisible, setIsAddToCartModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartModalVisible(true);
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      { isAddToCartModalVisible && <AddToCartModal />}
    </div>
  );
}
