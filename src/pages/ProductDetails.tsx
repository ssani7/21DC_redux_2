import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { useGetProductByIDQuery } from '@/redux/api';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  const { data: product } = useGetProductByIDQuery(id);

  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.model}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.keyFeature?.map((feature: string) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <Button
            onClick={() => {
              dispatch(addToCart(product!));
              toast({
                description: 'Product Added',
              });
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
      <ProductReview />
    </>
  );
}
