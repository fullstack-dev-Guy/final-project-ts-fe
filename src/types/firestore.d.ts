import { PropsWithChildren } from "react";

export interface Blog {
  title: string;
  body: string;
  firstname: string;
  lastname: string;
  id: string | string;
}

export interface Product {
  productname: string;
  productId: string;
  productprice: string;
  productcategory: string;
  productDescription: string;
  imageToProduct: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  id: string | string;
}

export type Cart = {
  id: string;
  products: string[];
  role: Role;
  createdAt: string;
  updatedAt: string;
  userID: string;
  ses: string;
  userID: string;
  email: string;
  orderNumber: string;
  date: string;
};

export type CartArchives = {
  id: string;
  cart: string;
  products: string[];
  role: Role;
  createdAt: string;
  updatedAt: string;
  userID: string;
  ses: string;
  email: string;
  orderNumber: string;
  date: string;
  itemquantity: string;
  paymentamount: string;
};

export interface Order {
  firstname: string;
  lastname: string;
  phonenumber: string;
  email: string;
  otherrequest: string;
  orderstatus: string;
  itemquantity: number;
  paymentamount: string;
  date: string;
  id: string;
  role: string;
  cart: string;
  address: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  firebaseUserID: string;
}

export interface MyFetchResponse<T> {
  data: T | null;
  data1: T | null;
  data2: T | null;
  status: "success" | "error";
  message?: string;
}

export interface userDb {
  id: string;
  email: string;
  password: string;
  displayName: string;
  userId: string;
  UserDocId?: string;
  role: Role;
  orders: string[];
  firebaseUserID: string;
}

export interface getDocId {
  id: srtring;
}

enum Role {
  guest,
  editor,
  user,
  admin,
}
