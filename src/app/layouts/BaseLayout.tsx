// import { LayoutHeader } from '@/widgets/LayoutHeader';
import MainFooter from '@/components/footers/MainFooter';
import { MainHeader } from '@/components/headers/MainHeader';
import { Outlet, ScrollRestoration } from 'react-router-dom';

// import { register } from 'swiper/element/bundle';
// register();

import css from './baseLayout.module.css';
import 'animate.css';

import Modal from 'react-modal';

Modal.setAppElement('#root');

export function BaseLayout() {
  console.log('layout');
  return (
    <>
      <MainHeader />
      <main className={css.main}>
        <Outlet />
      </main>
      <MainFooter />
      <ScrollRestoration />
    </>
  );
}
