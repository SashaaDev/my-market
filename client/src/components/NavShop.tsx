import React, {useContext, useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPhone, faTablet, faLaptop, faKeyboard, faDesktop, faAppleWhole} from "@fortawesome/free-solid-svg-icons";
import {ToastContainer, toast} from "react-toastify";
import axios from "axios";
import opacityAppear from "../pages/anim";
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  createdAt: Date;
}

interface NavShopProps {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const NavShop: React.FC<NavShopProps> = ({setProducts}) => {
  const [categorySelected, setCategorySelected] = useState(false);

  const notifyError = () => toast.error("Сталась помилка!");
  const notifyExist = () => toast.error("Товару немає в наявності!");
  const handleCategoryClick = async (category: string) => {
    try {
      setCategorySelected(false);
      setProducts([]);
      const response = await axios.get<Product[]>(
          `${process.env.REACT_APP_BACKEND_URL}/api/product/category/${category}`
      );
      if (response.data.length === 0) {
        // console.log('Товару немає в наявності!');
        notifyExist();
        setCategorySelected(false);
        return;
      }
      setProducts(response.data);
      setCategorySelected(true);
    } catch (error) {
      notifyError();
      console.log(error);
    }
  };

  useEffect(() => {
    const wrapper = document.querySelector(".navshop-container");
    if (wrapper instanceof HTMLElement) {
      opacityAppear(wrapper);
    }
  }, []);

  return (
      <>
        <div className="container-navshop">
          <ToastContainer/>
        </div>
        <div className="navshop-container">
          <div className="navshop-wrap">
            <li className="navshop-item" onClick={() => handleCategoryClick('iPhones')}>
              <i className="fa-solid">
                <FontAwesomeIcon icon={faPhone}/>
              </i>
              <span className="navshop-item-name">iPhones</span>
            </li>
            <li className="navshop-item" onClick={() => handleCategoryClick('iPads')}>
              <i className="fa-solid">
                <FontAwesomeIcon icon={faTablet}/>
              </i>
              <span className="navshop-item-name">iPads</span>
            </li>
            <li className="navshop-item" onClick={() => handleCategoryClick('MacBooks')}>
              <i className="fa-solid">
                <FontAwesomeIcon icon={faLaptop}/>
              </i>
              <span className="navshop-item-name">MacBooks</span>
            </li>
            <li className="navshop-item" onClick={() => handleCategoryClick('iMacs')}>
              <i className="fa-solid">
                <FontAwesomeIcon icon={faDesktop}/>
              </i>
              <span className="navshop-item-name">iMacs</span>
            </li>
            <li className="navshop-item" onClick={() => handleCategoryClick('Accessories')}>
              <i className="fa-solid">
                <FontAwesomeIcon icon={faKeyboard}/>
              </i>
              <span className="navshop-item-name">Accessories</span>
            </li>
          </div>
          {!categorySelected && (<h1 className="navshop-title">
            Welcome to MacMerch Shop
            <i className="fa-solid">
              <FontAwesomeIcon icon={faAppleWhole}/>
            </i>
          </h1>)}
        </div>
      </>
  );
};

export default NavShop;
