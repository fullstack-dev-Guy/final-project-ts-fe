import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Cart, MyFetchResponse, Product } from "../../types/firestore";
import { auth } from "../../lib/firebase";

export default function OrderNumberPage() {
  const navigate = useNavigate();
  const orderNumber = localStorage.getItem("orderN");
  console.log(orderNumber);

  const { user } = useAuth(); // זה יוצר בעיה ברינדור  של הסל
  const newDate = new Date();
  const currentTime = newDate.toLocaleString("he-IL");
  console.log("currentTime");
  console.log(currentTime);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var currentCart = localStorage.getItem("cartID");
  //const { user } = useAuth(); זה יוצר בעיה ברינדור  של הסל
  let authIndication = auth.currentUser;

  const carts = useLoaderData() as MyFetchResponse<Cart[]>;
  console.log("authIndication");
  console.log(authIndication);
  console.log("carts");
  console.log(carts);
  console.log("currentCart");
  console.log(currentCart);

  const arryForCartId = JSON.parse(JSON.stringify(carts.data)).map(
    (x: Cart) => x.id
  );
  console.log(arryForCartId);

  const arryForCartProducts = JSON.parse(JSON.stringify(carts.data)).map(
    (x: Cart) => x.products
  );
  console.log(arryForCartProducts);

  const arryForCartUserID = JSON.parse(JSON.stringify(carts.data)).map(
    (x: Cart) => x.userID
  );

  console.log(arryForCartUserID);

  const currentCartDetails = carts.data?.filter((x) => x.id === currentCart); //i got the cart object with all the details

  let priceDiscount: any = "no";
  if (currentCartDetails![0].userID !== " ") {
    priceDiscount = 5 + "%";
  } else {
    priceDiscount = "no";
  }
  console.log("currentCartDetails");
  console.log(currentCartDetails);
  var getAllProductsIdFromCurrentCart = currentCartDetails?.map(
    (x) => x.products
  );
  console.log("getAllProductsIdFromCurrentCart");
  console.log(getAllProductsIdFromCurrentCart);
  console.log(getAllProductsIdFromCurrentCart![0]);

  let productsArry: string[] = getAllProductsIdFromCurrentCart![0].map(
    (product) => product
  );
  console.log("productsArry");
  console.log(productsArry);

  const products = useLoaderData() as MyFetchResponse<Product>;
  console.log("products");
  console.log(products);
  var arryForGettingAllProducts = JSON.parse(
    JSON.stringify(products.data1)
  ).map((x: Product) => x);
  console.log("arryForGettingAllProducts");
  console.log(arryForGettingAllProducts);

  let getProductDetails: Product[] = [];

  for (let i = 0; i < productsArry.length; i++) {
    for (let j = 0; j < arryForGettingAllProducts.length; j++) {
      if (productsArry[i] === arryForGettingAllProducts[j].id) {
        getProductDetails.push(arryForGettingAllProducts[j]);
      }
    }
  }
  console.log("getProductDetails");
  console.log(getProductDetails); // זה מערך של מוצרים בסל עם כל המידע עליהם

  ///////////////////////////////////////////////// חישוב הסכום של המוצרים לפי מחיר ולפי משתמש רשום שמקבל הנחה

  let getAllCartProductPrice = JSON.parse(
    JSON.stringify(getProductDetails)
  ).map((x: Product) => x.productprice);

  console.log("getAllCartProductPrice");
  console.log(getAllCartProductPrice);

  let productsSum: number = 0;
  if (currentCartDetails![0].userID !== " ") {
    for (let i = 0; i < getAllCartProductPrice.length; i++) {
      let temp: number = Number(getAllCartProductPrice[i]);
      productsSum = productsSum + temp;
    }
    productsSum = productsSum - productsSum * 0.05;
    console.log("productsSum");
    console.log(productsSum);
  } else {
    for (let i = 0; i < getAllCartProductPrice.length; i++) {
      let temp: number = Number(getAllCartProductPrice[i]);
      productsSum = productsSum + temp;
    }
    console.log("productsSum");
    console.log(productsSum);
  }
  let newproductsSum: string = productsSum.toString();
  sessionStorage.setItem("productsSum", newproductsSum);
  /////////////////////////////////////////////////////////////////////////////////////

  let getProductDetails1 = arryForGettingAllProducts.filter((x: Product) =>
    getProductDetails.includes(x)
  );

  console.log("getProductDetails1");
  console.log(getProductDetails1); // זה מערך של מוצרים עם כל המידע עליהם

  var allProductsIdArry: string[] = JSON.parse(
    JSON.stringify(arryForGettingAllProducts)
  ).map((x: Product) => x.id);
  console.log("allProductsIdArry");
  console.log(allProductsIdArry);

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
  console.log("quantityOfProductsAryy");
  console.log(quantityOfProductsArry); //סכום המערך יתן את כמות המוצרים הכללית בסל
  console.log("cartProductCorolationtoQuantity");
  console.log(cartProductCorolationtoQuantity);
  ///////////////////////////////////////////////////////////////// חישוב כמות הפריטים בסל
  let howManyProducts: number = 0;
  for (let i = 0; i < quantityOfProductsArry.length; i++) {
    let temp: number = quantityOfProductsArry[i];
    howManyProducts = howManyProducts + temp;
  }
  console.log("howManyProducts");
  console.log(howManyProducts);
  let newhowManyProducts: string = howManyProducts.toString();
  sessionStorage.setItem("itemquantity", newhowManyProducts);
  //////////////////////////////////////////////////////////////////
  // מעדכן את המוצרים בסל הקניות בכמות החדשה
  for (let i = 0; i < getProductDetails1.length; i++) {
    if (getProductDetails1[i].quantity) {
      getProductDetails1[i].quantity = quantityOfProductsArry[i];
    }
  }
  console.log("getProductDetails1");
  console.log(getProductDetails1);

  function addClickEventListener() {
    document.addEventListener("click", deletetheCurrentCartAndTheLocalstorage);
  }
  // asuming the user not press the button for return to the home page
  async function deletetheCurrentCartAndTheLocalstorage() {
    console.log("You clicked somewhere on the screen!");
    var responseDeleteCart = await fetch(
      "http://localhost:3000/routes/carts/" + currentCart,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    localStorage.removeItem("cartID");
    localStorage.removeItem("orderN");
    if (!responseDeleteCart.ok) {
      throw Error("could not complete the action of fetch to order");
    }

    navigate("/");
    removeEventListener("click", deletetheCurrentCartAndTheLocalstorage);
    window.location.reload();
  }

  addClickEventListener();

  function reload() {
    setTimeout(() => {
      console.log("Delayed for 1 second.");
      window.location.reload();
    }, 1000);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="  mx-auto mt-10 mt-12 max-w-screen-2xl ">
      <div
        id="updateProductModal"
        className="flex h-modal  w-full items-center justify-center justify-center  md:inset-0 md:h-full"
      >
        <div className="relative h-full w-full max-w-2xl  p-4 md:h-auto">
          <div className="relative rounded-lg border-8 border bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
            <div className="mx-auto mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 p-2 dark:bg-green-900">
              <svg
                aria-hidden="true"
                className="h-8 w-8 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="mb-4  rounded-t   border-b pb-4 text-center  dark:border-gray-600 sm:mb-5">
              <p className="mx-auto text-3xl font-semibold text-blue-800 dark:text-white">
                ההזמנה בוצעה
              </p>
              <p className="text-grey-300">{currentTime}</p>
            </div>

            <form action="#">
              <div className="mb-4 grid gap-4 sm:grid-cols-2 ">
                <div className="text-center ">
                  <p className="text-lg font-medium text-blue-500 underline underline-offset-2">
                    מספר ההזמנה
                  </p>
                  <p className="text-5xl text-blue-700">{orderNumber}</p>
                </div>
                <div className="mx-auto border p-2 text-center">
                  <span className="text-lg">פרטי ההזמנה</span>
                  <table className="">
                    <thead className=" text-center">
                      <tr>
                        <th scope="col" className="p-2">
                          שם הפריט
                        </th>
                        <th scope="col" className="p-2">
                          כמות
                        </th>
                        <th scope="col" className="p-2">
                          מחיר
                        </th>
                        <th scope="col" className="p-2">
                          סה"כ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getProductDetails1
                        ? getProductDetails1.map((x: Product) => (
                            <tr key={x.id} className="">
                              <td className="">
                                <div className=" ">{x.productname}</div>
                              </td>
                              <td className="">
                                <div className=" ">{x.quantity}</div>
                              </td>
                              <td className="">
                                <div className=" ">{x.productprice}</div>
                              </td>
                              <td className="">
                                <div className=" ">
                                  {Number(x.productprice) * Number(x.quantity)}
                                </div>
                              </td>
                            </tr>
                          ))
                        : null}
                      <tr>
                        <td>{priceDiscount} - :הנחה</td>
                        <td></td>
                        <td className="pr-1 text-right ">{"שח"}</td>
                        <td className=" text-left text-xl font-semibold text-sky-600">
                          {productsSum}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-center sm:col-span-2"></div>
              </div>

              <div className="flex justify-center ">
                <Link to="/" type="button">
                  <button
                    onClick={() => reload()}
                    type="button"
                    className="mt-4  rounded-lg border border-blue-600 p-2 text-center text-xl font-medium text-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-600 dark:hover:text-white dark:focus:ring-blue-900"
                  >
                    חזרה לדף הבית
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
