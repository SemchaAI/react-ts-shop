import css from './ppSkeleton.module.scss';
export default function ProductPaginationSkeleton() {
  return (
    <div className={`${css.fakePagination} ${css.skeleton}`}>No products</div>
  );
}
