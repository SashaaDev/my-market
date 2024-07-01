import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';

interface IContext {
  user: UserStore;
  product: ProductStore;
}

export const Context = createContext<IContext | null>(null);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Context.Provider value={{
      user: new UserStore(),
      product: new ProductStore()
    }}>
      <App />
    </Context.Provider>
);

reportWebVitals();
