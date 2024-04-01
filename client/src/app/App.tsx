import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { store, persistor } from '@lib/redux/store';
import { AllRoutes } from '@lib/routes/AllRoutes';
import { GlobalStyle } from '@lib/styles/globalStyles';

export const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={null}>{<AllRoutes />}</Suspense>
          <GlobalStyle />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};