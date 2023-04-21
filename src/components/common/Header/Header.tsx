import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

import UserMenue from "../UserMenue/UserMenue";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  var currentCart = localStorage.getItem("cartID");

  return (
    <div className=" mx-auto max-w-screen-2xl p-6">
      <div className="from-yellow-0 to-orange-0 relative h-full w-full bg-gradient-to-tr bg-cover bg-center">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2FIMG-20230125-WA0018-v3.jpg?alt=media&token=bb916f1d-be12-4ffa-85c3-3c4d22285055"
          className="absolute h-80 w-full object-cover mix-blend-overlay"
          alt="Header photo"
        />

        <div className="p-5 ">
          <nav className=" relative mx-auto">
            <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between  ">
              {currentCart === null ? (
                <Link
                  to="shoppingcartdummy"
                  className=" flex items-center"
                  role="button"
                >
                  <button className="flex p-1  ">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="yellow"
                      >
                        <path d="M10.028 15h-5.413l-4.615-11h15l-.564 2h-11.428l2.938 7h2.678l1.404 2zm7.544-5.439l1.756-5.561h1.929l.743-2h-4.195l-2.489 7.979 2.256-.418zm-10.072 6.439c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm14.011-3.454c1.44 2.018 1.041 3.439 2.489 5.471l-5.585 3.983c-3.015-2.246-5.617-2.966-6.458-3.248-.801-.27-1.317-.783-1.14-1.428.181-.652.862-.846 1.424-.821.848.039 1.536.293 1.536.293l-3.896-5.461c-.348-.488-.234-1.165.254-1.512.486-.348 1.163-.234 1.511.253l2.639 3.693c.127.178.374.22.553.093.179-.127.22-.375.093-.553l-.65-.912 1.047-.261c.274-.067.562.04.726.27l.532.746c.127.179.374.22.553.093.179-.127.22-.375.093-.554l-.614-.861 1.027-.23c.27-.058.548.05.708.274l.452.634c.127.178.375.219.553.093.179-.127.22-.375.093-.553l-.507-.71.303-.054c1.052-.186 1.623.363 2.264 1.262zm-12.006-3.597c.676-.482 1.55-.498 2.201.002-.371-1.242-1.856-1.754-2.913-1-1.059.756-1.054 2.326-.003 3.079-.261-.778.039-1.599.715-2.081z" />
                      </svg>
                    </div>
                    <div>
                      <span className="ml-2 self-center whitespace-nowrap text-base font-semibold dark:text-white">
                        סל קניות
                      </span>
                    </div>
                  </button>
                </Link>
              ) : (
                <Link
                  to="shoppingcart"
                  className=" flex items-center"
                  role="button"
                >
                  <button className="flex p-1  ">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="yellow"
                      >
                        <path d="M10.028 15h-5.413l-4.615-11h15l-.564 2h-11.428l2.938 7h2.678l1.404 2zm7.544-5.439l1.756-5.561h1.929l.743-2h-4.195l-2.489 7.979 2.256-.418zm-10.072 6.439c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm14.011-3.454c1.44 2.018 1.041 3.439 2.489 5.471l-5.585 3.983c-3.015-2.246-5.617-2.966-6.458-3.248-.801-.27-1.317-.783-1.14-1.428.181-.652.862-.846 1.424-.821.848.039 1.536.293 1.536.293l-3.896-5.461c-.348-.488-.234-1.165.254-1.512.486-.348 1.163-.234 1.511.253l2.639 3.693c.127.178.374.22.553.093.179-.127.22-.375.093-.553l-.65-.912 1.047-.261c.274-.067.562.04.726.27l.532.746c.127.179.374.22.553.093.179-.127.22-.375.093-.554l-.614-.861 1.027-.23c.27-.058.548.05.708.274l.452.634c.127.178.375.219.553.093.179-.127.22-.375.093-.553l-.507-.71.303-.054c1.052-.186 1.623.363 2.264 1.262zm-12.006-3.597c.676-.482 1.55-.498 2.201.002-.371-1.242-1.856-1.754-2.913-1-1.059.756-1.054 2.326-.003 3.079-.261-.778.039-1.599.715-2.081z" />
                      </svg>
                    </div>
                    <div>
                      <span className="ml-2 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        סל קניות
                      </span>
                    </div>
                  </button>
                </Link>
              )}

              {user ? (
                <UserMenue />
              ) : (
                <div className="mt-1 flex items-center">
                  <Link to="/register">
                    <button
                      role="button"
                      className="mr-2 rounded-lg  border border-gray-700 p-1 text-base font-semibold text-amber-200 hover:bg-lime-700 hover:underline focus:outline-none  dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 "
                    >
                      הרשמה
                    </button>
                  </Link>
                  <Link to="/tosignin">
                    <button
                      role="button"
                      className="rounded-lg  border border-gray-700 p-1 text-base font-semibold text-amber-200 hover:bg-lime-700 hover:underline focus:outline-none  dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      כניסה
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
          <nav className=" relative mx-auto">
            <div className=" mx-auto max-w-screen-xl px-1 py-4 md:px-4">
              <div className="flex items-center">
                <ul className="mt-0 mr-2 flex flex-row space-x-2 text-sm font-normal">
                  <li>
                    <Link
                      to="/"
                      className="rounded-lg  border border-gray-700 p-1 text-xs font-semibold text-amber-200 hover:bg-lime-700 hover:underline focus:outline-none  dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      aria-current="page"
                    >
                      דף הבית
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="rounded-lg  border border-gray-700 p-1 text-xs font-semibold text-amber-200 hover:bg-lime-700 hover:underline focus:outline-none  dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      אודות
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/menu"
                      className="rounded-lg  border border-gray-700 p-1 text-xs font-semibold text-amber-200 hover:bg-lime-700 hover:underline focus:outline-none  dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      תפריט
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="allproducts"
                      className="rounded-lg  border border-gray-700 p-1 text-xs font-semibold text-amber-200 hover:bg-lime-700 hover:underline focus:outline-none  dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      מוצרים
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <nav className=" relative mx-auto">
            <div className="mx-auto max-w-screen-xl px-1 py-1 md:px-4">
              <div className="flex items-center">
                <ul className="mt-0 mr-6 flex flex-row space-x-3 text-sm font-normal">
                  <li>
                    <Link
                      to="/blogs"
                      className="rounded-lg  border border-gray-700 p-1 text-xs font-semibold text-amber-200 hover:bg-lime-700 hover:underline focus:outline-none  dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      aria-current="page"
                    >
                      בלוג
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/coupons"
                      className="rounded-lg  border border-gray-700 p-1 text-xs font-semibold text-amber-200 hover:bg-lime-700 hover:underline focus:outline-none  dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      הטבות
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/openingtimes"
                      className="rounded-lg  border border-gray-700 p-1 text-xs font-semibold text-amber-200 hover:bg-lime-700 hover:underline focus:outline-none  dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                      זמני פתיחה
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
