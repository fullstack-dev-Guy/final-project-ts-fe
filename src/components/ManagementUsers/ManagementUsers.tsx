import { auth, db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MyFetchResponse, userDb } from "../../types/firestore";
import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";

export default function ManagementUsers() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getUsers = useLoaderData() as MyFetchResponse<userDb[]>;

  let mongoDbUsers = getUsers.data1;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var arryForGettingAllusers = JSON.parse(JSON.stringify(mongoDbUsers)).map(
    (x: userDb) => x
  );

  let userRecognize = arryForGettingAllusers!.filter(
    (x: userDb) => x.email === auth.currentUser?.email
  );

  let currentRole1 = userRecognize.map((x: userDb) => x.role);
  let currentRole: string = currentRole1[0];

  /////////////////////////////////////////////////////////////////////////////////
  const [search, setSearch] = useState("");

  let fullDetailsArryAfterFilter = getUsers.data1!.filter(
    (x: userDb) =>
      x.displayName.toLowerCase().includes(search.toLowerCase()) ||
      x.email.toLowerCase().includes(search.toLowerCase()) ||
      x.id.toLowerCase().includes(search.toLowerCase()) ||
      x.firebaseUserID.toLowerCase().includes(search.toLowerCase()) ||
      x.role.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-44">
      {currentRole === "admin" && user ? (
        <section className="bg-gray-50 p-3 dark:bg-gray-900 sm:p-5">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="flex justify-center">
              <Outlet />
            </div>

            <p className="text-center text-2xl">ניהול כל המשתמשים</p>
            <p className="text-center text-sm">
              מחיקת משתמשים תתבצע רק דרך בסיסי הנתונים
            </p>
            <p className="text-center text-sm">
              (יש למחוק עבור משתמש גם את הסל קניות שלו במידה ולא ביצע הזמנה)
            </p>
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
                        שם משתמש
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-4 py-3">
                        firebaseUserID
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-4 py-3">
                        mongoDbId
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fullDetailsArryAfterFilter ? (
                      fullDetailsArryAfterFilter.map((x: userDb) => (
                        <tr
                          key={x.id}
                          className="border-b text-center dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                          >
                            {x.displayName}
                          </th>
                          <td className="px-4 py-3">{x.email}</td>

                          <td className="px-4 py-3">{x.firebaseUserID}</td>
                          <td className="px-4 py-3">{x.role}</td>
                          <td className="px-4 py-3">{x.id}</td>
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
      ) : (
        <div className="m-4 mx-auto max-w-screen-xl p-6 ">
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
              <h3 className="text-2xl font-medium "> פעולה לא חוקית</h3>
              <p>אין לך הרשאה להיכנס לאיזור זה של האתר</p>
            </div>

            <div className="mt-2 mb-4 text-sm">חזור לדף הבית</div>

            <div className="flex justify-center">
              <Link to="/">
                <button className="mr-2 inline-flex items-center rounded-lg bg-red-800 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  חזרה לדף הבית
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const handleManagementUser = async () => {
  try {
    const collectionRef = collection(db, "userDb");
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!collectionRef) {
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

    const response2 = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts"
    );
    const cartsFromMongoDb = await response2.json();

    const data2 = cartsFromMongoDb;

    if (!response1.ok) {
      throw Error("could not fetch the data");
    }

    return { data, data1, data2, status: "success" };
  } catch (error) {
    console.error(error);

    return { status: "error", message: (error as Error).message, data: null };
  }
};
