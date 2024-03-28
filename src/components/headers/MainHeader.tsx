// import { ChangeTheme } from '@/features/theme';
import { useLazyTestQuery, useLazyLogoutQuery } from '@/services/userApi';
import MainBtn from '../buttons/MainBtn';
import css from './mainHeader.module.css';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/utils/hooks';

import { reset } from '@/stores/user.slice';
import { reset as resetCart } from '@/stores/cart.slice';
import { reset as resetProduct } from '@/stores/product.slice';
// import { reset as resetFavorite } from '@/stores/favorite.slice';

import LoadingSpinner from '../indicators/LoadingSpinner';
import HeaderNavigation from '../navigations/HeaderNavigation';
import { memo, useCallback, useMemo } from 'react';
import { ChangeTheme } from '../theme/ChangeTheme';

// Memoized UserSection component
const UserSection = memo(
  ({ userName, onLogout }: { userName: string; onLogout: () => void }) => (
    <div className={`${css.user} ${css.headerBlock}`}>
      {userName}
      <MainBtn
        version="contain"
        onClick={onLogout}
      >
        Logout
      </MainBtn>
    </div>
  )
);

// Memoized LoadingSection component
const LoadingSection = memo(() => (
  <div className={css.loadingSpinner}>
    <LoadingSpinner />
  </div>
));

export function MainHeader() {
  const dispatch = useAppDispatch();
  const { user, isAuth, isLoading } = useAppSelector((state) => state.user);

  const [trigger, { data }] = useLazyTestQuery();
  const [logout] = useLazyLogoutQuery();

  const clickHandler = useCallback(async () => {
    await trigger(null);
  }, []);

  const logoutHandler = useCallback(() => {
    logout(null);
    dispatch(reset());
    dispatch(resetCart());
    dispatch(resetProduct());
    // dispatch(resetFavorite());
  }, [dispatch]);

  console.log('header');
  return (
    <header className={css.header}>
      <div className="wrapper">
        <div className={css.headerContainer}>
          <Link
            className={`${css.logoLink} ${css.headerBlock}`}
            to="/"
          >
            LOGO
            <MainBtn
              onClick={clickHandler}
              version="contain"
            >
              Test -{data === undefined ? 'false' : 'true'}
            </MainBtn>
          </Link>
          {useMemo(
            () =>
              !isLoading &&
              isAuth && (
                <UserSection
                  userName={user.name}
                  onLogout={logoutHandler}
                />
              ),
            [isLoading, isAuth, user.name, logoutHandler]
          )}

          {/* Memoized LoadingSection component */}
          {useMemo(() => isLoading && <LoadingSection />, [isLoading])}

          <div className={css.headerBlock}>
            <HeaderNavigation
              user={user}
              isAuth={isAuth}
              isAdmin={user.role === 'ADMIN'}
            />
            <ChangeTheme />
          </div>
        </div>
      </div>
    </header>
  );
}

{
  /* {!isLoading && isAuth && (
            <div className={`${css.user} ${css.headerBlock}`}>
              {user.name}
              <MainBtn
                version="contain"
                onClick={logoutHandler}
              >
                Logout
              </MainBtn>
            </div>
          )}
          {isLoading && (
            <div className={css.loadingSpinner}>
              <LoadingSpinner />
            </div>
          )} */
}
