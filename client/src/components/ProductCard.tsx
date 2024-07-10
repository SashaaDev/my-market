import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../index";
import opacityAppear from "../pages/anim";
import axios from "axios";

interface Product {
  _id: string;
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  price: number;
  stock: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const state = useContext(Context);
  const isLogin = state?.user.isAuth;
  const token = state?.user.token;

  const notifyAuth = () => toast.error("Ви не авторизований користувач! Щоб додати продукт в корзину, ви повинні бути зареєстрований!");

  const notify = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLogin) {
      notifyAuth();
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/basket/create`, {
        productId: product._id,
        quantity: 1
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success("Товар добавлен в корзину", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error: any) {
      console.error("Error adding product to basket:", error.response?.data || error.message);

      toast.error("Ошибка добавления товара в корзину", {
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
  };




  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const wrappers = document.querySelectorAll(".product-card");
    wrappers.forEach((wrapper) => {
      if (wrapper instanceof HTMLElement) {
        opacityAppear(wrapper);
      }
    });
  }, []);

  return (
      <div className={`product-card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
        <div className="product-card-inner">
          <div className="product-card-front">
            <img className="product-card-img" src={product.imageUrl} alt={product.title} />
            <div className="product-card-info">
              <h2 className="product-card-title">{product.title}</h2>
              <h3 className="product-card-memory">Memory: <span className="product-card-memory-value">128GB</span></h3>
              <h3 className="product-card-price">Price: <span className="product-card-price-value">${product.price}</span></h3>
              <div className="list-item-bag">
                <i onClick={notify} className="fa-solid">
                  <FontAwesomeIcon icon={faShoppingBag} />
                </i>
              </div>
            </div>
          </div>
          <div className="product-card-back">
            <h3 className="product-card-title">{product.title}</h3>
            <h4 className="product-card-category">Категорія: {product.category}</h4>
            <div className="product-card-description">
              <h3 className="product-card-title-desc">Опис:</h3>
              <p>{product.description}</p>
            </div>
            <h4 className="product-card-stock">В наявності: {product.stock} шт</h4>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;
