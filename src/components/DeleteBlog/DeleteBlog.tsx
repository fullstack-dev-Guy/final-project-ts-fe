import { deleteDoc, doc } from "firebase/firestore";

import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "../../lib/firebase";

export default function DeleteBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log({ id });

  let currentId: string = id!;

  const handleDeleteBlog = async (currentId: string) => {
    try {
      const docRef = doc(db, "blog", currentId);
      await deleteDoc(docRef);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
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
            ? האם את/ה בטוח/ה במחיקת בלוג זה
          </h3>
          <p>Are you sure you want to delete post with id: {id}?</p>
        </div>

        <div className="mt-2 mb-4 text-sm">
          .על מנת למחוק את הבלוג יש ללחוץ על כפתור מחק , פעולה זו תמחק את נתוני
          הבלוג באופן סופי . לביטול מחיקת הבלוג יש ללחוץ לחצן "בטל פעולה" שיחזיר
          למצב קודם
        </div>

        <div className="flex justify-center">
          <Link to="/blogs">
            <button
              onClick={() => handleDeleteBlog(currentId)}
              className="mr-2 inline-flex items-center rounded-lg bg-red-800 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              מחק
            </button>
          </Link>

          <button
            onClick={() => navigate("/blogs")}
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
