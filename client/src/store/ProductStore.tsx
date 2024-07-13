import {makeAutoObservable} from 'mobx';

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

export default class ProductStore {
  _products: Product[];

  constructor() {
    this._products = [];
    makeAutoObservable(this);
  }

  get products() {
    return this._products;
  }

  set products(products: Product[]) {
    this._products = products;
  }
}
