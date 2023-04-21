import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import { Home } from "./routes/Home";

import { Register } from "./routes/Register";
import Root from "./routes/Root";
import { ToSignIn } from "./routes/ToSignIn";

import { About } from "./routes/About";
import { Menu } from "./routes/Menu";
import { OpeningTimes } from "./routes/OpeningTimes";
import { Coupons } from "./routes/Coupons";
import { Blogs } from "./routes/Blogs";
import { blogsLoader } from "./routes/Blogs/Blogs";
import { AddBlog } from "./components/AddBlog";
import { DeleteBlog } from "./components/DeleteBlog";
import { BlogPage } from "./components/BlogPage";
import { EditBlog } from "./components/EditBlog";
import { EmailVarification } from "./EmailVarification";
import AuthProvider from "./context/AuthProvider";
import { EmailInUse } from "./EmailInUse";
import { ForgotPassWord } from "./components/ForgotPassword";
import { ResetPasswordPage } from "./components/ResetPasswordPage";
import { Dashboard } from "./components/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DeleteProfile } from "./components/DeleteProfile";
import { DeleteprofilePage } from "./components/DeleteprofilePage";
import { AllProducts } from "./routes/Products";
import { productsLoader } from "./routes/Products/AllProducts";
import { AddProduct } from "./components/AddProduct";
import { DeleteProduct } from "./components/DeleteProduct";
import { EditProduct } from "./components/EditProduct";
import { UploadFile } from "./components/UploadFile";
import ProductPage, {
  ProductLoader,
} from "./components/ProductPage/ProductPage";

import { AddToShoppingCart } from "./components/AddToShoppingCart";
import { ShoppingCart } from "./routes/ShoppingCart";
import { cartLoader } from "./routes/ShoppingCart/ShopingCart";
import { ShoppingCartDummy } from "./routes/ShoppingCartDummy";
import { OrderPage } from "./components/OrderPage";
import { SignInIndicationPage } from "./components/SignInIndicationPage";
import { SignInMassageError } from "./components/SignInMassageError";
import { OrderNumberPage } from "./components/OrderNumberPage";

const router = createBrowserRouter([
  {
    path: "orderpage/ordernumberpage",
    element: <OrderNumberPage />,
    loader: cartLoader,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/tosignin",
        element: <ToSignIn />,
      },
      {
        path: "/signinindicationpage",
        element: <SignInIndicationPage />,
      },
      {
        path: "/signinmassageerror",
        element: <SignInMassageError />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "openingtimes",
        element: <OpeningTimes />,
      },
      {
        path: "coupons",
        element: <Coupons />,
      },
      {
        path: "blogs",
        element: <Blogs />,
        loader: blogsLoader,
        children: [
          {
            path: "deleteblog/:id",
            element: <DeleteBlog />,
          },
        ],
      },
      {
        path: "blogs/addblog",
        element: <AddBlog />,
      },
      {
        path: "blogs/blogpage/:id",
        element: <BlogPage />,
      },
      {
        path: "blogs/editblog/:id",
        element: <EditBlog />,
      },
      {
        path: "emailverification",
        element: <EmailVarification />,
      },
      {
        path: "emailinuse",
        element: <EmailInUse />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassWord />,
      },
      {
        path: "resetpasswordpage",
        element: <ResetPasswordPage />,
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "allproducts/editproduct/:id",
        element: <EditProduct />,
        loader: ProductLoader,
      },

      {
        path: "allproducts",
        element: <AllProducts />,
        loader: productsLoader,
        children: [
          {
            path: "deleteproduct/:id",
            element: <DeleteProduct />,
          },
          {
            path: "uploadfile/:id",
            element: <UploadFile />,
          },
          {
            path: "addtoshoppingcart/:id",
            element: <AddToShoppingCart />,
          },
        ],
      },
      {
        path: "allproducts/productpage/:id",
        element: <ProductPage />,
        loader: ProductLoader,
        children: [
          {
            path: "addtoshoppingcart/:id",
            element: <AddToShoppingCart />,
          },
        ],
      },
      {
        path: "shoppingcart",
        element: <ShoppingCart />,
        loader: cartLoader,
      },
      {
        path: "shoppingcartdummy",
        element: <ShoppingCartDummy />,
      },
      {
        path: "orderpage",
        element: <OrderPage />,
        loader: cartLoader,
      },

      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "deleteprofile",
        element: (
          <ProtectedRoute>
            <DeleteProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "deleteprofilepage",
        element: (
          <ProtectedRoute>
            <DeleteprofilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
