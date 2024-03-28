import ProductInfo from '@/components/products/ProductInfo/ProductInfo';
import css from './productPage.module.scss';

export default function ProductPage() {
  return (
    <section className={css.product}>
      <div className="wrapper">
        <ProductInfo />
      </div>
    </section>
  );
}
