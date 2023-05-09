import { Link, useNavigate, useParams } from "react-router-dom";
import { Cart } from "../../types/firestore";
import { auth } from "../../lib/firebase";

export default function AddToShoppingCart() {
  const navigate = useNavigate();
  const { id } = useParams();

  let currentId: string = id!; // זה איי די של מוצר

  const cartInStorage = localStorage.getItem("cartID");

  async function addToCarts(currentId: string, cartInStorage: string) {
    ////////////////////////////////////////////////////////////////////////////////////////////
    if (cartInStorage === null) {
      if (!auth.currentUser) {
        const getAllCarts1 = await fetch(
          "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts"
        ); //GET
        const dataGetAllCarts1 = await getAllCarts1.json();

        if (!getAllCarts1.ok) {
          throw Error("could not fetch the data");
        }

        const getAllCartId = JSON.parse(JSON.stringify(dataGetAllCarts1)).map(
          (doc: Cart) => doc.id
        );

        //post
        try {
          const response = await fetch(
            "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                products: [],
                role: "guest",
                userID: " ",
                email: "tempemail@gmail.com",
                orderNumber: " ",
                date: " ",
                ses: "",
              }),
            }
          );

          if (!response.ok) {
            throw Error("could not complete the action");
          }

          //מוציא מתוך כל הסלי קניות את הסל קניות של המשתמש הנוכחי
          const getAllCarts2 = await fetch(
            "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts"
          ); //GET after ctreat(post)
          const dataGetAllCarts2 = await getAllCarts2.json();

          if (!getAllCarts2.ok) {
            throw Error("could not fetch the data");
          }

          const getAllCartId2 = JSON.parse(
            JSON.stringify(dataGetAllCarts2)
          ).map((doc: Cart) => doc.id);

          let cartDifference = getAllCartId2.filter(
            (x: number) => !getAllCartId.includes(x)
          );

          localStorage.setItem("cartID", cartDifference);

          console.error("cart already exist");

          const response2 = await fetch(
            "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
              cartDifference,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                products: {
                  push: [currentId],
                },
              }),
            }
          );

          if (!response2.ok) {
            throw Error("could not complete the action");
          }
        } catch (error) {
          console.error(error);
          return {
            status: "error",
            data: null,
            message: (error as Error).message,
          };
        }
        navigate("/allproducts");
        ///////////////////////////////////////////////////////b
      } else {
        const getAllCarts1 = await fetch(
          "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts"
        ); //GET
        const dataGetAllCarts1 = await getAllCarts1.json();

        if (!getAllCarts1.ok) {
          throw Error("could not fetch the data");
        }

        const getAllCartId = JSON.parse(JSON.stringify(dataGetAllCarts1)).map(
          (doc: Cart) => doc.id
        );

        //post
        try {
          const response = await fetch(
            "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                products: [],
                role: "user",
                userID: auth.currentUser.uid,
                email: auth.currentUser?.email,
                orderNumber: " ",
                date: " ",
                ses: "",
              }),
            }
          );

          if (!response.ok) {
            throw Error("could not complete the action");
          }

          //מוציא מתוך כל הסלי קניות את הסל קניות של המשתמש הנוכחי
          const getAllCarts2 = await fetch(
            "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts"
          ); //GET after ctreat(post)
          const dataGetAllCarts2 = await getAllCarts2.json();

          if (!getAllCarts2.ok) {
            throw Error("could not fetch the data");
          }

          const getAllCartId2 = JSON.parse(
            JSON.stringify(dataGetAllCarts2)
          ).map((doc: Cart) => doc.id);

          let cartDifference = getAllCartId2.filter(
            (x: number) => !getAllCartId.includes(x)
          );

          localStorage.setItem("cartID", cartDifference);
          //////////////////////////////////////////////////
          const response2 = await fetch(
            "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
              cartDifference,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                products: {
                  push: [currentId],
                },
              }),
            }
          );

          if (!response2.ok) {
            throw Error("could not complete the action");
          }

          ////////////////////////////////////////////////////
        } catch (error) {
          console.error(error);
          return {
            status: "error",
            data: null,
            message: (error as Error).message,
          };
        }
        navigate("/allproducts");
      }
    } else {
      console.error("cart already exist");

      //////////////////////////////////////////////////////////////////////////////////////////////

      const response2 = await fetch(
        "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
          cartInStorage,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            products: {
              push: [currentId],
            },
          }),
        }
      );

      if (!response2.ok) {
        throw Error("could not complete the action");
      }
      navigate("/allproducts");
    }
  }

  return (
    <div className="flex justify-center">
      <div className=" fixed  top-32 z-10    ">
        <div
          id="alert-additional-content-1"
          className="mb-4 rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <div className="flex items-center justify-center">
            <span className="sr-only">Info</span>
            <h3 className=" text-lg font-medium">הוספת מוצר לסל הקניות</h3>
          </div>

          <div className="mt-2 mb-4 text-sm">אישור הוספת פריט לסל הקניות</div>

          <div className="flex justify-center">
            <div className="flex justify-center">
              <div className="mx-auto flex w-3/4 justify-center ">
                <Link role="button" to="/allproducts">
                  <button
                    className=" rounded-md border border-blue-800 p-1"
                    onClick={() =>
                      addToCarts(currentId as string, cartInStorage as string)
                    }
                  >
                    אישור
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-center">
            <Link
              to="/allproducts"
              role="button"
              className="rounded-lg border border-red-800 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-800 hover:bg-red-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-600 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-800"
              data-dismiss-target="#alert-additional-content-2"
              aria-label="Close"
            >
              בטל פעולה
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
