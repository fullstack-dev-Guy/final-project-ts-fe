import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {
  CartArchives,
  MyFetchResponse,
  Order,
  userDb,
} from "../../types/firestore";
import { auth } from "../../lib/firebase";
import { useState } from "react";

export default function MyOrderHistory() {
  const { user } = useAuth();

  const navigate = useNavigate();
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allOrders = useLoaderData() as MyFetchResponse<Order[]>; //data

  var arryForGettingAllMyOrders = allOrders.data?.filter(
    (x: Order) => x.email === auth.currentUser?.email
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allCartArchives = useLoaderData() as MyFetchResponse<CartArchives[]>; //data1

  var arryForGettingAllMyCartsArchives = allCartArchives.data1?.filter(
    (x: CartArchives) => x.email === auth.currentUser?.email
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allUsers = useLoaderData() as MyFetchResponse<userDb[]>; //data2

  var arryForGettingAllusers = JSON.parse(JSON.stringify(allUsers.data2)).map(
    (x: userDb) => x
  );

  let userRecognize = arryForGettingAllusers!.filter(
    (x: userDb) => x.email === auth.currentUser?.email
  );

  let currentRole1 = userRecognize.map((x: userDb) => x.role);
  let currentRole = currentRole1[0];

  ////////////////////////////////////////////////////////////////////////////////////fullDetailsArry

  var fullDetailsArry: any[] = [];
  for (let i = 0; i < arryForGettingAllMyOrders!.length; i++) {
    if (
      arryForGettingAllMyOrders![i].cart ===
      arryForGettingAllMyCartsArchives![i].cart
    ) {
      fullDetailsArry[i] = Object.assign(
        {},
        arryForGettingAllMyOrders![i],
        arryForGettingAllMyCartsArchives![i]
      );
    }
  }

  const [search, setSearch] = useState("");

  let fullDetailsArryAfterFilter = fullDetailsArry.filter(
    (x: any) =>
      x.address.toLowerCase().includes(search.toLowerCase()) ||
      x.cart.toLowerCase().includes(search.toLowerCase()) ||
      x.date.toLowerCase().includes(search.toLowerCase()) ||
      x.email.toLowerCase().includes(search.toLowerCase()) ||
      x.firebaseUserID.toLowerCase().includes(search.toLowerCase()) ||
      x.firstname.toLowerCase().includes(search.toLowerCase()) ||
      x.id.toLowerCase().includes(search.toLowerCase()) ||
      x.itemquantity.toString().toLowerCase().includes(search.toLowerCase()) ||
      x.lastname.toLowerCase().includes(search.toLowerCase()) ||
      x.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      x.orderstatus.toLowerCase().includes(search.toLowerCase()) ||
      x.otherrequest.toLowerCase().includes(search.toLowerCase()) ||
      x.paymentamount.toLowerCase().includes(search.toLowerCase()) ||
      x.phonenumber.toLowerCase().includes(search.toLowerCase()) ||
      //x.products.toLowerCase().includes(search.toLowerCase()) ||
      x.role.toLowerCase().includes(search.toLowerCase()) ||
      x.userID.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-44">
      <section className="bg-gray-50 p-3 dark:bg-gray-900 sm:p-5">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="flex justify-center">
            <Outlet />
          </div>

          <p className="text-center text-2xl">היסטוריית הזמנות</p>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simplesearch" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simplesearch"
                      className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-center text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Search"
                      onChange={(event) => setSearch(event.target.value)}
                      value={search}

                      // required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-center text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      מספר הזמנה
                    </th>
                    <th scope="col" className="px-4 py-3">
                      מוצרים
                    </th>
                    <th scope="col" className="px-4 py-3">
                      שם
                    </th>
                    <th scope="col" className="px-4 py-3">
                      מזהה סל
                    </th>
                    <th scope="col" className="px-4 py-3">
                      תאריך הזמנה
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      לתשלום (ש"ח)
                    </th>
                    <th scope="col" className="px-4 py-3">
                      פרטים נוספים
                    </th>
                    <th scope="col" className="px-4 py-3">
                      סטטוס
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fullDetailsArryAfterFilter ? (
                    fullDetailsArryAfterFilter.map((x: any) => (
                      <tr
                        key={x.id}
                        className="border-b text-center dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                        >
                          {x.orderNumber}
                        </th>
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              navigate(
                                "/myorderhistory/showproductsforOrderhistory/" +
                                  x.id
                              )
                            }
                            className=" border p-1"
                          >
                            הצגה
                          </button>
                        </td>

                        <td className="px-4 py-3">{x.firstname}</td>
                        <td className="px-4 py-3">{x.cart}</td>
                        <td className="px-4 py-3">{x.date}</td>
                        <td className="px-4 py-3">{x.email}</td>

                        <td className="px-4 py-3">{x.paymentamount}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              navigate(
                                "/myorderhistory/showallorderdetailsmyhistory/" +
                                  x.id
                              )
                            }
                            className=" border p-1"
                          >
                            פרטים
                          </button>
                        </td>
                        <td className="px-4 py-3">{x.orderstatus}</td>
                      </tr>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </tbody>
              </table>
              <div></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
