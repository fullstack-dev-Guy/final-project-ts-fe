import { getAuth } from "firebase/auth";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function SignInIndicationPage() {
  const auth = getAuth();

  const { user } = useAuth();
  console.log(user);
  if (user === undefined) {
    <p>Loading...</p>;
  }

  return (
    <div className="mx-auto mt-20 max-w-screen-xl p-6 sm:mt-20 md:mt-20 lg:mt-20 xl:mt-28">
      <section className=" bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-yellow-400 dark:text-indigo-500 lg:text-6xl">
              התחברות בוצעה בהצלחה
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-800 dark:text-white md:text-4xl">
              אחרי אישור חלון זה ניתן ללחוץ על האייקון העגול שנמצא בצד ימין
              למעלה של המסך ולהכנס לאיזור האישי
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              ניתן למחוק משתמש או לערוך את איזור האישי וכמו כן לרשום בלוג ולערוך
              אותו או לראות את הסטוריית ההזמנות
            </p>

            <Link to="/" role="button">
              <button
                className="my-4 ml-4 inline-flex rounded-lg bg-indigo-600 px-5
                  py-2.5 text-center text-sm font-medium text-white
                  hover:bg-indigo-800 focus:outline-none focus:ring-4
                  focus:ring-indigo-300 dark:focus:ring-indigo-900"
              >
                חזרה לדף הבית
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
