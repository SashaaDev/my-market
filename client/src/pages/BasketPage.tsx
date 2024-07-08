import React, { useEffect, useState, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '../index';
import opacityAppear from '../pages/anim';
import axios from 'axios';

interface Product {
  _id: string;
  title: string;
  price: number;
}

interface Basket {
  _id: string;
  user: string;
  totalAmount: number;
  products: {
    product: Product;
    quantity: number;
  }[];
}

const BasketPage = () => {
  const state = useContext(Context);
  const [response, setResponse] = useState<Basket | null>(null);
  const isLogin = state?.user.isAuth;
  const token = state?.user.token;
  const notifyError = () => toast.error('Сталась помилка!');

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/basket`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResponse(res.data);

        if (res.data && res.data.products.length > 0) {
          const productId = res.data.products[0].product._id;
          const resProduct = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/${productId}`);
          console.log('Product details:', resProduct.data);
        }
      } catch (error) {
        notifyError();
        console.log(error);
      }
    };

    if (isLogin) {
      fetchBasket();
    }

    const wrapp = document.querySelector('.basket-container');
    if (wrapp instanceof HTMLElement) {
      opacityAppear(wrapp);
    }
  }, [isLogin, token]);

  const handleRemoveOneProduct = async (productId: string) => {
    try {
      const res = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/basket/remove`,
          {
            productId: productId,
            quantity: 1
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
      );

      setResponse(prevResponse => {
        if (!prevResponse) return null;
        const updatedProducts = prevResponse.products.map(item => {
          if (item.product._id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }).filter(item => item.quantity > 0);

        return {
          ...prevResponse,
          products: updatedProducts
        };
      });

      toast.success('Товар видалено з корзини', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error('Сталась помилка при видаленні', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
      <>
        <ToastContainer />
        <div className="container-basket"></div>
        <div className="basket-container">
          <div className="basket">
            <h1 className="basket-title">Корзина</h1>
          </div>
          <div className="basket-content">
            {response && response.products && response.products.length > 0 ? (
                response.products.map((item) => (
                    <div key={item.product._id} className="basket-item">
                      <h3>{item.product.title}</h3>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.product.price}</p>
                      <p>Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
                      <button className="remove-button" onClick={() => handleRemoveOneProduct(item.product._id)}>Remove One</button>
                    </div>
                ))
            ) : (
                <div className="basket-empty">Корзина порожня</div>
            )}
          </div>
        </div>
      </>
  );
};

export default BasketPage;
