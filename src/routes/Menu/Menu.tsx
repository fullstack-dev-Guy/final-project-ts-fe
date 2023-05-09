import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className="mt-44">
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto mb-6 max-w-screen-sm text-center lg:mb-6">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
              ? מה בתפריט
            </h2>
            <p className="font-light text-gray-900 dark:text-gray-400 sm:text-xl">
              שר קפה מזמינים אתכם להנות מתפריט איכותי ומגוון, שתייה חמה , שתייה
              קרה , סוגים שונים של מאפים וכריכים והכל עם המון אהבה{" "}
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
              src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2Fimg-20230209-wa0010.jpg?alt=media&token=0dda771a-4eea-400d-9d50-79b31e027ffb"
              className=" h-full w-full object-cover  "
            />
          </div>
          <div>
            <p className="mb-4 p-2 text-center">תפריט שרקפה</p>
          </div>
          <div className="mx-auto  flex  flex-wrap justify-center  overflow-x-auto">
            <div className="m-4 max-w-xs ">
              <table className=" w-full  text-left text-center text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      מחיר
                    </th>
                    <th scope="col" className="px-6 py-3">
                      שתייה חמה
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">12</td>
                    <td className="px-6 py-4">הפוך קטן</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">14</td>
                    <td className="px-6 py-4">הפוך גדול</td>
                  </tr>
                  <tr className="border bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">+2</td>
                    <td className="px-6 py-4">שיבולת שועל/סויה/שקדים</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">8</td>
                    <td className="px-6 py-4">אספרסו/קצר/ארוך</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">11</td>
                    <td className="px-6 py-4">אספרסו כפול</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">11/8</td>
                    <td className="px-6 py-4">אמריקנו קטן/גדול</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">12/10</td>
                    <td className="px-6 py-4">נס קפה קטן/גדול</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">8</td>
                    <td className="px-6 py-4">קפה שחור</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">14/12</td>
                    <td className="px-6 py-4">שוקולית קטן/גדול</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">16/14</td>
                    <td className="px-6 py-4">שוקו מטבעות קטן/גדול</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">16/14</td>
                    <td className="px-6 py-4">שוקולטה קטן/גדול</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">14</td>
                    <td className="px-6 py-4">סחלב</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">14</td>
                    <td className="px-6 py-4">חליטת תה</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="m-4 max-w-xs ">
              <table className=" w-full  text-left text-center text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      מחיר
                    </th>
                    <th scope="col" className="px-6 py-3">
                      שתייה קרה
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">16</td>
                    <td className="px-6 py-4">אייס קפה</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">16</td>
                    <td className="px-6 py-4">קפה קר</td>
                  </tr>
                  <tr className="border bg-white dark:bg-gray-800">
                    <td className="px-6 py-4">16</td>
                    <td className="px-6 py-4">מיץ טבעי</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">6</td>
                    <td className="px-6 py-4">מים/סודה</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">8</td>
                    <td className="px-6 py-4">פחית ספרייט</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">8</td>
                    <td className="px-6 py-4">פחית פנטה</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">8</td>
                    <td className="px-6 py-4">פחית קולה</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="m-4 max-w-xs ">
              <table className=" w-full  text-left text-center text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      מחיר
                    </th>
                    <th scope="col" className="px-6 py-3">
                      מאפים
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">14/7</td>
                    <td className="px-6 py-4">מאפה קטן/גדול</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">12</td>
                    <td className="px-6 py-4">מקל גבינה מלוח</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">12</td>
                    <td className="px-6 py-4">עוגייה גדולה</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">12</td>
                    <td className="px-6 py-4">חטיף בריאות טבעוני</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">10</td>
                    <td className="px-6 py-4">פרוסת עוגה</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="m-4 max-w-xs ">
              <table className=" w-full  text-left text-center text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      מחיר
                    </th>
                    <th scope="col" className="px-6 py-3">
                      כריכים
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">26</td>
                    <td className="px-6 py-4">כריך</td>
                  </tr>
                  <tr className="border bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-6 py-4">28</td>
                    <td className="px-6 py-4">כריך טבעוני</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
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
    </div>
  );
}
