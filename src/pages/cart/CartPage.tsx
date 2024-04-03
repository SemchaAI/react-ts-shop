import MainBtn from '@/components/buttons/MainBtn';
import CloseIcon from '@/components/icons/CloseIcon';
import { Link } from 'react-router-dom';

import css from './cartPage.module.scss';
import { useAppSelector } from '@/app/utils/hooks';
import { useDeleteOneMutation } from '@/services/cartApi';

const url = import.meta.env.VITE_BASE_URL_BD;

export default function CartPage() {
  const { items } = useAppSelector((state) => state.cart);
  const { id: userId } = useAppSelector((state) => state.user.user);

  const [deleteOne] = useDeleteOneMutation();

  const removeHandler = async (productId: string): Promise<void> => {
    deleteOne({ userId, productId });
  };
  return (
    <section className={css.cart}>
      <div className="wrapper">
        <div className={css.cartContainer}>
          <h1 className={css.cartTitle}>Cart</h1>
          {items.length > 0 ? (
            <div className={css.cartBlock}>
              <ul className={css.cartItems}>
                {items.map((item) => (
                  <li
                    className={css.cartItem}
                    key={item._id}
                  >
                    <div className={css.cartItemContainer}>
                      <img
                        width="200"
                        height="200"
                        className={css.cartItemImg}
                        src={url + '/' + item.img}
                        alt={item.title}
                      />
                      <div className={css.cartItemInfo}>
                        <div className={css.cartItemTitle}>{item.title}</div>
                        <div className={css.cartItemDescription}>
                          {item.description}
                        </div>
                        <div className={css.cartItemPrice}>
                          <span>Цена:</span>
                          {item.price}
                          <b>MDL</b>
                        </div>
                      </div>
                    </div>
                    <MainBtn
                      version="outline"
                      icon={true}
                      onClick={() => removeHandler(item._id)}
                      // className={css.cartItemBtn}
                    >
                      <CloseIcon
                        width={24}
                        height={24}
                        className={css.cartItemBtnIcon}
                      />
                    </MainBtn>
                  </li>
                ))}
              </ul>
              <div className={css.cartOrder}>
                <h3 className={css.cartTotalTitle}>Итого</h3>
                <div className={css.cartTotal}>{total} MDL</div>
                <div className={css.cartDelivery}>
                  Доставка <span>бесплатно</span>
                </div>
                <p className={css.cartPolicy}>
                  <span className={css.asterisk}>*</span>Покупая у нас товары вы
                  соглашаетесь с политикой конфиденциальности
                </p>
                <Link
                  className={css.cartLink}
                  to="/order"
                >
                  Order Now (temporal to home)
                </Link>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className={css.emptyCart}>Корзина пуста</div>
          ) : (
            <div className={css.cartError}>
              Ошибка. Корзина не была загружена
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
