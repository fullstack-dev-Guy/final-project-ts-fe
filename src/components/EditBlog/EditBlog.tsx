import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { db } from "../../lib/firebase";
import { Blog, MyFetchResponse } from "../../types/firestore";

export default function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();

  let currentId: string = id!;

  const blogs = useLoaderData() as MyFetchResponse<Blog[]>;

  let currentBlog = blogs.data!.filter((x: Blog) => x.id === currentId);

  let blogtitle = currentBlog[0].title;
  let blogbody = currentBlog[0].body;
  let blogfirstname = currentBlog[0].firstname;
  let bloglastname = currentBlog[0].lastname;

  const [title, setTitle] = useState(blogtitle);
  const [body, setBody] = useState(blogbody);
  const [firstname, setFirstName] = useState(blogfirstname);
  const [lastname, setLastName] = useState(bloglastname);

  useEffect(() => {
    setTitle(title);
    setBody(body);
    setFirstName(firstname);
    setLastName(lastname);
    //getMyBlogPage(currentId)
  }, []);

  const handleEditBlog = async (
    currentId: string,
    title: string,
    body: string,
    firstname: string,
    lastname: string
  ) => {
    try {
      const docRef = doc(db, "blog", currentId);
      await updateDoc(docRef, { title, body, firstname, lastname });
      navigate("/blogs");
    } catch (error) {
      console.error(error);
    }
    return navigate("/blogs");
  };

  return (
    <html dir="rtl" lang="he">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre&display=swap"
        />
      </head>
      <div className="mx-auto mt-44 max-w-screen-2xl p-6 sm:mt-44 md:mt-44 lg:mt-44 xl:mt-44 2xl:mt-44">
        <label
          htmlFor="message"
          className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white"
        >
          ערוך את הבלוג
        </label>
        <textarea
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          id="title"
          name="title"
          rows={2}
          className=" flex w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 "
        ></textarea>
        <textarea
          onChange={(event) => setBody(event.target.value)}
          value={body}
          id="body"
          name="body"
          rows={4}
          className="mt-4 flex w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        ></textarea>
        <div className="mx-auto mt-2 flex flex-wrap justify-center">
          <div className="mb-2">
            <input
              onChange={(event) => setLastName(event.target.value)}
              value={lastname}
              size={15}
              type="text"
              name="lastname"
              id="lastname"
              className=""
            />
            <label htmlFor="lastname">
              {" "}
              &nbsp; :שם משפחה &nbsp; &nbsp; &nbsp;
            </label>
          </div>
          <div>
            <input
              onChange={(event) => setFirstName(event.target.value)}
              value={firstname}
              size={15}
              type="text"
              name="irstname"
              id="irstname"
              className=""
            />
            <label htmlFor="irstname"> &nbsp; :שם פרטי &nbsp; </label>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <Link to="/blogs">
            <button
              onClick={() =>
                handleEditBlog(currentId, title, body, firstname, lastname)
              }
              className=" rounded-lg border border-gray-700 bg-yellow-200 p-1 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              עדכון ושמירת בלוג
            </button>
          </Link>
          <Link to="/blogs">
            <button className="ml-5 rounded-lg border border-gray-700 bg-yellow-200 p-1 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
              חזרה לדף הבלוגים
            </button>
          </Link>
        </div>
      </div>
    </html>
  );
}
