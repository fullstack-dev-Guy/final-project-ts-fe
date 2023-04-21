import { getAuth } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto mt-20 max-w-screen-xl p-6 sm:mt-20 md:mt-20 lg:mt-20 xl:mt-28">
      <section className=" bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-yellow-400 dark:text-indigo-500 lg:text-6xl">
              איפוס סיסמה
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-800 dark:text-white md:text-4xl">
              נשלח אימייל לאיפוס סיסמה , יש ללחוץ על הקישור שנשלח על מנת לאפס את
              הסיסמה
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Check if inside your email inbox there is a password reset mail
              sent by us, it is important that you verify your account in order
              to use the site without restrictions.{" "}
            </p>

            <Link
              to="/tosignin"
              className="my-4 ml-4 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900"
            >
              התחברות מחדש
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
