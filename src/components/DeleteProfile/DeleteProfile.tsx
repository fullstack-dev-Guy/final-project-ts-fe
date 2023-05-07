import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { auth } from "../../lib/firebase";

export default function DeleteProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="from-yellow-0 to-orange-0 relative mx-auto mt-44 h-full w-full max-w-screen-2xl  bg-gradient-to-tr bg-cover bg-center p-6 sm:mt-44 md:mt-44 lg:mt-44">
      <div className="relative ">
        <div className="p-8 ">
          <div className="relative   mx-auto max-w-sm flex-col rounded-lg border border-gray-200 bg-white p-6  shadow dark:border-gray-700 dark:bg-gray-800">
            <div className=" fixed top-48 right-10 left-10 z-10 mr-2 p-4 ">
              <div
                id="alert-additional-content-2"
                className="mx-auto w-full max-w-screen-xl rounded-lg border border-red-300 bg-red-50 p-2 text-center text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
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
                    ? האם את/ה בטוח/ה במחיקת משתמש זה
                  </h3>
                </div>

                <div className="mt-2 mb-4 text-sm">
                  על מנת למחוק משתמש יש צורך בהכנסת אימייל וסיסמה . לאחר מכן
                  תתבצע מחיקה באופן סופי. לביטול מחיקת משתמש יש ללחוץ על בטל
                  פעולה שיחזיר למצב הקודם
                </div>

                <div className="flex justify-center">
                  <Link to="/deleteprofilepage">
                    <button className="mr-2 inline-flex items-center rounded-lg bg-red-800 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                      מחק
                    </button>
                  </Link>

                  <button
                    onClick={() => navigate("/dashboard")}
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

            <div className="flex content-between justify-between px-4 pt-4">
              <div>
                <Link
                  to="/"
                  role="button"
                  className="inline-flex rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="readProductModal"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center pb-10">
              {user && user.photoURL ? (
                <img
                  className="h-16 w-16 rounded-full "
                  src={user.photoURL}
                  alt="user photo"
                />
              ) : (
                <div className="flex h-14 w-14 justify-center rounded-full border-2 border-solid border-amber-400 bg-orange-500  text-lg font-medium text-white">
                  <div className="mt-2.5">
                    {user && user?.displayName?.charAt(0)}
                  </div>
                </div>
              )}
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {user && user.displayName}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {user && user.email}
              </span>
              <div className="mt-4 flex flex-wrap justify-center space-x-3 md:mt-6">
                <Link to="/deleteprofile">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-lg border border-red-700 bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900"
                  >
                    <svg
                      className="mr-1 -ml-1 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    מחיקת משתמש
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
