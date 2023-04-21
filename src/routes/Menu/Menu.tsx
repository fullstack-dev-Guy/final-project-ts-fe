import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div>
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
        </div>
      </section>
    </div>
  );
}
