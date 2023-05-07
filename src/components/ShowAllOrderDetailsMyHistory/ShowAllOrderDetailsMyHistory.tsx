import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import {
  CartArchives,
  MyFetchResponse,
  Order,
  userDb,
} from "../../types/firestore";
import { auth } from "../../lib/firebase";

export default function ShowAllOrderDetailsMyHistory() {
  const { user } = useAuth();
  const { id } = useParams();

  let currentId: string = id!;

  const navigate = useNavigate();
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allOrders = useLoaderData() as MyFetchResponse<Order[]>; //data

  var arryForGettingAllOrders = JSON.parse(JSON.stringify(allOrders.data)).map(
    (x: Order) => x
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allCartArchives = useLoaderData() as MyFetchResponse<CartArchives[]>; //data1

  var arryForGettingAllCartsArchives = JSON.parse(
    JSON.stringify(allCartArchives.data1)
  ).map((x: CartArchives) => x);

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
  for (let i = 0; i < arryForGettingAllOrders.length; i++) {
    if (
      arryForGettingAllOrders[i].cart === arryForGettingAllCartsArchives[i].cart
    ) {
      fullDetailsArry[i] = Object.assign(
        {},
        arryForGettingAllOrders[i],
        arryForGettingAllCartsArchives[i]
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////
  var fullDetailSelectedOrder: any = fullDetailsArry.filter(
    (x) => x.id === currentId
  );

  var orderSelectedFullDetails: any = fullDetailSelectedOrder[0];
  return (
    <div className="fixed top-32 z-10  max-w-screen-sm rounded border-4  border-green-700   bg-white  p-6  ">
      <div className="mx-auto  border  text-center">
        <span className="font-bold text-sky-800">:כל הפרטים עבור הזמנה זו</span>
        <div>
          <button
            onClick={() => navigate("/myorderhistory")}
            className="mr-2 rounded border-4 border-red-900 bg-red-100 px-2.5 py-0.5 text-2xl font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
          >
            סגור
          </button>

          {orderSelectedFullDetails ? (
            <ul className="p-2" key={orderSelectedFullDetails.id}>
              <li>
                {orderSelectedFullDetails.email}{" "}
                <span className="font-bold">:אימייל</span>
              </li>
              <li>
                <span className="font-bold">שם פרטי</span>
                {"-"}
                {orderSelectedFullDetails.firstname}
              </li>
              <li>
                <span className="font-bold">שם משפחה</span>
                {"-"}
                {orderSelectedFullDetails.lastname}
              </li>
              <li>
                {orderSelectedFullDetails.phonenumber}{" "}
                <span className="font-bold">:טלפון</span>
              </li>
              <li>
                {orderSelectedFullDetails.orderNumber}{" "}
                <span className="font-bold">:מספר הזמנה</span>
              </li>
              <li>
                {orderSelectedFullDetails.orderstatus}{" "}
                <span className="font-bold">:סטטוס הזמנה</span>
              </li>
              <li>
                {orderSelectedFullDetails.otherrequest}{" "}
                <span className="font-bold">:בקשות מיוחדות</span>
              </li>
              <li>
                {orderSelectedFullDetails.paymentamount}{" "}
                <span className="font-bold">:סכום לתשלום</span>
              </li>
              <li>
                {orderSelectedFullDetails.role}{" "}
                <span className="font-bold">:סוג לקוח</span>
              </li>
              <li>
                {orderSelectedFullDetails.date}{" "}
                <span className="font-bold">:תאריך הזמנה</span>
              </li>
              <li>
                {orderSelectedFullDetails.address}{" "}
                <span className="font-bold">:כתובת</span>
              </li>
              <li>
                {orderSelectedFullDetails.cart}{" "}
                <span className="font-bold">:מספר סל קניות</span>
              </li>
              <li>
                {orderSelectedFullDetails.userID}{" "}
                <span className="font-bold">:מספר משתמש</span>
              </li>
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
