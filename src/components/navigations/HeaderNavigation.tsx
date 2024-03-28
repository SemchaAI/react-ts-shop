import css from './headerNavigation.module.scss';
import MainLink from '../links/MainLink';
import { useAppSelector } from '@/app/utils/hooks';
import { useGetCartProductsQuery } from '@/services/cartApi';
import { IUser } from '@/models/user';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { watch } from 'fs';

interface IProps {
  isAdmin: boolean;
  isAuth: boolean;
  user: IUser;
}

export default function HeaderNavigation({ isAdmin, isAuth, user }: IProps) {
  useGetCartProductsQuery(user.id, {
    skip: !isAuth,
    refetchOnMountOrArgChange: true,
  });
  const inCart = useAppSelector((state) => state.cart.items.length);
  const inFavorite = useAppSelector((state) => state.favorite.items.length);

  // Animations
  // bad lib for this case
  //or i didnt found  how to correct use tag in
  // for CSSTransition, when state changes
  const favorNodeRef = useRef(null);
  const cartNodeRef = useRef(null);
  const transitionClasses = {
    enter: 'animate__animated',
    enterActive: 'animate__bounceIn',
    exit: 'animate__animated',
    exitActive: 'animate__bounceIn',
  };
  const [favorTrigger, setFavorTrigger] = useState(false);
  const [cartTrigger, setCartTrigger] = useState(false);

  useEffect(() => {
    setFavorTrigger((prev) => !prev);
  }, [inFavorite]);
  useEffect(() => {
    setCartTrigger((prev) => !prev);
  }, [inCart]);

  console.log('nav');
  return (
    <nav className={css.headerNav}>
      {isAdmin && <MainLink to="/admin">Admin</MainLink>}
      <MainLink to="/cart">
        Cart
        {isAuth && (
          <CSSTransition
            in={cartTrigger}
            timeout={300}
            nodeRef={cartNodeRef}
            classNames={transitionClasses}
          >
            <div
              ref={cartNodeRef}
              className={css.badge}
            >
              {inCart}
            </div>
          </CSSTransition>
        )}
      </MainLink>
      <MainLink to="/favorite">
        Favorite
        <CSSTransition
          in={favorTrigger}
          timeout={300}
          nodeRef={favorNodeRef}
          classNames={transitionClasses}
        >
          <div
            key={inFavorite}
            ref={favorNodeRef}
            className={css.badge}
          >
            {inFavorite}
          </div>
        </CSSTransition>
      </MainLink>
      <MainLink to="/login">Sign in/up</MainLink>
    </nav>
  );
}
