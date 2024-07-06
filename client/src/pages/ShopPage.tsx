import React, {useEffect, useState} from 'react';
import NavShop from "../components/NavShop";
import opacityAppear from "./anim";
import ProductCard from "../components/ProductCard"; // Предполагается, что у вас есть компонент ProductCard для отображения продукта

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

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const wrapper = document.querySelector(".shop-container");
    if (wrapper instanceof HTMLElement) {
      opacityAppear(wrapper);
    }
  }, []);

  return (
      <div className="shop-container">
        <NavShop setProducts={setProducts}/>
        {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
        ))}
      </div>
  );
};

export default ShopPage;
