import { collection, getDocs } from "firebase/firestore";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { db } from "../../lib/firebase";
import { MyFetchResponse, Blog } from "../../types/firestore";
import { useAuth } from "../../context/AuthProvider";

export default function Blogs() {
  const { user } = useAuth();
  const blogs = useLoaderData() as MyFetchResponse<Blog[]>;
  const navigate = useNavigate();

  // if (blogs.status === "error") return <p>{blogs.message}</p>;
  return (
    <div className="mx-auto mt-44 max-w-screen-xl p-6">
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto mb-6 max-w-screen-sm text-center lg:mb-6">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
              הבלוג שלנו
            </h2>
            <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
              כאן תוכלו לרשום את הבלוג שלכם או את חוויית הביקור שהיתה לכם אצלנו
              , על מנת לרשום תוכן יש צורך להרשם ולהתחבר למערכת. לאחר מכן תוכלו
              לערוך או למחוק את התוכן הכתוב
            </p>
          </div>

          <div className="  mb-2 flex justify-center">
            {user ? (
              <button
                onClick={() => navigate("addblog")}
                className=" rounded-lg border border-gray-700 bg-yellow-200 p-2 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                צור בלוג חדש
              </button>
            ) : null}
          </div>

          <div className="flex-auto">
            {blogs.data ? (
              blogs.data.map((blog) => (
                <article
                  key={blog.id}
                  className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className=" ">
                    <h2 className=" mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
                      {blog.title}
                    </h2>
                    <p className="mb-5 text-center font-light text-gray-500 dark:text-gray-400 ">
                      {blog.body}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium dark:text-white">
                        {blog.date}
                      </span>
                    </div>

                    <div className="mt-2">
                      <button onClick={() => navigate("blogpage/" + blog.id)}>
                        ... קרא עוד
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="flex justify-center">
            <Outlet />
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
