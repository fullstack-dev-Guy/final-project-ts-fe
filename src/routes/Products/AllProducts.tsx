import { useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

import { MyFetchResponse, Product, userDb } from "../../types/firestore";
import { auth } from "../../lib/firebase";

export default function AllProducts() {
  const products = useLoaderData() as MyFetchResponse<Product[]>;
  const { user } = useAuth();

  const [productcategory, setProductcategory] = useState("AllCategories");

  const navigate = useNavigate();

  let category1 = products.data?.filter(
    (product) => product.productcategory === "Sweets & Cookies"
  );

  let category2 = products.data?.filter(
    (product) => product.productcategory === "Vegan"
  );

  let category3 = products.data?.filter(
    (product) => product.productcategory === "GlutenFree"
  );

  let category4 = products.data?.filter(
    (product) => product.productcategory === "Toasts"
  );

  let category5 = products.data?.filter(
    (product) => product.productcategory === "Salads"
  );

  let category6 = products.data?.filter(
    (product) => product.productcategory === "Drinks"
  );

  let category7 = products.data?.filter(
    (product) => product.productcategory === "Pastries"
  );

  //imageArry1.filter((x) => !imageArry2.includes(x));

  if (products.status === "error") return <p>{products.message}</p>;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allUsers = useLoaderData() as MyFetchResponse<userDb[]>; //data2

  var arryForGettingAllusers = JSON.parse(JSON.stringify(allUsers.data1)).map(
    (x: userDb) => x
  );

  let userRecognize = arryForGettingAllusers!.filter(
    (x: userDb) => x.email === auth.currentUser?.email
  );

  let currentRole1 = userRecognize.map((x: userDb) => x.role);
  let currentRole = currentRole1[0];

  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="mx-auto mt-44 max-w-screen-2xl p-6">
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-2xl py-8 px-2 lg:py-16 lg:px-6">
          <div className="mx-auto mb-6 max-w-screen-sm text-center lg:mb-6">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
              המוצרים שלנו
            </h2>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
              לרשותכם דף המוצרים שלנו , ניתן ליצור הזמנה ולשלם בסל הקניות,לקבל
              מספר הזמנה וכשתגיעו לעגלה שלנו ,בהצגת מספר הזמנה תקבלו את ההזמנה
              שלכם
            </p>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
              לנרשמים באתר הנחה של 5% על כל מוצרי העגלה
            </p>
          </div>
          {(user && currentRole === "admin") || currentRole === "editor" ? (
            <div className="  mb-2 flex justify-center">
              <button
                onClick={() => navigate("/addproduct")}
                className=" rounded-lg border border-gray-700 bg-yellow-200 p-2 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                צור מוצר
              </button>
            </div>
          ) : null}
          <div className="my-4 flex justify-center border border-solid bg-orange-200 text-2xl font-medium ">
            <span> בחר/י קטגוריה</span>
          </div>
          <div>
            <ul className="w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
              <li className="w-full border-b border-gray-200 text-center dark:border-gray-600 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                  <input
                    onChange={(event) => setProductcategory(event.target.value)}
                    checked={productcategory === "Pastries"}
                    id="horizontal-list-radio-license"
                    type="radio"
                    value="Pastries"
                    name="productcategory"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                  <label
                    htmlFor="horizontal-list-radio-license"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    מאפים{" "}
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 text-center dark:border-gray-600 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                  <input
                    onChange={(event) => setProductcategory(event.target.value)}
                    checked={productcategory === "Drinks"}
                    id="horizontal-list-radio-id"
                    type="radio"
                    value="Drinks"
                    name="productcategory"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                  <label
                    htmlFor="horizontal-list-radio-id"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    משקאות
                  </label>
                </div>
              </li>
              <li className=" w-full border-b border-gray-200 text-center dark:border-gray-600 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                  <input
                    onChange={(event) => setProductcategory(event.target.value)}
                    checked={productcategory === "Salads"}
                    id="horizontal-list-radio-millitary"
                    type="radio"
                    value="Salads"
                    name="productcategory"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                  <label
                    htmlFor="horizontal-list-radio-millitary"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    סלטים
                  </label>
                </div>
              </li>
              <li className=" w-full border-b border-gray-200 text-center dark:border-gray-600 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                  <input
                    onChange={(event) => setProductcategory(event.target.value)}
                    checked={productcategory === "Toasts"}
                    id="horizontal-list-radio-passport"
                    type="radio"
                    value="Toasts"
                    name="productcategory"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                  <label
                    htmlFor="horizontal-list-radio-passport"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    טוסטים/כריכים
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-l border-gray-200 text-center dark:border-gray-600 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                  <input
                    onChange={(event) => setProductcategory(event.target.value)}
                    checked={productcategory === "GlutenFree"}
                    id="horizontal-list-radio-license1"
                    type="radio"
                    value="GlutenFree"
                    name="productcategory"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                  <label
                    htmlFor="horizontal-list-radio-license1"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    ללא גלוטן{" "}
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 text-center dark:border-gray-600 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                  <input
                    onChange={(event) => setProductcategory(event.target.value)}
                    checked={productcategory === "Vegan"}
                    id="horizontal-list-radio-license2"
                    type="radio"
                    value="Vegan"
                    name="productcategory"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                  <label
                    htmlFor="horizontal-list-radio-license2"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    טבעוני{" "}
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 text-center dark:border-gray-600 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                  <input
                    onChange={(event) => setProductcategory(event.target.value)}
                    checked={productcategory === "Sweets & Cookies"}
                    id="horizontal-list-radio-license3"
                    type="radio"
                    value="Sweets & Cookies"
                    name="productcategory"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                  <label
                    htmlFor="horizontal-list-radio-license3"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    עוגיות / מתוקים{" "}
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 text-center dark:border-gray-600 sm:border-b-0 sm:border-r">
                <div className="flex items-center pl-3">
                  <input
                    onChange={(event) => setProductcategory(event.target.value)}
                    checked={productcategory === "AllCategories"}
                    id="horizontal-list-radio-license4"
                    type="radio"
                    value="AllCategories"
                    name="productcategory"
                    className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
                  />
                  <label
                    htmlFor="horizontal-list-radio-license4"
                    className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    כל המוצרים{" "}
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div className="my-4 flex justify-center border border-solid bg-orange-200 text-2xl font-medium ">
            <span className="h-8"> </span>
          </div>
          <div className=" flex flex-wrap justify-center">
            {products &&
            products.data &&
            productcategory === "AllCategories" ? (
              products.data.map((product) => (
                <div
                  key={product.id}
                  className=" m-2 mb-4 w-full max-w-sm   rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="text-center">{product.id}</div>
                  <div className="text-center">{product.productcategory}</div>
                  <img
                    className="rounded-t-lg p-1"
                    src={product.imageToProduct}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productname}
                    </h2>

                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-lg font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        5%
                      </span>
                      <span className="mr-1 ml-1 rounded bg-blue-100 px-2.5 py-0.5 text-right text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        הנחה לנרשמים באתר
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <p>ש"ח</p>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.productprice}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("productpage/" + product.id)}
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        פרטים נוספים{" "}
                      </button>
                      <button
                        onClick={() =>
                          navigate("addtoshoppingcart/" + product.id)
                        }
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        הוסף לסל קניות
                      </button>
                    </div>
                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate("editproduct/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          עדכן מוצר
                        </button>
                        <button
                          onClick={() =>
                            navigate("deleteproduct/" + product.id)
                          }
                          className="m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          מחק מוצר
                        </button>
                      </div>
                    ) : null}

                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => navigate("uploadfile/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          העלאת קובץ
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : productcategory === "Sweets & Cookies" ? (
              category1!.map((product) => (
                <div
                  key={product.id}
                  className=" m-2 mb-4 w-full max-w-sm   rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="text-center">{product.id}</div>
                  <div className="text-center">{product.productcategory}</div>
                  <img
                    className="rounded-t-lg p-1"
                    src={product.imageToProduct}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productname}
                    </h2>

                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-lg font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        5%
                      </span>
                      <span className="mr-1 ml-1 rounded bg-blue-100 px-2.5 py-0.5 text-right text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        הנחה לנרשמים באתר
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <p>ש"ח</p>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.productprice}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("productpage/" + product.id)}
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        פרטים נוספים{" "}
                      </button>
                      <button
                        onClick={() =>
                          navigate("addtoshoppingcart/" + product.id)
                        }
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        הוסף לסל קניות
                      </button>
                    </div>
                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate("editproduct/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          עדכן מוצר
                        </button>
                        <button
                          onClick={() =>
                            navigate("deleteproduct/" + product.id)
                          }
                          className="m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          מחק מוצר
                        </button>
                      </div>
                    ) : null}

                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => navigate("uploadfile/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          העלאת קובץ
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : productcategory === "Vegan" ? (
              category2!.map((product) => (
                <div
                  key={product.id}
                  className=" m-2 mb-4 w-full max-w-sm   rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="text-center">{product.id}</div>
                  <div className="text-center">{product.productcategory}</div>
                  <img
                    className="rounded-t-lg p-1"
                    src={product.imageToProduct}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productname}
                    </h2>

                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-lg font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        5%
                      </span>
                      <span className="mr-1 ml-1 rounded bg-blue-100 px-2.5 py-0.5 text-right text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        הנחה לנרשמים באתר
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <p>ש"ח</p>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.productprice}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("productpage/" + product.id)}
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        פרטים נוספים{" "}
                      </button>
                      <button
                        onClick={() =>
                          navigate("addtoshoppingcart/" + product.id)
                        }
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        הוסף לסל קניות
                      </button>
                    </div>
                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate("editproduct/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          עדכן מוצר
                        </button>
                        <button
                          onClick={() =>
                            navigate("deleteproduct/" + product.id)
                          }
                          className="m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          מחק מוצר
                        </button>
                      </div>
                    ) : null}

                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => navigate("uploadfile/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          העלאת קובץ
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : productcategory === "GlutenFree" ? (
              category3!.map((product) => (
                <div
                  key={product.id}
                  className=" m-2 mb-4 w-full max-w-sm   rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="text-center">{product.id}</div>
                  <div className="text-center">{product.productcategory}</div>
                  <img
                    className="rounded-t-lg p-1"
                    src={product.imageToProduct}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productname}
                    </h2>

                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-lg font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        5%
                      </span>
                      <span className="mr-1 ml-1 rounded bg-blue-100 px-2.5 py-0.5 text-right text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        הנחה לנרשמים באתר
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <p>ש"ח</p>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.productprice}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("productpage/" + product.id)}
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        פרטים נוספים{" "}
                      </button>
                      <button
                        onClick={() =>
                          navigate("addtoshoppingcart/" + product.id)
                        }
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        הוסף לסל קניות
                      </button>
                    </div>
                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate("editproduct/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          עדכן מוצר
                        </button>
                        <button
                          onClick={() =>
                            navigate("deleteproduct/" + product.id)
                          }
                          className="m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          מחק מוצר
                        </button>
                      </div>
                    ) : null}

                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => navigate("uploadfile/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          העלאת קובץ
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : productcategory === "Toasts" ? (
              category4!.map((product) => (
                <div
                  key={product.id}
                  className=" m-2 mb-4 w-full max-w-sm   rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="text-center">{product.id}</div>
                  <div className="text-center">{product.productcategory}</div>
                  <img
                    className="rounded-t-lg p-1"
                    src={product.imageToProduct}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productname}
                    </h2>

                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-lg font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        5%
                      </span>
                      <span className="mr-1 ml-1 rounded bg-blue-100 px-2.5 py-0.5 text-right text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        הנחה לנרשמים באתר
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <p>ש"ח</p>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.productprice}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("productpage/" + product.id)}
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        פרטים נוספים{" "}
                      </button>
                      <button
                        onClick={() =>
                          navigate("addtoshoppingcart/" + product.id)
                        }
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        הוסף לסל קניות
                      </button>
                    </div>
                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate("editproduct/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          עדכן מוצר
                        </button>
                        <button
                          onClick={() =>
                            navigate("deleteproduct/" + product.id)
                          }
                          className="m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          מחק מוצר
                        </button>
                      </div>
                    ) : null}

                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => navigate("uploadfile/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          העלאת קובץ
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : productcategory === "Salads" ? (
              category5!.map((product) => (
                <div
                  key={product.id}
                  className=" m-2 mb-4 w-full max-w-sm   rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="text-center">{product.id}</div>
                  <div className="text-center">{product.productcategory}</div>
                  <img
                    className="rounded-t-lg p-1"
                    src={product.imageToProduct}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productname}
                    </h2>

                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-lg font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        5%
                      </span>
                      <span className="mr-1 ml-1 rounded bg-blue-100 px-2.5 py-0.5 text-right text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        הנחה לנרשמים באתר
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <p>ש"ח</p>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.productprice}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("productpage/" + product.id)}
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        פרטים נוספים{" "}
                      </button>
                      <button
                        onClick={() =>
                          navigate("addtoshoppingcart/" + product.id)
                        }
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        הוסף לסל קניות
                      </button>
                    </div>
                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate("editproduct/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          עדכן מוצר
                        </button>
                        <button
                          onClick={() =>
                            navigate("deleteproduct/" + product.id)
                          }
                          className="m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          מחק מוצר
                        </button>
                      </div>
                    ) : null}

                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => navigate("uploadfile/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          העלאת קובץ
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : productcategory === "Drinks" ? (
              category6!.map((product) => (
                <div
                  key={product.id}
                  className=" m-2 mb-4 w-full max-w-sm   rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="text-center">{product.id}</div>
                  <div className="text-center">{product.productcategory}</div>
                  <img
                    className="rounded-t-lg p-1"
                    src={product.imageToProduct}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productname}
                    </h2>

                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-lg font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        5%
                      </span>
                      <span className="mr-1 ml-1 rounded bg-blue-100 px-2.5 py-0.5 text-right text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        הנחה לנרשמים באתר
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <p>ש"ח</p>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.productprice}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("productpage/" + product.id)}
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        פרטים נוספים{" "}
                      </button>
                      <button
                        onClick={() =>
                          navigate("addtoshoppingcart/" + product.id)
                        }
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        הוסף לסל קניות
                      </button>
                    </div>
                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate("editproduct/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          עדכן מוצר
                        </button>
                        <button
                          onClick={() =>
                            navigate("deleteproduct/" + product.id)
                          }
                          className="m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          מחק מוצר
                        </button>
                      </div>
                    ) : null}

                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => navigate("uploadfile/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          העלאת קובץ
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : productcategory === "Pastries" ? (
              category7!.map((product) => (
                <div
                  key={product.id}
                  className=" m-2 mb-4 w-full max-w-sm   rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="text-center">{product.id}</div>
                  <div className="text-center">{product.productcategory}</div>
                  <img
                    className="rounded-t-lg p-1"
                    src={product.imageToProduct}
                    alt="product image"
                  />
                  <div className="px-5 pb-5">
                    <h2 className="text-center text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productname}
                    </h2>

                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>First star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Second star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Third star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fourth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>Fifth star</title>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-lg font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        5%
                      </span>
                      <span className="mr-1 ml-1 rounded bg-blue-100 px-2.5 py-0.5 text-right text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
                        הנחה לנרשמים באתר
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <p>ש"ח</p>
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.productprice}
                      </span>
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("productpage/" + product.id)}
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        פרטים נוספים{" "}
                      </button>
                      <button
                        onClick={() =>
                          navigate("addtoshoppingcart/" + product.id)
                        }
                        className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        הוסף לסל קניות
                      </button>
                    </div>
                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="flex justify-center">
                        <button
                          onClick={() => navigate("editproduct/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          עדכן מוצר
                        </button>
                        <button
                          onClick={() =>
                            navigate("deleteproduct/" + product.id)
                          }
                          className="m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >
                          מחק מוצר
                        </button>
                      </div>
                    ) : null}

                    {(user && currentRole === "admin") ||
                    currentRole === "editor" ? (
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => navigate("uploadfile/" + product.id)}
                          className="dark:hover:bg-rede-700 m-1 rounded-lg bg-red-700 p-2 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800"
                        >
                          העלאת קובץ
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-2xl text-red-600">לא נבחרה קטגוריה</p>
            )}
          </div>
          <div className="flex justify-center">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
}

export async function productsLoader() {
  try {
    const response = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/products"
    );
    const data = await response.json();

    if (!response.ok) {
      throw Error("could not fetch the data");
    }

    const response1 = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/users"
    );
    const usersFromMongoDb = await response1.json();

    const data1 = usersFromMongoDb;
    if (!response1.ok) {
      throw Error("could not fetch the data");
    }

    return { data, data1, status: "success" };
  } catch (error) {
    console.error(error);

    return { status: "error", message: (error as Error).message, data: null };
  }
}
