import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="mx-auto">
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="text-primary-600 dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
              404
            </h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              הדף לא קיים
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              .הדף אליו נכנסת לא קיים או שקיימת בעיה אחרת באתר
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              .לחיצה על על לחצן חזרה לדף הבית מחזירה לדף הבית של האתר
            </p>
            <Link
              to="/"
              className="hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
            >
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
