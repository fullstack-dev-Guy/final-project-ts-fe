import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthProvider";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Blog, MyFetchResponse, getDocId, userDb } from "../../types/firestore";

export default function MyAllBlogs() {
  const { user } = useAuth();
  const blogs = useLoaderData() as MyFetchResponse<Blog[]>;

  const navigate = useNavigate();

  let myBlogsArry = blogs.data!.filter(
    (x) => x.useremail === auth.currentUser?.email
  );

  if (blogs.status === "error") return <p>{blogs.message}</p>;
  return (
    <html dir="rtl" lang="he">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre&display=swap"
        />
      </head>
      <div className="mx-auto  max-w-screen-xl p-4">
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-screen-xl py-2 px-4 lg:py-2 lg:px-6">
            <div className="mx-auto mb-6 max-w-screen-sm text-center lg:mb-6">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
                הבלוגים שלי
              </h2>
              <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
                .כאן אפשר לרשום את הבלוג או את חוויית הביקור שהיתה לכם אצלנו
              </p>
              <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
                .ניתן למחוק , להוסיף בלוג או לערוך בלוגים קיימים
              </p>
            </div>

            <div className="  mb-2 flex justify-center">
              {user ? (
                <button
                  onClick={() => navigate("/blogs/addblog")}
                  className=" rounded-lg border border-gray-700 bg-yellow-200 p-2 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  צור בלוג חדש
                </button>
              ) : null}
            </div>

            <div className="flex-auto">
              {myBlogsArry ? (
                myBlogsArry.map((blog) => (
                  <article
                    key={blog.id}
                    className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    <p>{blog.id}</p>
                    <div className=" ">
                      <h2 className=" mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
                        {blog.title}
                      </h2>
                      <p className="mb-5 text-center font-light text-gray-500 dark:text-gray-400 ">
                        {blog.body}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className=" mt-2 flex flex-wrap text-center">
                        <button
                          className="mx-3 mt-2 border p-2"
                          onClick={() => navigate("/blogs/blogpage/" + blog.id)}
                        >
                          קרא עוד
                        </button>

                        {user ? (
                          <button
                            className="mx-3 mt-2 border p-2"
                            onClick={() => navigate("deleteblog/" + blog.id)}
                          >
                            מחיקת בלוג
                          </button>
                        ) : null}

                        {user ? (
                          <button
                            className="mx-3 mt-2 border p-2"
                            onClick={() =>
                              navigate("/blogs/editblog/" + blog.id)
                            }
                          >
                            ערוך בלוג
                          </button>
                        ) : null}
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium dark:text-white">
                          {blog.date}
                        </span>
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
    </html>
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
