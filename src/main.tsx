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
import { MyAllBlogs } from "./components/MyAllBlogs";
import { BlogMangment } from "./components/BlogMangment";
import UserMenue from "./components/common/UserMenue/UserMenue";
import { DeleteBlog2 } from "./components/DeleteBlog2";
import { Header } from "./components/common/Header";
import { Test1 } from "./components/Test1";
import { userRoleLoader } from "./components/Test1/Test1";
import { OrderManagement } from "./components/OrderManagement";
import { cartArchivesAndOrderLoader } from "./components/OrderManagement/OrderManagement";
import { ShowProductsForOrder } from "./components/ShowProductsForOrder";
import { ShowAllOrderDetails } from "./components/ShowAllOrderDetails";
import { UpdateStatusWarning } from "./components/UpdateStatusWarning";
import { DeleteCartArchivesAndOrder } from "./components/DeleteCartArchivesAndOrder";
import { MyOrderHistory } from "./components/MyOrderHistory";
import { ShowProductsForOrderHistory } from "./components/ShowProductsForOrderHistory";
import { ShowAllOrderDetailsMyHistory } from "./components/ShowAllOrderDetailsMyHistory";
import { ManagementUsers } from "./components/ManagementUsers";
import { handleManagementUser } from "./components/ManagementUsers/ManagementUsers";
import { ContactForm } from "./components/ContactForm";
import { ContactMassage } from "./components/ContactMassage";
import { DeleteProfileSuccess } from "./components/DeleteProfileSuccess";
import { DeleteProfileFail } from "./components/DeleteProfileFail";
import { NotActiveMassage } from "./components/NotActiveMassage";
import { NotFoundPage } from "./components/NotFoundPage";
//production
const router = createBrowserRouter([
  {
    path: "orderpage/ordernumberpage",
    element: <OrderNumberPage />,
    loader: cartLoader,
  },
  {
    path: "/signinindicationpage",
    element: <SignInIndicationPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "notfoundpage",
    element: <NotFoundPage />,
  },
  {
    path: "deleteprofilesuccess",
    element: <DeleteProfileSuccess />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/test1",
        element: <Test1 />,
        loader: userRoleLoader,
      },
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
        path: "contactform",
        element: <ContactForm />,
      },
      {
        path: "contactmassage",
        element: <ContactMassage />,
      },

      {
        path: "deleteprofilefail",
        element: <DeleteProfileFail />,
      },

      {
        path: "header/usermenue",
        element: (
          <ProtectedRoute>
            <UserMenue />
          </ProtectedRoute>
        ),
        loader: userRoleLoader,
      },
      {
        path: "header",
        element: <Header />,
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
      },
      {
        path: "myallblogs",
        element: <MyAllBlogs />,
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
        loader: userRoleLoader,
      },
      {
        path: "blogs/editblog/:id",
        element: <EditBlog />,
        loader: blogsLoader,
      },
      {
        path: "blogmangment",
        element: <BlogMangment />,
        loader: blogsLoader,

        children: [
          {
            path: "deleteblog2/:id",
            element: <DeleteBlog2 />,
          },
        ],
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
        path: "notactivemassage",
        element: <NotActiveMassage />,
      },

      {
        path: "orderpage",
        element: <OrderPage />,
        loader: cartLoader,
      },
      {
        path: "managementusers",
        element: <ManagementUsers />,
        loader: handleManagementUser,
      },

      {
        path: "myorderhistory",
        element: <MyOrderHistory />,
        loader: cartArchivesAndOrderLoader,
        children: [
          {
            path: "showproductsforOrderhistory/:id",
            element: <ShowProductsForOrderHistory />,
            loader: cartArchivesAndOrderLoader,
          },
          {
            path: "showallorderdetailsmyhistory/:id",
            element: <ShowAllOrderDetailsMyHistory />,
            loader: cartArchivesAndOrderLoader,
          },
        ],
      },
      {
        path: "ordermanagement",
        element: (
          <ProtectedRoute>
            <OrderManagement />,
          </ProtectedRoute>
        ),
        loader: cartArchivesAndOrderLoader,
        children: [
          {
            path: "showproductsfororder/:id",
            element: <ShowProductsForOrder />,
            loader: cartArchivesAndOrderLoader,
          },
          {
            path: "showallorderdetails/:id",
            element: <ShowAllOrderDetails />,
            loader: cartArchivesAndOrderLoader,
          },
          {
            path: "updatestatuswarning/:id",
            element: <UpdateStatusWarning />,
            loader: cartArchivesAndOrderLoader,
          },
          {
            path: "deletecartarchivesandorder/:id",
            element: <DeleteCartArchivesAndOrder />,
            loader: cartArchivesAndOrderLoader,
          },
        ],
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
