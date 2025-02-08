import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";
import opacityAppear from "./anim";
import axios from "axios";
import {MANAGER} from "../utils/constants";
import {Product} from "../types";


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

const ManagerPage = () => {
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
                });
            }
        };

        if (isLogin && role === MANAGER) {
            fetchData();
        } else {
            notifyError();
        }

        const wrapp = document.querySelector('.container-manager-panel');
        if (wrapp instanceof HTMLElement) {
            opacityAppear(wrapp);
        }
    }, [isLogin, role]);

    if (!isLogin || role !== MANAGER) {
        notifyError();
        return null;
    }
    return (
        <>
            <div className="container-manager-panel">
                <h1>Manager panel</h1>
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
                            <th>Update</th>
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

export default ManagerPage