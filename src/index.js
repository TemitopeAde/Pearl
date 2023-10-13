import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux';
import { store, Persistor } from './state/store';
import { PersistGate } from "redux-persist/integration/react";
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

const stripePromise = loadStripe('pk_test_8lvJpXB66TzWBz4Z9QzGTINl00mw2SI7Er');

const options = {
  // passing the client secret obtained in step 3
  clientSecret: 'pi_3O0LgmBnuO3qsQ6n0mH03CM3_secret_Me9LSqjYbU3z5ZIVfd2jUs6ae',
};


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={Persistor}>
            <Elements stripe={stripePromise} options={options}>
              <App />
            </Elements>
           
          </PersistGate>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>

  </React.StrictMode>
);


