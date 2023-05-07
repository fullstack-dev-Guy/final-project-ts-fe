import { useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { useAuth } from "../../context/AuthProvider";
import emailjs from "@emailjs/browser";

import {
  Cart,
  MyFetchResponse,
  Order,
  Product,
  userDb,
} from "../../types/firestore";
import { emailjsObject } from "../../lib/mailjs";

export default function OrderPage() {
  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);
  const form = useRef();
  const navigate = useNavigate();
  const { user } = useAuth(); // זה יוצר בעיה ברינדור  של הסל

  let orderNumber = Math.floor(Math.random() * 100000000).toString();

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var currentCart = localStorage.getItem("cartID");
  //const { user } = useAuth(); זה יוצר בעיה ברינדור  של הסל
  let authIndication = auth.currentUser;

  const carts = useLoaderData() as MyFetchResponse<Cart[]>;

  const arryForCartId = JSON.parse(JSON.stringify(carts.data)).map(
    (x: Cart) => x.id
  );

  const arryForCartProducts = JSON.parse(JSON.stringify(carts.data)).map(
    (x: Cart) => x.products
  );

  const arryForCartUserID = JSON.parse(JSON.stringify(carts.data)).map(
    (x: Cart) => x.userID
  );

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

  //console.log(getProductDetails1); // זה מערך של מוצרים עם כל המידע עליהם

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

  //console.log(quantityOfProductsArry); //סכום המערך יתן את כמות המוצרים הכללית בסל

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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var currentCart = localStorage.getItem("cartID");

  var currentUser = auth.currentUser?.uid;
  let theItemsQuantity = Number(sessionStorage.getItem("itemquantity"));
  let theAllProductsSum: string | null = sessionStorage.getItem("productsSum");

  const newDate = new Date();
  const currentTime = newDate.toLocaleString("he-IL");

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fulladdress, setFulladdress] = useState("");
  const [otherrequest, setOtherrequest] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  let role: string;
  let userUpdateWithId: string | null | undefined;
  if (user) {
    role = "user";
    userUpdateWithId = auth.currentUser?.uid;
  } else {
    role = "guest";
    userUpdateWithId = " ";
  }
  let orderNumber1 = orderNumber.toString();
  const [orderN, setOrderN] = useState(orderNumber1);
  var allCartProductToString = JSON.stringify(getProductDetails1);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleSubmitOrderForm = async (
    orderNumber1: string,
    allCartProductToString: string,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    otherrequest: string,
    itemquantity: number,
    paymentamount: string,
    date: string,
    role: string,
    cart: string,
    Address: string,
    firebaseUserID: string
  ) => {
    localStorage.setItem("orderN", orderNumber1.toString());

    const checkEmail = (email: string) => {
      if (email === "") {
        setEmailError("Email is a required field");
        return false;
      }
      if (user && auth.currentUser?.email !== email) {
        setEmailError("זה לא האימייל שנרשמת איתו");
        return false;
      } else {
        setEmailError("");
        return true;
      }
    };
    const isOkEmail = checkEmail(email);

    if (!isOkEmail) {
      return console.log(isOkEmail);
    }

    ///////////////////////////////////////////////////////////////////// GET
    const getallorders1 = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/orders"
    );
    const data1 = await getallorders1.json();

    if (!getallorders1.ok) {
      throw Error("could not fetch the data");
    }

    const arryForOrdersDetectCurrentOrderId1 = JSON.parse(
      JSON.stringify(data1)
    ).map((x: Order) => x.id);

    ////////////////////////////////////////////////////////////////// POST

    const response = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          phonenumber: phone,
          email: email,
          otherrequest: otherrequest,
          orderstatus: "created",
          itemquantity: itemquantity,
          paymentamount: paymentamount,
          date: date,
          role: role,
          cart: cart,
          address: Address,
          firebaseUserID: firebaseUserID,
        }),
      }
    );

    if (!response.ok) {
      throw Error("could not complete the action of fetch to order");
    }

    ///////////////////////////////////////////////////////////////////// GET
    const getallorders2 = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/orders"
    );
    const data = await getallorders2.json();

    if (!getallorders2.ok) {
      throw Error("could not fetch the data");
    }

    const arryForOrdersDetectCurrentOrderId2 = JSON.parse(
      JSON.stringify(data)
    ).map((x: Order) => x.id);

    //////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////// GET

    const getallUsers = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/users"
    );
    const data3 = await getallUsers.json();

    if (!getallUsers.ok) {
      throw Error("could not fetch the data");
    }

    const temp1 = JSON.parse(JSON.stringify(data3)).map((x: userDb) => x.id);

    const temp2 = JSON.parse(JSON.stringify(data3)).map(
      (x: userDb) => x.firebaseUserID
    );

    for (let i = 0; i < temp1.length; i++) {
      if (userUpdateWithId === temp2[i]) {
        var currentUserMongoDB = temp1[i];
      }
    }

    ////////////////////////////////////////////////////////////////// PUT

    let currentOrderId = arryForOrdersDetectCurrentOrderId2.filter(
      (x: string) => !arryForOrdersDetectCurrentOrderId1.includes(x)
    ); // שומר את האיי די של ההזמנה הנוכחית

    if (user) {
      const responseUpdateCartproducts = await fetch(
        "https://final-project-ts-be-prisma-atlas.onrender.com/routes/users/" +
          currentUserMongoDB,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orders: {
              push: [currentOrderId[0]],
            },
          }),
        }
      );

      if (!responseUpdateCartproducts.ok) {
        throw Error("could not complete the action of fetch to order");
      }
    }
    ////////////////////////////////////////////////////////////////// POST

    const responsePostToArchives = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/cartsarchives",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: allCartProductToString,
          email: email,
          orderNumber: orderNumber1,
          itemquantity: itemquantity,
          paymentamount: paymentamount,
          date: date,
          role: role,
          cart: cart,
          userID: firebaseUserID,
          ses: " ",
        }),
      }
    );

    if (!responsePostToArchives.ok) {
      throw Error("could not complete the action of fetch to order");
    }

    /////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////
    var templateParams = {
      email,
      name: firstname,
      notes: "לקוח יקר , תודה רבה על ההזמנה",
      ordern: orderNumber1,
      itemquantity: itemquantity,
      paymentamount: paymentamount,
      orderdate: date,
    };

    const service = emailjsObject.serviceId;
    const template = emailjsObject.templateId;
    const publickey = emailjsObject.publiceKey;

    emailjs.send(service, template, templateParams, publickey).then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
    /////////////////////////////////////////////

    return navigate("/orderpage/ordernumberpage");
  };

  return (
    <div className="  mx-auto  mt-12 max-w-screen-2xl ">
      <div
        id="updateProductModal"
        className="flex h-modal  w-full items-center justify-center justify-center  md:inset-0 md:h-full"
      >
        <div className="relative h-full w-full max-w-2xl  p-4 md:h-auto">
          <div className="relative rounded-lg border-8 border bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
            <div className="mb-4 flex items-center  justify-between rounded-t border-b pb-4  dark:border-gray-600 sm:mb-5">
              <h3 className="mx-auto text-lg font-semibold text-gray-900 dark:text-white">
                ההזמנה שלי
              </h3>
              <Link to="/shoppingcart" type="button">
                <button
                  type="button"
                  className=" b rounded-lg p-2 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  X
                </button>
              </Link>
            </div>

            <form>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    onChange={(event) => setFirstname(event.target.value)}
                    value={firstname}
                    type="text"
                    name="name"
                    id="name"
                    // value=""
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    onChange={(event) => setLastname(event.target.value)}
                    value={lastname}
                    type="text"
                    name="brand"
                    id="brand"
                    //value="Google"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Last Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="price1"
                    className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Address
                  </label>
                  <input
                    onChange={(event) => setFulladdress(event.target.value)}
                    value={fulladdress}
                    type="text"
                    // value="399"
                    name="price1"
                    id="price1"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Full Address"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    type="email"
                    // value="399"
                    name="email"
                    id="price2"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Email"
                  />
                  {emailError ? (
                    <p className="text-center font-medium text-red-700">
                      {emailError}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="price3"
                    className=" mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    onChange={(event) => setPhone(event.target.value)}
                    value={phone}
                    type="number"
                    // value="399"
                    name="price3"
                    id="price3"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Phone Number"
                  />
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

                <div className="text-center sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    other requests
                  </label>
                  <textarea
                    onChange={(event) => setOtherrequest(event.target.value)}
                    value={otherrequest}
                    id="description"
                    rows={5}
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-center text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write your requests..."
                  ></textarea>
                </div>
              </div>
              <div className="mb-4 flex items-center  justify-between rounded-t border-b pb-4  dark:border-gray-600 sm:mb-5">
                <h3 className="mx-auto text-lg font-semibold text-gray-900 dark:text-white">
                  Payment Methode
                </h3>
              </div>
              <div className="flex flex-wrap justify-center gap-x-2 ">
                <Link to="/notactivemassage">
                  <button
                    type="button"
                    className="border-grey-600  text-black-600 focus:ring-grey-300 dark:border-grey-500 dark:text-grey-500 dark:hover:bg-grey-600 dark:focus:ring-grey-900 mt-2 rounded-lg border-4 p-2 text-center text-xl font-medium hover:bg-green-500 hover:text-white focus:outline-none focus:ring-4 dark:hover:text-white"
                  >
                    PayPal
                  </button>
                </Link>
                <Link to="/notactivemassage">
                  <button
                    type="button"
                    className="border-grey-600  text-black-600 focus:ring-grey-300 dark:border-grey-500 dark:text-grey-500 dark:hover:bg-grey-600 dark:focus:ring-grey-900 mt-2 rounded-lg border-4 p-2 text-center text-xl font-medium hover:bg-green-500 hover:text-white focus:outline-none focus:ring-4 dark:hover:text-white"
                  >
                    Credit Card
                  </button>
                </Link>
                <button
                  onClick={() =>
                    handleSubmitOrderForm(
                      orderNumber1,
                      allCartProductToString,
                      firstname,
                      lastname,
                      phone,
                      email,
                      otherrequest,
                      theItemsQuantity!,
                      theAllProductsSum!,
                      currentTime,
                      role,
                      currentCart!,
                      fulladdress,
                      userUpdateWithId!
                    )
                  }
                  type="button"
                  className="border-grey-600  text-black-600 focus:ring-grey-300 dark:border-grey-500 dark:text-grey-500 dark:hover:bg-grey-600 dark:focus:ring-grey-900 mt-2 rounded-lg border-4 p-2 text-center text-xl font-medium hover:bg-green-500 hover:text-white focus:outline-none focus:ring-4 dark:hover:text-white"
                >
                  At the place
                </button>
              </div>
              <div className="flex justify-center ">
                <Link to="/shoppingcart" type="button">
                  <button
                    type="button"
                    className="mt-4  rounded-lg border border-red-600 p-2 text-center text-xl font-medium text-red-600 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                  >
                    X cancel
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
