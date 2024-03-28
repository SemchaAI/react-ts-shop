import css from './productCard.module.scss';

export default function ProductCardSkeleton() {
  return (
    <li className={css.product}>
      <div className={css.productLink}>
        <div className={`${css.skeletonImg} ${css.skeleton}`}></div>
        <h3 className={`${css.productTitle} ${css.skeleton}`}></h3>
      </div>
      <div className={css.productInfo}>
        <div className={css.productContainer}>
          <div className={`${css.productPriceLabel} ${css.skeleton}`}>
            тест:
          </div>
          <p className={`${css.productPrice} ${css.skeleton}`}>000000</p>
        </div>
        <div className={css.productControls}>
          <div className={`${css.outOfStockContainer} ${css.skeleton}`}>
            <div className={`${css.skeletonBtn} ${css.skeleton}`}></div>
          </div>
        </div>
      </div>
    </li>
  );
}
