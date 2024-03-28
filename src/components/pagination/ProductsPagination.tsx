import { useAppDispatch, useAppSelector } from '@/app/utils/hooks';
import ChevronLeft from '../icons/ChevronLeft';
import css from './productsPagination.module.scss';
import ChevronRight from '../icons/ChevronRight';
import { setPage } from '@/stores/product.slice';
export default function ProductsPagination() {
  const dispatch = useAppDispatch();
  const { page, total } = useAppSelector((state) => state.product);

  const toPage = (i: number) => {
    if (page <= total && page > 0) {
      dispatch(setPage(i));
    }
  };
  const nextPage = () => {
    if (total > page) {
      console.log('nexPage', page + 1);
      dispatch(setPage(page + 1));
    }
  };
  const prevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };
  return (
    <div className={css.paginationContainer}>
      {/* @click.prevent="prevPage" */}
      <button
        onClick={() => prevPage()}
        className={css.paginationListBtn}
      >
        <ChevronLeft />
      </button>
      <ul className={css.paginationList}>
        {[...Array(total)].map((_, i) => (
          <li key={i}>
            <button
              onClick={() => toPage(i + 1)}
              className={`${css.paginationListBtn} ${
                page === i + 1 ? css.active : ''
              }`}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
      {/* @click.prevent="nextPage" */}
      <button
        onClick={() => nextPage()}
        className={css.paginationListBtn}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
