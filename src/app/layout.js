'use client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from '../store';
import { GatewayProvider } from '../GatewayProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{}}>
      <body>
        <Provider store={store}>
          <GatewayProvider>
            {children}
            <ToastContainer />
          </GatewayProvider>
        </Provider>
      </body>
    </html>
  );
}
