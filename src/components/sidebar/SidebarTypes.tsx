import { useGetTypesQuery } from '@/services/productApi';
import css from './sidebarTypes.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/utils/hooks';
import { setSelectedType } from '@/stores/product.slice';

export default function SidebarTypes() {
  const dispatch = useAppDispatch();
  const currType = useAppSelector((state) => state.product.selectedType._id);
  const { data: types } = useGetTypesQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  console.log('types', types);
  return (
    <ul className={css.sideBar}>
      <li
        className={`${css.type} ${currType === undefined && css.activeType}`}
        onClick={() => dispatch(setSelectedType({ _id: undefined }))}
      >
        Все
      </li>
      {types?.map((type) => (
        <li
          key={type._id}
          className={`${css.type} ${currType === type._id && css.activeType}`}
          onClick={() => dispatch(setSelectedType(type))}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
}
