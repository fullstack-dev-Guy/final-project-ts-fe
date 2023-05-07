import { Link } from "react-router-dom";

export default function ContactMassage() {
  return (
    <div className="mx-auto  max-w-screen-2xl  sm:mt-20 md:mt-20 lg:mt-20 xl:mt-20">
      <section className="mt-44 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-2xl py-4 px-4 lg:py-4 lg:px-4">
          <div className="mx-auto max-w-screen-xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-blue-600 dark:text-indigo-500 lg:text-6xl">
              הבקשה נשלחה
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-800 dark:text-white md:text-4xl">
              נשלח אישור בקשה למייל , נעשה את המירב על מנת לענות לכם במהרה
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              ניתן לפנות אלינו גם באימייל או דרך הטלפון
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              בברכה , שרקפה
            </p>

            <Link to="/" role="button">
              <button className=" rounded-lg border border-gray-700 bg-yellow-200 p-2 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                חזרה לדף הבית
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
