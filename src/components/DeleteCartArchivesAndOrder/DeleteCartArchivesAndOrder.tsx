import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { CartArchives, MyFetchResponse, Order } from "../../types/firestore";

export default function DeleteCartArchivesAndOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  let currentId: string = id!; // מספר סל ארכיון

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allCartArchives = useLoaderData() as MyFetchResponse<CartArchives[]>; //data1

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allOrders = useLoaderData() as MyFetchResponse<Order[]>; //data

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let cartRecognize = allCartArchives.data1?.filter(
    (x: CartArchives) => x.id === currentId
  )[0].cart;

  let currentOrderToDelete = allOrders.data?.filter(
    (x: Order) => x.cart === cartRecognize
  )[0].id;

  const handleDeleteCartArchivesAndOrder = async (
    currentOrderToDelete: string,
    currentId: string
  ) => {
    var responseDeleteCart = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/orders/" +
        currentOrderToDelete,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!responseDeleteCart.ok) {
      throw Error("could not fetch the data");
    }

    var responseDeleteCart = await fetch(
      "http://localhost:3000/routes/cartsarchives/" + currentId,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!responseDeleteCart.ok) {
      throw Error("could not fetch the data");
    }

    return navigate("/ordermanagement");
  };

  return (
    <div className=" fixed top-32 z-10 m-4 p-6 ">
      <div
        id="alert-additional-content-2"
        className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-center text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <div className=" ">
          <svg
            aria-hidden="true"
            className="mr-2 h-5 w-5 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only ">Info</span>
          <h3 className="text-lg font-medium ">
            {" "}
            ? האם את/ה בטוח/ה במחיקת הזמנה זו
          </h3>
          <p>
            Are you sure you want to delete this order with id: {cartRecognize}?
          </p>
        </div>

        <div className="mt-2 mb-4 text-sm">
          על מנת למחק הזמנה זו יש ללחוץ על לחצן אישור{" "}
        </div>
        <div className="mt-2 mb-4 text-sm">
          כל הנתונים לגבי הזמנה זו ימחקו כולל ההיסטוריה של ההזמנה הזו{" "}
        </div>

        <div className="flex justify-center">
          <Link to="/ordermanagement">
            <button
              onClick={() =>
                handleDeleteCartArchivesAndOrder(
                  currentOrderToDelete!,
                  currentId
                )
              }
              className="mr-2 inline-flex items-center rounded-lg bg-red-800 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              אישור
            </button>
          </Link>

          <button
            onClick={() => navigate("/ordermanagement")}
            type="button"
            className="rounded-lg border border-red-800 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-800 hover:bg-red-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-600 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-800"
            data-dismiss-target="#alert-additional-content-2"
            aria-label="Close"
          >
            בטל פעולה
          </button>
        </div>
      </div>
    </div>
  );
}
