import React, {useEffect, useState, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Context} from '../index';
import {Product} from "../types";
import axios from "axios";

const categories = [
    "iPhones",
    "MacBooks",
    "iPads",
    "iMacs",
    "Accessories"
];

const UpdateProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const state = useContext(Context);
    const token = state?.user.token;
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/product/${id}`
                );
                console.log(response.data);
                setProduct(response.data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.patch(
                `${process.env.REACT_APP_BACKEND_URL}/api/product/update/${id}`,
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate("/admin");
        } catch (err) {
            console.log(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Оновлення товару: {product?.title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Назва:</label>
                    <input
                        type="text"
                        id="name"
                        value={product?.title || ""}
                        onChange={(e) => {
                            setProduct({
                                ...product!,
                                title: e.target.value
                            })
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="description">Опис:</label>
                    <textarea
                        rows={5}
                        cols={80}
                        id="description"
                        value={product?.description || ""}
                        onChange={(e) => {
                            setProduct({
                                ...product!,
                                description: e.target.value
                            })
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="price">Ціна:</label>
                    <input
                        type="number"
                        id="price"
                        value={product?.price || ""}
                        onChange={(e) => {
                            setProduct({
                                ...product!,
                                price: parseFloat(e.target.value),
                            })
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="category">Категорія:</label>
                    <select
                        id="category"
                        value={product?.category || ""}
                        onChange={(e) => {
                            setProduct({
                                ...product!,
                                category: e.target.value,
                            });
                        }}
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="image">Зображення:</label>
                    <input
                        type="text"
                        id="image"
                        value={product?.imageUrl || ""}
                        onChange={(e) => {
                            setProduct({
                                ...product!,
                                imageUrl: e.target.value,
                            });
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="stock">Кількість:</label>
                    <input
                        type="number"
                        id="stock"
                        value={product?.stock || ""}
                        onChange={(e) => {
                            setProduct({
                                ...product!,
                                stock: parseInt(e.target.value),
                            });
                        }}
                    />
                </div>
                <button className="button" type="submit">Оновити</button>
                <button className="button" onClick={() => navigate("/admin")}>Назад</button>

            </form>
        </div>
    );
};

export default UpdateProductPage;