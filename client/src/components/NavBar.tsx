import React, {useContext} from 'react';
import {ADMIN, ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, MANAGER, MANAGER_ROUTE, SHOP_ROUTE} from "../utils/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faShoppingBag, faSignIn, faUser, faCrown, faChartBar} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {Context} from "../index";
import {observer} from "mobx-react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NavBar = observer(() => {
  const notify = () => toast.error("Ви не авторизований користувач!");
  const context = useContext(Context)
  const user = context?.user;
  console.log(user)
  const navAnimation = () => {
    const navElems = document.querySelectorAll('.list-item');
    navElems.forEach((elem) => {
      const htmlElem = elem as HTMLElement;
      htmlElem.style.animation = 'none';
      setTimeout(() => {
        htmlElem.style.animation = 'fadeIn 0.5s ease forwards';
      }, 10);
    });
  };
  const handleLogout = () => {
    user?.setIsAuth(false);
    user?.clearUser();
  };
  return (
    <>
      <div className="navbar-container">
        {!user?.isAuth ? <ToastContainer/> : null}
      </div>
      <div className="container-navbar">
        <div className="navbar" onClick={navAnimation}>
          <Link to={SHOP_ROUTE}>
            <li className="list-item">
              <i className="fa-solid">
                <FontAwesomeIcon icon={faHouse}/>
              </i>
              <span className="list-item-name">Home</span>
            </li>
          </Link>
          <Link
            to={user?.isAuth ? BASKET_ROUTE : LOGIN_ROUTE}
            onClick={() => (user?.isAuth ? null : notify())}
          >
            <li className="list-item">
              <i className="fa-solid">
                <FontAwesomeIcon icon={faShoppingBag}/>
              </i>
              <span className="list-item-name">Basket</span>
            </li>
          </Link>
          {user?.isAuth ? (
            <>
              {(user?.user?.role === ADMIN || user?.user?.role === MANAGER) && (
                <Link to={user?.user?.role === ADMIN ? ADMIN_ROUTE : MANAGER_ROUTE}>
                  <li className="list-item">
                    <i className="fa-solid">
                      <FontAwesomeIcon icon={user?.user?.role === ADMIN ? faCrown : faChartBar}/>
                    </i>
                    <span className="list-item-name">
                      {user?.user?.role === ADMIN ? "Admin panel" : "Manager panel"}
                    </span>
                  </li>
                </Link>
              )}
              <Link to={LOGIN_ROUTE}>
                <li className="list-item" onClick={handleLogout}>
                  <i className="fa-solid">
                    <FontAwesomeIcon icon={faSignIn}/>
                  </i>
                  <span className="list-item-name">Exit</span>
                </li>
              </Link>
            </>
          ) : (
            <Link to={LOGIN_ROUTE}>
              <li className="list-item" onClick={() => user?.setIsAuth(false)}>
                <i className="fa-solid">
                  <FontAwesomeIcon icon={faUser}/>
                </i>
                <span className="list-item-name">Authorisation</span>
              </li>
            </Link>
          )}
        </div>
      </div>
    </>
  );
});

export default NavBar;