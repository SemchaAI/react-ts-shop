import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { MainInput } from '@/components/inputs/MainInput';
import MainBtn from '@/components/buttons/MainBtn';
import MainLink from '@/components/links/MainLink';

import css from './loginForm.module.scss';

import { IForm } from '@/models/forms';

import { useLoginMutation, useRegisterMutation } from '@/services/userApi';
import { setAuth, setLoading } from '@/stores/user.slice';
import { useAppDispatch } from '@/app/utils/hooks';
import {
  ReqMin5Max10Validation,
  emailValidation,
} from '@/app/utils/validationObjects';

export default function LoginForm() {
  const dispatch = useAppDispatch();
  // START DYNAMIC DATA BY PATH
  const path = useLocation().pathname;
  const [isLogin, setIsLogin] = useState<boolean>();

  useEffect(() => {
    setIsLogin(path === '/login');
  }, [path]);

  const dynamicLabel = isLogin ? 'Имя/Email' : 'Имя';
  const Title = isLogin ? 'Вход' : 'Регистрация';
  // END DYNAMIC DATA BY PATH

  const [sendLogin] = useLoginMutation();
  const [sendRegister] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
    mode: 'onBlur',
  });

  const submitHandler: SubmitHandler<IForm> = async (data) => {
    console.log('formData', data);
    if (isLogin) {
      const LoginData = {
        email: data.name,
        password: data.password,
      };
      dispatch(setLoading(true));
      const res = await sendLogin(LoginData);
      dispatch(setLoading(false));
      if ('data' in res) {
        dispatch(setAuth(true));
        console.log(res);
      }
    } else {
      const res = await sendRegister(data);
      console.log(res);
    }
  };
  return (
    <div className={css.loginForm}>
      <h1 className={css.loginTitle}>{Title}</h1>
      <form
        className={css.loginForm}
        onSubmit={handleSubmit(submitHandler)}
      >
        {!isLogin && (
          <div className={css.field}>
            <div>
              <label
                className={css.label}
                htmlFor="email"
              >
                Почта:
              </label>
            </div>
            <MainInput
              id="email"
              error={errors.email}
              {...register('email', emailValidation)}
            />
          </div>
        )}
        <div className={css.field}>
          <div>
            <label
              className={css.label}
              htmlFor="nickname"
            >
              {dynamicLabel}
            </label>
          </div>
          <MainInput
            id="nickname"
            error={errors.name}
            {...register('name', ReqMin5Max10Validation)}
          />
        </div>
        <div className={css.field}>
          <div>
            <label
              className={css.label}
              htmlFor="password"
            >
              Пароль:
            </label>
          </div>
          <MainInput
            id="password"
            error={errors.password}
            {...register('password', ReqMin5Max10Validation)}
          />
        </div>
        <div className={css.formControls}>
          {isLogin ? (
            <div className={css.linkBlock}>
              Нет аккаунта?
              <MainLink to="/register">Зарегистрируйся</MainLink>
            </div>
          ) : (
            <div className={css.linkBlock}>
              Есть аккаунт?
              <MainLink to="/login">Вход</MainLink>
            </div>
          )}
          <MainBtn
            version="contain"
            type="submit"
            disabled={!isValid}
          >
            Вход/Регистрация
          </MainBtn>
        </div>
      </form>
    </div>
  );
}
