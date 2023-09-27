import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import { store, Persistor } from './state/store';
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={Persistor}>
            <App />
          </PersistGate>
          
          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>

  </React.StrictMode>
);


