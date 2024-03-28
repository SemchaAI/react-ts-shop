import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import { BaseLayout } from './layouts/BaseLayout';
import ProductPage from '@/pages/product/ProductPage';
import AdminPage from '@/pages/admin/AdminPage';
import CartPage from '@/pages/cart/CartPage';
import FavoritePage from '@/pages/favorite/FavoritePage';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <div>error</div>,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/admin',
          element: <AdminPage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
        {
          path: '/favorite',
          element: <FavoritePage />,
        },
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <LoginPage />,
        },
        {
          path: '/order',
          element: <div>Order</div>,
        },
        {
          path: '/product/:productId',
          element: <ProductPage />,
        },
      ],
    },
  ]);
