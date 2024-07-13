import React, {useEffect, useContext, useState} from 'react';
import {Context} from "../index";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import opacityAppear from "./anim";
import axios from "axios";
import {ADMIN} from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Product {
  _id: string,
  title: string,
  description: string,
  price: number,
  category: string,
  imageUrl: string,
  stock: number,
  createdAt: Date
}

interface Order {
  _id: string,
  user: string,
  products: {
    product: Product,
    quantity: number
  }[],
  totalAmount: number,
  status: string,
  createdAt: Date,
}

const AdminPage = () => {
  const state = useContext(Context);
  const isLogin = state?.user.isAuth;
  const role = state?.user.user?.role;
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([])
  const notifyError = () => toast.error('У вас немає доступу!')
  const token = state?.user.token;
  useEffect(() => {
    const fetchData = async () => {
      try {

        const allProductsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product/`,
          {
            headers:
              {
                Authorization: `Bearer ${token}`
              }
          }
          );
        setProducts(allProductsResponse.data);
        const allOrdersResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/order`,
          {
            headers:
              {
                Authorization: `Bearer ${token}`,
              }
          }
        );
        setOrders(allOrdersResponse.data);
      } catch (error) {
        toast.error('Сталась непередбачувана помилка', {
          position: 'top-right',
          autoClose: 5000,
          theme: 'dark'
        });
      }
    };

    if (isLogin && role === ADMIN) {
      fetchData();
    } else {
      notifyError();
    }

    const wrapp = document.querySelector('.container-admin-panel');
    if (wrapp instanceof HTMLElement) {
      opacityAppear(wrapp);
    }
  }, [isLogin, role]);

  if (!isLogin || role !== ADMIN) {
    notifyError();
    return null;
  }
  const deleteProduct = async (productId: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
      toast.success('Продукт видалено', {
        position: 'top-right',
        autoClose: 5000,
        theme: 'dark'
      });
    } catch (error) {
      toast.error('Сталась непередбачувана помилка', {
        position: 'top-right',
        autoClose: 5000,
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-admin-panel">
        <h1>Admin Panel</h1>
        <div className="products-section">
          <h2>Products</h2>
          <table>
            <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Delete item</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product: Product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td className="admin-product-description">{product.description}</td>
                <td>{product.price} $</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                {/*<th>Update</th>*/}
                <td className="admin-product-delete-btn" onClick={() => {
                  deleteProduct(product._id)
                }}>
                  <i className="fa-solid">
                    <FontAwesomeIcon icon={faTrash}/>
                  </i>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="orders-section">
          <h2>Orders</h2>
          <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Products</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Created At</th>
              {/*<th>Create</th>*/}
              <th>Update</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td>{order.user}</td>
                <td>
                  {order.products.map((item) => (
                    <div key={item.product._id}>
                      {item.product.title} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td>{order.totalAmount}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AdminPage