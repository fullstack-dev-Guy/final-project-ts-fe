import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthProvider";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Blog, MyFetchResponse, Role, userDb } from "../../types/firestore";
import { useState } from "react";

export default function BlogMangment() {
  const { user } = useAuth();
  const blogs = useLoaderData() as MyFetchResponse<Blog[]>;

  const { id } = useParams();
  const navigate = useNavigate();

  //////////////////////////////////////////////////////////////////////
  const users1 = useLoaderData() as MyFetchResponse<userDb[]>;

  var arryForGettingAllusers = JSON.parse(JSON.stringify(users1.data1)).map(
    (x: userDb) => x
  );

  let userRecognize = arryForGettingAllusers!.filter(
    (x: userDb) => x.email === auth.currentUser?.email
  );

  let currentRole1 = userRecognize.map((x: userDb) => x.role);
  let currentRole = currentRole1[0];

  //////////////////////////////////////////////////////////////////////////
  const [search, setSearch] = useState("");

  let blogsAfterFilter = blogs.data?.filter(
    (x: Blog) =>
      x.body.toLowerCase().includes(search.toLowerCase()) ||
      x.date.toLowerCase().includes(search.toLowerCase()) ||
      x.firebaseId.toLowerCase().includes(search.toLowerCase()) ||
      x.firstname.toLowerCase().includes(search.toLowerCase()) ||
      x.lastname.toLowerCase().includes(search.toLowerCase()) ||
      x.title.toLowerCase().includes(search.toLowerCase()) ||
      x.useremail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-44">
      <div className="mx-auto  flex h-full w-full max-w-screen-2xl justify-center  bg-gradient-to-tr bg-cover bg-center p-6 ">
        <Outlet />
      </div>
      <section className="bg-gray-50 p-3 dark:bg-gray-900 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <p className="text-center text-2xl">ניהול כל הבלוגים</p>
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
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
                      id="simple-search"
                      className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="Search"
                      onChange={(event) => setSearch(event.target.value)}
                      value={search}
                    />
                  </div>
                </form>
              </div>
              <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  <svg
                    className="mr-2 h-3.5 w-3.5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add product
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-center text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-3">
                      FireBaseUserID
                    </th>
                    <th scope="col" className="px-4 py-3">
                      כותרת
                    </th>
                    <th scope="col" className="px-4 py-3">
                      מזהה בלוג
                    </th>
                    <th scope="col" className="px-4 py-3">
                      תאריך
                    </th>
                    <th scope="col" className="px-4 py-3">
                      מחיקה
                    </th>
                    <th scope="col" className="px-4 py-3">
                      צפייה
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogsAfterFilter ? (
                    blogsAfterFilter.map((blog) => (
                      <tr
                        key={blog.id}
                        className="border-b text-center dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                        >
                          {blog.useremail}
                        </th>
                        <td className="px-4 py-3">{blog.firebaseId}</td>
                        <td className="px-4 py-3">{blog.title}</td>
                        <td className="px-4 py-3">{blog.id}</td>
                        <td className="px-4 py-3">{blog.date}</td>
                        <td className="px-4 py-3">
                          {user &&
                          user.email &&
                          currentRole.toString() === "admin" ? (
                            <button
                              onClick={() => navigate("deleteblog2/" + blog.id)}
                              className=" border p-1"
                            >
                              מחיקה
                            </button>
                          ) : null}
                        </td>

                        <td className="px-4 py-3">
                          <button
                            onClick={() =>
                              navigate("/blogs/blogpage/" + blog.id)
                            }
                            className=" border p-1"
                          >
                            צפייה
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p>Loading...</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function blogsLoader() {
  try {
    const response1 = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/users"
    );
    const usersFromMongoDb = await response1.json();

    const data1 = usersFromMongoDb;
    if (!response1.ok) {
      throw Error("could not fetch the data");
    }

    const collectionRef = collection(db, "blog");
    const querySnapshot = await getDocs(collectionRef);
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const response = docs;

    const data = response;
    if (!response) {
      throw Error("Could not fetch the data");
    }
    return { data, data1, status: "success" };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: (error as Error).message,
      docdata: null,
    };
  }
}
