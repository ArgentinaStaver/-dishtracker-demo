'use client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from '../store';
import { GatewayProvider } from '../GatewayProvider';
import CategoriesProvider from '../context/categories';

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{}}>
      <body>
        <Provider store={store}>
          <CategoriesProvider>
            <GatewayProvider>
              {children}
              <ToastContainer />
            </GatewayProvider>
          </CategoriesProvider>
        </Provider>
      </body>
    </html>
  );
}
