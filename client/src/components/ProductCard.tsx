import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../index";
import opacityAppear from "../pages/anim";

interface Product {
  imageUrl: string;
  title: string;
  category: string;
  description: string;
  price: number;
  stock: number;
}

const ProductCard = ({ product } : {product: Product}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const state = useContext(Context);
  const isLogin = state?.user.isAuth;

  const notify = () => {
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
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    const wrapper = document.querySelector(".product-card");
    if (wrapper instanceof HTMLElement) {
      opacityAppear(wrapper);
    }
  }, []);

  return (
      <div className={`product-card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardClick}>
        <div className="product-card-inner">
          <div className="product-card-front">
            <img className="product-card-img" src={product.imageUrl} alt={product.title} />
            <div className="product-card-info">
              <p className="product-card-category">Category: {product.category}</p>
              <h3 className="product-card-title">{product.title}</h3>
              <p className="product-card-price">${product.price}</p>
              {isLogin ? (
                  <div onClick={notify} className="list-item-bag">
                    <i className="fa-solid">
                      <FontAwesomeIcon icon={faShoppingBag} />
                    </i>
                  </div>
              ) : null}
            </div>
          </div>
          <div className="product-card-back">
            <h3 className="product-card-title">{product.title}</h3>
            <p className="product-card-category">Category: {product.category}</p>
            <p className="product-card-description">{product.description}</p>
            <p className="product-card-stock">Stock: {product.stock}</p>
          </div>
        </div>
      </div>
  );
};

export default ProductCard;
