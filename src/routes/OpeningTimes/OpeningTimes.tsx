import { Link } from "react-router-dom";

export default function OpeningTimes() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto mb-6 max-w-screen-sm text-center lg:mb-6">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
              הימים בהם אנחנו פעילים
            </h2>
            <p className="font-light text-gray-900 dark:text-gray-400 sm:text-xl">
              : זמני הפתיחה שלנו הם
            </p>
          </div>

          <div className="  mb-2 flex justify-center">
            <Link to="/">
              <button
                role="button"
                className=" rounded-lg border border-gray-700 bg-yellow-200 p-2 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
              >
                חזרה לדף הבית
              </button>
            </Link>
          </div>

          <div>
            <img
              src="./src\assets\images\img-20221029-wa0001.jpg"
              className=" h-full w-full object-cover  "
            />
          </div>
        </div>
      </section>
    </div>
  );
}
