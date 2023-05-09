import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { CartArchives, MyFetchResponse, Order } from "../../types/firestore";
import { useAuth } from "../../context/AuthProvider";

export default function UpdateStatusWarning() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  let currentId: string = id!; // מספר סל ארכיון

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allCartArchives = useLoaderData() as MyFetchResponse<CartArchives[]>; //data1

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allOrders = useLoaderData() as MyFetchResponse<Order[]>; //data

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let cartRecognize = allCartArchives.data1?.filter(
    (x: CartArchives) => x.id === currentId
  )[0].cart;

  let currentOrderToUpdate = allOrders.data?.filter(
    (x: Order) => x.cart === cartRecognize
  )[0].id;

  const handleUpdateStatus = async (currentOrderToUpdate: string) => {
    try {
      const responseUpdateCartRole = await fetch(
        "https://final-project-ts-be-prisma-atlas.onrender.com/routes/orders/" +
          currentOrderToUpdate,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderstatus: "finished",
          }),
        }
      );
      navigate("/ordermanagement");
    } catch (error) {
      console.error(error);
    }
    return navigate("/ordermanagement");
  };
  return (
    <div className=" fixed top-32 z-10 m-4 p-6 ">
      {user ? (
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
              ? האם את/ה בטוח/ה בעדכון הזמנה זו
            </h3>
            <p>Are you sure you want to update this order with id: {id}?</p>
          </div>

          <div className="mt-2 mb-4 text-sm">
            על מנת לעדכן סטטוס הזמנה למצב סיום יש ללחוץ על לחצן אישור{" "}
          </div>

          <div className="flex justify-center">
            <Link to="/ordermanagement">
              <button
                onClick={() => handleUpdateStatus(currentOrderToUpdate!)}
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
      ) : null}
    </div>
  );
}
