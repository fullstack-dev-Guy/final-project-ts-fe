import { useState } from "react";
import { Form, Link, redirect } from "react-router-dom";

export default function AddProduct() {
  const [productcategory, setProductcategory] = useState(" ");
  const [productname, setProductName] = useState(" ");
  const [productprice, setProductPrice] = useState(" ");
  const [productDescription, setProductDescription] = useState(" ");

  async function addProductAction() {
    try {
      const response = await fetch("http://localhost:3000/routes/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productname: productname,
          productprice: productprice,
          productcategory: productcategory,
          productDescription: productDescription,
          imageToProduct: " ",
          quantity: "1",
        }),
      });
      window.location.reload();
      console.log(response.ok);

      if (!response.ok) {
        throw Error("could not complete the action");
      }
      return redirect("/");
    } catch (error) {
      console.error(error);
      return { status: "error", data: null, message: (error as Error).message };
    }
  }

  return (
    <Form method="post">
      <div className="mx-auto mt-32 max-w-screen-2xl p-6 text-center sm:mt-32 md:mt-32 lg:mt-32 xl:mt-32 2xl:mt-32">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
          בחירת קטגוריה
        </h3>

        <ul className="w-full items-center rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:flex">
          <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
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
          <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
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
          <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
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
          <li className="w-full dark:border-gray-600">
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
                טוסטים
              </label>
            </div>
          </li>
          <li className=" w-full border-b border-l border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
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
          <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
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
          <li className="w-full border-b border-gray-200 dark:border-gray-600 sm:border-b-0 sm:border-r">
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
        </ul>

        <div className="mt-4 flex justify-center ">
          <div className="group relative z-0 mb-4  w-2/4  ">
            <input
              onChange={(event) => setProductName(event.target.value)}
              value={productname}
              type="text"
              name="productname"
              id="productname"
              className="peer mt-6 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-center text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              maxLength={16}
              required
            />
            <label
              htmlFor="productname"
              className="absolute  top-6 -z-10 origin-[0] -translate-y-6 scale-75 transform  text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              שם המוצר
            </label>
          </div>
        </div>

        <div className="mt-4 flex justify-center ">
          <div className="group relative z-0 m-2 mb-4  w-2/4  ">
            <input
              onChange={(event) => setProductPrice(event.target.value)}
              value={productprice}
              type="text"
              name="productprice"
              id="productprice"
              className="peer mt-6 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-center  text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=""
              maxLength={3}
              required
            />
            <label
              htmlFor="productprice"
              className="absolute top-6 -z-10 origin-[0] -translate-y-6 scale-75 transform text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              מחיר
            </label>
          </div>
        </div>

        <div className="mt-4 flex justify-center ">
          <div className="group relative z-0 m-2 mb-4  w-2/4  ">
            <input
              onChange={(event) => setProductDescription(event.target.value)}
              value={productDescription}
              type="text"
              name="productDescription"
              id="productDescription"
              className="peer mt-6 block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-center  text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=""
              maxLength={200}
              //required
            />
            <label
              htmlFor="productDescription"
              className="absolute top-6 -z-10 origin-[0] -translate-y-6 scale-75 transform text-xl text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              תיאור המוצר
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6"></div>

        <Link to="/allproducts">
          <button
            onClick={() => addProductAction()}
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            צור מוצר
          </button>
        </Link>
      </div>
    </Form>
  );
}
