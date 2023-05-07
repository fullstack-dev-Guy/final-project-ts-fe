import { Link } from "react-router-dom";

export default function OpeningTimes() {
  return (
    <div>
      <section className="mt-44 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto mb-6 max-w-screen-sm text-center lg:mb-6">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
              הימים בהם אנחנו פעילים
            </h2>
            <p className="font-light text-gray-900 dark:text-gray-400 sm:text-xl">
              : זמני הפתיחה שלנו הם
            </p>
          </div>
          <div className="m-4 mx-auto max-w-xs">
            <table className=" w-full  text-left text-center text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-100  text-lg uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    שעות
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ימים
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border bg-white text-xl font-bold dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-6 py-4">7:30 - 13:00</td>
                  <td className="px-6 py-4">א-ו</td>
                </tr>
                <tr className="border bg-white text-xl font-bold dark:border-gray-700 dark:bg-gray-800">
                  <td className="px-6 py-4">16:30 - 18:30</td>
                  <td className="px-6 py-4">ב , ה</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mb-2 text-center text-base font-light text-gray-900 dark:text-gray-400">
            זמני הפעילות עלולים להשתנות מעת לעת ולכן יש להתעדכן
          </p>
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
