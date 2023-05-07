import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { MyFetchResponse, userDb } from "../../../types/firestore";
import { auth } from "../../../lib/firebase";

export default function UserMenue() {
  const { user, handleSignOutUser } = useAuth();
  //////////////////////////////////////////////////////////////////////
  const users1 = useLoaderData() as MyFetchResponse<userDb[]>;

  let user2 = users1.data?.map((x: userDb) => x);

  let userRecognize = user2!.filter((x) => x.email === auth.currentUser?.email);

  let currentRole1 = userRecognize.map((x: userDb) => x.role);
  let currentRole = currentRole1[0];

  //////////////////////////////////////////////////////////////////////////
  return (
    <div className="mx-auto mt-44 mb-20 w-full max-w-screen-2xl px-4 lg:px-12">
      <div className="px-4 py-3 text-center">
        <span className="block text-sm text-xl text-gray-900 dark:text-white">
          {user && user.displayName}
        </span>
        <span className="block truncate text-2xl text-sm font-medium text-gray-500 dark:text-gray-400">
          {user && user.email}
        </span>
      </div>
      <div className="min-h-32 relative overflow-hidden bg-white shadow-md dark:bg-gray-800 md:rounded-lg">
        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-y-0 md:space-x-4">
          <Link to="/">
            <button
              onClick={handleSignOutUser}
              type="button"
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 md:w-auto"
            >
              התנתקות
            </button>
          </Link>
          <Link to="/dashboard">
            <button
              type="button"
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 md:w-auto"
            >
              הצג פרופיל
            </button>
          </Link>
          <Link to="/emailverification">
            <button
              type="button"
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-6 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 md:w-auto"
            >
              אימות אימייל
            </button>
            {user && user.emailVerified ? (
              <p className="text-center text-green-600">verified</p>
            ) : (
              <p className="text-center text-red-600">not verified</p>
            )}
          </Link>

          <Link to="/forgotpassword">
            <button
              type="button"
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 md:w-auto"
            >
              איפוס סיסמה
            </button>
          </Link>
          <Link to="/myorderhistory">
            <button
              type="button"
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 md:w-auto"
            >
              היסטוריית הזמנות
            </button>
          </Link>
          <Link to="/myallblogs">
            <button
              type="button"
              className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 md:w-auto"
            >
              הבלוגים שלי
            </button>
          </Link>
          {user && user.email && currentRole.toString() === "admin" ? (
            <Link to="/blogmangment">
              <button
                type="button"
                className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 md:w-auto"
              >
                ניהול כל הבלוגים
              </button>
            </Link>
          ) : null}
          {user && user.email && currentRole.toString() === "admin" ? (
            <Link to="/ordermanagement">
              <button
                type="button"
                className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 md:w-auto"
              >
                ניהול כל ההזמנות
              </button>
            </Link>
          ) : null}
          {user && user.email && currentRole.toString() === "admin" ? (
            <Link to="/managementusers">
              <button
                type="button"
                className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 md:w-auto"
              >
                ניהול כל המשתמשים
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export async function userRoleLoader() {
  try {
    const response = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/users"
    );
    const data = await response.json();

    if (!response.ok) {
      throw Error("could not fetch the data");
    }
    return { data, status: "success" };
  } catch (error) {
    console.error(error);

    return { status: "error", message: (error as Error).message, data: null };
  }
}
