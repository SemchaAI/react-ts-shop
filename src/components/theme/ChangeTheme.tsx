import { useAppDispatch, useAppSelector } from '@/app/utils/hooks';
import { selectCurrentTheme, setTheme } from '@/stores/theme.slice';
import { useCallback } from 'react';
import MainBtn from '../buttons/MainBtn';

export function ChangeTheme() {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      dispatch(setTheme(currentTheme === 'light' ? 'dark' : 'light'));
    },
    [currentTheme]
  );

  return <MainBtn onClick={onClick}>{currentTheme}</MainBtn>;
}
