import { useGetProductsQuery } from '@/services/productApi';
import css from './productList.module.scss';
import { IProduct } from '@/models/products';
import ProductCard from '../ProductCard/ProductCard';
import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';
import { useAppSelector } from '@/app/utils/hooks';
import ProductsPagination from '@/components/pagination/ProductsPagination';
export default function ProductList() {
  // limit of products on page
  const limit = 3;
  const { selectedType, page, title } = useAppSelector(
    (state) => state.product
  );
  const { data, isLoading, isSuccess } = useGetProductsQuery(
    {
      selectedType: selectedType._id,
      limit,
      page,
      title,
    },
    {
      refetchOnMountOrArgChange: true,
      // skip: !selectedType._id,
    }
  );

  return (
    <>
      {isSuccess && (
        <>
          <ul className={css.productsList}>
            {console.log('products', data)}
            {data.products?.map((product: IProduct) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </ul>
          <ProductsPagination />
        </>
      )}
      {isLoading && (
        <ul className={css.productsList}>
          {[...Array(limit).keys()].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </ul>
      )}
    </>
  );
}
