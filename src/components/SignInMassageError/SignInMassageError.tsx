import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { getAuth } from "firebase/auth";

export default function SignInMassageError() {
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
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-red-600 dark:text-indigo-500 lg:text-6xl">
              התחברות נכשלה
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-800 dark:text-white md:text-4xl">
              אחד הפרטים שהוזנו אינו תקין , יש לבדוק שוב אם הוכנסו פרטים כנדרש
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              במידה ויש בעיה בהתחברות ניתן לשלוח הודעה לתמיכה הטכנית או לאפס
              סיסמה
            </p>

            <Link to="/tosignin" role="button">
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
