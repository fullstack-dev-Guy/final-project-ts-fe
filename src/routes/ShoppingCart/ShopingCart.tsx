import { Link, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Cart, MyFetchResponse, Product } from "../../types/firestore";

import { useAuth } from "../../context/AuthProvider";

export default function ShoppingCart() {
  const navigate = useNavigate();
  var currentCart = localStorage.getItem("cartID");
  const { user } = useAuth(); // זה יוצר בעיה ברינדור  של הסל

  const carts = useLoaderData() as MyFetchResponse<Cart[]>;

  let cartcheckexist = carts.data?.filter((x: Cart) => x.id === currentCart);

  if (cartcheckexist![0] === undefined) {
    localStorage.clear();
    navigate("/shoppingcartdummy");
  }

  const currentCartDetails = carts.data?.filter((x) => x.id === currentCart); //i got the cart object with all the details

  let priceDiscount: any = "no";
  if (currentCartDetails![0].userID !== " ") {
    priceDiscount = 5 + "%";
  } else {
    priceDiscount = "no";
  }

  var getAllProductsIdFromCurrentCart = currentCartDetails?.map(
    (x) => x.products
  );

  let productsArry: string[] = getAllProductsIdFromCurrentCart![0].map(
    (product) => product
  );

  const products = useLoaderData() as MyFetchResponse<Product>;

  var arryForGettingAllProducts = JSON.parse(
    JSON.stringify(products.data1)
  ).map((x: Product) => x);

  let getProductDetails: Product[] = [];

  for (let i = 0; i < productsArry.length; i++) {
    for (let j = 0; j < arryForGettingAllProducts.length; j++) {
      if (productsArry[i] === arryForGettingAllProducts[j].id) {
        getProductDetails.push(arryForGettingAllProducts[j]);
      }
    }
  }

  // console.log(getProductDetails); // זה מערך של מוצרים בסל עם כל המידע עליהם

  ///////////////////////////////////////////////// חישוב הסכום של המוצרים לפי מחיר ולפי משתמש רשום שמקבל הנחה

  let getAllCartProductPrice = JSON.parse(
    JSON.stringify(getProductDetails)
  ).map((x: Product) => x.productprice);

  let productsSum: number = 0;
  if (currentCartDetails![0].userID !== " ") {
    for (let i = 0; i < getAllCartProductPrice.length; i++) {
      let temp: number = Number(getAllCartProductPrice[i]);
      productsSum = productsSum + temp;
    }
    productsSum = productsSum - productsSum * 0.05;
  } else {
    for (let i = 0; i < getAllCartProductPrice.length; i++) {
      let temp: number = Number(getAllCartProductPrice[i]);
      productsSum = productsSum + temp;
    }
  }
  let newproductsSum: string = productsSum.toString();
  sessionStorage.setItem("productsSum", newproductsSum);
  /////////////////////////////////////////////////////////////////////////////////////

  let getProductDetails1 = arryForGettingAllProducts.filter((x: Product) =>
    getProductDetails.includes(x)
  );

  // console.log(getProductDetails1); // זה מערך של מוצרים עם כל המידע עליהם

  var allProductsIdArry: string[] = JSON.parse(
    JSON.stringify(arryForGettingAllProducts)
  ).map((x: Product) => x.id);

  let quantityOfProductsArry: number[] = []; // כמה פעמים מופיע מוצר במערך ? לכאן נכניס את מספר הפעמים שמופיע
  let cartProductCorolationtoQuantity: string[] = [];
  // i could use Set is a special data structure introduced in ES6 that stores a collection of unique values.
  for (let j = 0; j < allProductsIdArry.length; j++) {
    let counter: number = 1;
    for (let k = 0; k < productsArry.length; k++) {
      if (allProductsIdArry[j] === productsArry[k]) {
        quantityOfProductsArry[j] = counter;
        cartProductCorolationtoQuantity[j] = productsArry[k];
        counter++;
      }
    }
  }
  // הורדת רווחים בתוך המערכים
  quantityOfProductsArry = quantityOfProductsArry.filter((e) =>
    String(e).trim()
  );
  cartProductCorolationtoQuantity = cartProductCorolationtoQuantity.filter(
    (e) => String(e).trim()
  );

  // console.log(quantityOfProductsArry); //סכום המערך יתן את כמות המוצרים הכללית בסל

  ///////////////////////////////////////////////////////////////// חישוב כמות הפריטים בסל
  let howManyProducts: number = 0;
  for (let i = 0; i < quantityOfProductsArry.length; i++) {
    let temp: number = quantityOfProductsArry[i];
    howManyProducts = howManyProducts + temp;
  }

  let newhowManyProducts: string = howManyProducts.toString();
  sessionStorage.setItem("itemquantity", newhowManyProducts);

  //////////////////////////////////////////////////////////////////
  // מעדכן את המוצרים בסל הקניות בכמות החדשה
  for (let i = 0; i < getProductDetails1.length; i++) {
    if (getProductDetails1[i].quantity) {
      getProductDetails1[i].quantity = quantityOfProductsArry[i];
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  function reload() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  async function removeOneProducrFromCart(
    productId: string,
    currentCart: string,
    productsArry: string[]
  ) {
    let temp = productsArry.find((x) => x === productId);
    let index = productsArry.indexOf(temp!);

    if (productsArry[index] === temp || index < 0) {
      productsArry[index] = " ";
      var resultProductArryAfterTrim = productsArry.filter(
        (x) => x.trim().length > 0
      );
    } else {
      return;
    }

    try {
      const responseUpdateCartproducts = await fetch(
        "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
          currentCart,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products: resultProductArryAfterTrim,
          }),
        }
      );
      const data = await responseUpdateCartproducts.json();

      if (!responseUpdateCartproducts.ok) {
        throw Error("could not complete the action");
      }
      return navigate("/shoppingcart");
    } catch (error) {
      console.error(error);
      return { status: "error", data: null, message: (error as Error).message };
    }
  }
  /////////////////////////////////////////////////////////////////
  async function addOneProducrToCart(productId: string, currentCart: string) {
    try {
      const responseUpdateCartproducts = await fetch(
        "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
          currentCart,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products: {
              push: [productId],
            },
          }),
        }
      );
      const data = await responseUpdateCartproducts.json();

      if (!responseUpdateCartproducts.ok) {
        throw Error("could not complete the action");
      }

      return navigate("/shoppingcart");
    } catch (error) {
      console.error(error);
      return { status: "error", data: null, message: (error as Error).message };
    }
  }
  /////////////////////////////////////////////////////////////////////////////
  async function clearTheCartFromAllProducts(currentCart: string) {
    try {
      const responseUpdateCartproducts = await fetch(
        "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
          currentCart,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products: [],
          }),
        }
      );
      const data = await responseUpdateCartproducts.json();

      if (!responseUpdateCartproducts.ok) {
        throw Error("could not complete the action");
      }
      return navigate("/shoppingcart");
    } catch (error) {
      console.error(error);
      return { status: "error", data: null, message: (error as Error).message };
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  async function removeProducTypeFromCart(
    productId: string,
    currentCart: string,
    productsArry: string[]
  ) {
    let newProductAryyAfterFilter = productsArry.filter((x) => x !== productId);

    try {
      const responseUpdateCartproducts = await fetch(
        "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
          currentCart,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products: newProductAryyAfterFilter,
          }),
        }
      );
      const data = await responseUpdateCartproducts.json();

      if (!responseUpdateCartproducts.ok) {
        throw Error("could not complete the action");
      }
      return navigate("/shoppingcart");
    } catch (error) {
      console.error(error);
      return { status: "error", data: null, message: (error as Error).message };
    }
  }
  return (
    <div className="mt-44 mb-40">
      {currentCart === null ? (
        <section className=" bg-gray-50 py-3 dark:bg-gray-900 sm:py-5">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col space-y-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                <div className="flex flex-1 items-center space-x-4">
                  <h5>
                    <span className="text-gray-500">מספר המוצרים</span>
                    <span className="dark:text-white">אין פריטים בסל</span>
                  </h5>
                  <h5>
                    <span className="text-gray-500">מחיר לתשלום</span>
                    <span className="dark:text-white">{0}</span>
                  </h5>
                </div>
                <div className="flex flex-shrink-0 flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-3 lg:justify-end">
                  <button
                    type="button"
                    className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center justify-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-sm font-medium text-white text-white hover:text-white focus:outline-none focus:ring-4"
                  >
                    בצע הזמנה
                  </button>
                  <button
                    type="button"
                    className="flex flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-red-600 bg-white px-3 py-2 text-sm font-medium text-white text-gray-900 hover:bg-red-400 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                    עדכון סל קניות
                  </button>
                  <button
                    type="button"
                    className="hover:text-primary-700 flex flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    הסרת כל הפריטים
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4 text-center">
                        מק"ט
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        תמונה
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        שם המוצר
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        קטגוריה
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        מחיר ש"ח
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        הנחה
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        כמות
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        הסרה
                      </th>
                    </tr>
                  </thead>
                  <div className="mb-10 flex justify-center text-center text-5xl">
                    <span>סל הקניות ריק</span>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-gray-50 py-3 dark:bg-gray-900 sm:py-5">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col space-y-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                <div className="flex flex-1 items-center space-x-4">
                  <h5>
                    <span className="text-black-500">מספר המוצרים</span>
                    <span className="mx-2 font-extrabold dark:text-white">
                      {howManyProducts}
                    </span>
                  </h5>
                  <h5>
                    <span className="text-black-500">מחיר לתשלום</span>
                    <span className="mx-2 font-extrabold dark:text-white">
                      {productsSum}
                    </span>
                  </h5>
                </div>

                <div className="flex flex-shrink-0 flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-3 lg:justify-end">
                  <Link
                    to="../shoppingcart"
                    className=" flex items-center"
                    role="button"
                  >
                    <button
                      onClick={() => reload()}
                      type="button"
                      className="hover:text-primary-700 flex flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                    >
                      <svg
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      עדכון הסל
                    </button>
                  </Link>
                  {howManyProducts === 0 ? (
                    <Link to="/shoppingcartdummy" type="button">
                      <button
                        type="button"
                        className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center justify-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-sm font-medium text-white text-white hover:text-white focus:outline-none focus:ring-4"
                      >
                        בצע הזמנה
                      </button>
                    </Link>
                  ) : (
                    <Link to="/orderpage" type="button">
                      <button
                        type="button"
                        className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center justify-center rounded-lg bg-blue-600 bg-blue-700 px-4 py-2 text-sm font-medium text-white text-white hover:text-white focus:outline-none focus:ring-4"
                      >
                        ביצוע הזמנה
                      </button>
                    </Link>
                  )}
                  <button
                    onClick={() => clearTheCartFromAllProducts(currentCart!)}
                    type="button"
                    className="hover:text-primary-700 flex flex-shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 -ml-0.5 h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    הסרת כל הפריטים
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4 text-center">
                        מק"ט
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        תמונה
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        שם המוצר
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        קטגוריה
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        מחיר ש"ח
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        הנחה
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        כמות
                      </th>
                      <th scope="col" className="px-4 py-3 text-center">
                        הסרה
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getProductDetails1
                      ? getProductDetails1.map((x: Product) => (
                          <tr
                            key={x.id}
                            className="border-b hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
                          >
                            <td className="w-4 px-4 py-3">
                              <div className="mx-2 flex items-center justify-center ">
                                {x.id}
                              </div>
                            </td>
                            <th
                              scope="row"
                              className="mx-auto flex w-28 items-center justify-center whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
                            >
                              <img
                                src={x.imageToProduct}
                                alt="iMac Front Image"
                                className="mr-3 h-14 w-auto "
                              />
                            </th>
                            <td className="px-4 py-2 text-center">
                              <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded px-2 py-0.5 text-xs font-medium">
                                {x.productname}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                              <div className="flex items-center justify-center">
                                <div className="mr-2 inline-block h-4 w-4 rounded-full bg-red-700"></div>
                                {x.productcategory}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                              {x.productprice}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                              {priceDiscount}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                              <button
                                className="mr-2 border p-2"
                                onClick={() =>
                                  removeOneProducrFromCart(
                                    x.id,
                                    currentCart!,
                                    productsArry
                                  )
                                }
                              >
                                -
                              </button>

                              <span>{x.quantity}</span>

                              <button
                                onClick={() =>
                                  addOneProducrToCart(x.id, currentCart!)
                                }
                                className="ml-2 border p-2"
                              >
                                +
                              </button>
                            </td>
                            <td className=" whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900 dark:text-white">
                              <button
                                className="mx-auto flex items-center rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                                onClick={() =>
                                  removeProducTypeFromCart(
                                    x.id,
                                    currentCart!,
                                    productsArry
                                  )
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="mr-2 -ml-0.5 h-4 w-4"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                הסרת מוצר
                              </button>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export async function cartLoader() {
  try {
    const response = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts"
    );
    const data = await response.json();

    if (!response.ok) {
      throw Error("could not fetch the data");
    }
    const response1 = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/products"
    );
    const data1 = await response1.json();

    if (!response.ok) {
      throw Error("could not fetch the data");
    }

    return { data, data1, status: "success" };
  } catch (error) {
    console.error(error);

    return { status: "error", message: (error as Error).message, data: null };
  }
}
