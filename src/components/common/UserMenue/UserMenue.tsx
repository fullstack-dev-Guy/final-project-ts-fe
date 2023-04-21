import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

export default function UserMenue() {
  const { user, handleSignOutUser } = useAuth();
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpenUserMenu((prev) => !prev)}
        type="button"
        className="mr-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 md:mr-0"
        id="user-menu-button"
        aria-expanded="false"
      >
        <span className="sr-only">Open user menu</span>
        {user ? (
          <div className="flex h-16 w-16 justify-center rounded-full border-2 border-solid border-amber-400 bg-orange-500 align-middle align-middle  text-lg text-xl text-white">
            <div className="mt-3 align-middle">
              {user && user?.displayName?.charAt(0)}
            </div>
          </div>
        ) : null}
      </button>

      {openUserMenu ? (
        <div
          className=" absolute right-0 z-50 my-4 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700 sm:right-0 lg:right-0"
          id="user-dropdown"
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">
              {user && user.displayName}
            </span>
            <span className="block truncate text-sm font-medium text-gray-500 dark:text-gray-400">
              {user && user.email}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <Link to="/dashboard">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
                  הצג פרופיל
                </button>
              </Link>
            </li>
            <li>
              <Link
                to="/emailverification"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                אימות מייל
              </Link>
              {user && user.emailVerified ? (
                <p className="text-center text-green-600">verified</p>
              ) : (
                <p className="text-center text-red-600">not verified</p>
              )}
            </li>
            <li>
              <Link
                to="/forgotpassword"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                איפוס סיסמה
              </Link>
            </li>
            <li>
              <Link to="/" role="button">
                <button
                  onClick={handleSignOutUser}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </button>
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
