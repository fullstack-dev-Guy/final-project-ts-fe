import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../lib/firebase";

export default function AddBlog() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmitAddBlog = async () => {
    try {
      const collectionRef = collection(db, "blog");
      const docRef = await addDoc(collectionRef, {
        title,
        body,
        firstname,
        lastname,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-32 max-w-screen-2xl p-6 sm:mt-32 md:mt-32 lg:mt-32 xl:mt-32 2xl:mt-32">
      <label
        htmlFor="message"
        className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white"
      >
        צור בלוג חדש
      </label>
      <textarea
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        id="title"
        name="title"
        rows={2}
        className=" flex w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-end text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="הכנס כותרת לבלוג"
      ></textarea>
      <textarea
        onChange={(event) => setBody(event.target.value)}
        value={body}
        id="body"
        name="body"
        rows={4}
        className="mt-4 flex w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-end text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="כתוב את הבלוג"
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
            className="text-end"
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
            className="text-end"
          />
          <label htmlFor="irstname"> &nbsp; :שם פרטי &nbsp; </label>
        </div>
      </div>
      <div className="mt-3 flex justify-center">
        <Link to="/blogs">
          <button
            onClick={() => handleSubmitAddBlog()}
            className=" rounded-lg border border-gray-700 bg-yellow-200 p-1 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            שמירה והוספת בלוג חדש
          </button>
        </Link>
      </div>
    </div>
  );
}
