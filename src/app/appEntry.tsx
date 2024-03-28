import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { appStore } from './appStore';
import { appRouter } from './appRouter';

import { ThemeProvider } from '@/components/theme/ThemeProvider';

import '@/app/assets/main.scss';

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={appStore}>
      <ThemeProvider>
        <RouterProvider router={appRouter()} />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);
