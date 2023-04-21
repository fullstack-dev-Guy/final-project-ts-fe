import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../lib/firebase";
import { Blog } from "../../types/firestore";

export default function BlogPage() {
  const [myBlogPage, setMyBlogPage] = useState<Blog | null>(null);
  const { id } = useParams();
  console.log({ id });

  let currentId: string = id!;
  useEffect(() => {
    const getMyBlogPage = async (currentId: string) => {
      try {
        const docRef = doc(db, "blog", currentId);
        const docSnapshot = await getDoc(docRef);
        setMyBlogPage(docSnapshot.data() as Blog);
      } catch (error) {
        console.error(error);
      }
    };
    getMyBlogPage(currentId);
  }, []);

  return (
    <div className="mx-auto mt-20 max-w-screen-xl p-6">
      <article className=" mb-4 rounded-lg border border-gray-200 bg-orange-100 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <p>{myBlogPage?.id}</p>

        <div className="mx-auto mb-6 max-w-screen-sm text-center lg:mb-6">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
            דף הבלוג
          </h2>
          <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            דף הבלוג הוא לקריאה בלבד
          </p>
        </div>
        <div className="  mb-2 flex justify-center">
          <Link to="/blogs">
            <button
              role="button"
              className=" rounded-lg border border-gray-700 bg-yellow-200 p-2 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            >
              חזרה לדף הבלוגים
            </button>
          </Link>
        </div>
        <div className=" ">
          <h2 className=" mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            <a href="#">{myBlogPage?.title}</a>
          </h2>
          <p className="mb-5 text-center font-light text-gray-500 dark:text-gray-400 ">
            {myBlogPage?.body}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-medium dark:text-white">
              {myBlogPage?.lastname}
              <span>_</span>
              {myBlogPage?.firstname}
            </span>
          </div>
        </div>
      </article>
    </div>
  );
}
