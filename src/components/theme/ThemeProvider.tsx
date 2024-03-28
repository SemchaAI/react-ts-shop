import { type ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/utils/hooks';
import { setTheme, selectCurrentTheme } from '@/stores/theme.slice';
import type { Theme } from '@/models/theme';

type Props = {
  theme?: Theme;
  children: ReactNode;
};

export function ThemeProvider({ children, theme }: Props) {
  const currentTheme = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (theme && theme !== currentTheme) {
      dispatch(setTheme(theme));

      return;
    }

    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme, theme]);

  return <>{children}</>;
}
