import React, {useContext} from 'react';
import {SHOP_ROUTE, LOGIN_ROUTE, BASKET_ROUTE, ADMIN_ROUTE} from "../utils/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faShoppingBag,
  faSignIn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {Context} from "../index";

export default function NavBar() {
  const context = useContext(Context)
  const user = context?.user;
  const navAnimation = () => {
    const navElems = document.querySelectorAll('.list-item');
    navElems.forEach((elem) => {
      // const htmlElem = elem as HTMLElement;
      // htmlElem.style.animation = 'none';
      // setTimeout(() => {
      //   htmlElem.style.animation = 'fadeIn 0.5s ease forwards';
      // }, 10);
    });
  };
  return (
      <>
        <div className="navbar-container">
          {/*{!user?.isAuth ? <ToastContainer /> : null}*/}
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
                // to={user?.isAuth ? BASKET_ROUTE : LOGIN_ROUTE}
                to={BASKET_ROUTE}
                // onClick={() => (user.isAuth ? null : notify())}
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
                  <Link to={ADMIN_ROUTE}>
                    <li className="list-item">
                      <i className="fa-solid">
                        <FontAwesomeIcon icon={faUser}/>
                      </i>
                      <span className="list-item-name">Admin panel</span>
                    </li>
                  </Link>
                  <Link to={LOGIN_ROUTE}>
                    <li className="list-item" onClick={() => user?.setIsAuth(false)}>
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
}