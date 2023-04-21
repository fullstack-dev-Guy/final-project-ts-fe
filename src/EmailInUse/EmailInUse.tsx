import { Link, NavLink, useNavigate } from "react-router-dom";

export default function EmailInUse() {
  const navigate = useNavigate();

  return (
    <div className="from-yellow-0 to-orange-0 relative mx-auto mt-20 h-full w-full max-w-screen-2xl bg-gradient-to-tr bg-cover bg-center p-6 sm:mt-28 md:mt-28 lg:mt-28">
      <div className="flex justify-center ">
        <div className=" top-58 fixed z-10 mx-auto  p-8 ">
          <div
            id="alert-additional-content-2"
            className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-center text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <div className=" ">
              <svg
                aria-hidden="true"
                className="mr-2 h-5 w-5 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only ">Info</span>
              <h3 className="text-lg font-medium ">
                {" "}
                אימייל זה נמצא כבר בשימוש
              </h3>
            </div>

            <div className="mt-2 mb-4 text-sm">
              לא ניתן להרשם עם אימייל שכבר נמצא בשימוש, על מנת להירשם יש להזין
              אימייל שונה מהקיים. בכל בעיה ניתן ליצור קשר עם התמיכה הטכנית
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="rounded-lg border border-red-800 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-800 hover:bg-red-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-600 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-800"
                data-dismiss-target="#alert-additional-content-2"
                aria-label="Close"
              >
                חזרה לדף הרשמה
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <img
          src="./src\assets\images\IMG-20230126-WA0008-sar2.jpg"
          className=" absolute h-full w-full object-cover mix-blend-overlay"
        />
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0 ">
          <div className="to-amber-0 relative w-full rounded-lg border-4 border-amber-800 bg-gradient-to-tr from-amber-500 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                יצירת משתמש חדש
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="fullname"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    type="fullname"
                    name="fullname"
                    id="fullname"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="fullname"
                    //required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="name@company.com"
                    // required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    //required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    //  required
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"

                      //required
                    />
                    <div className=" ml-2 mr-2 flex"></div>
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg border-4 border-amber-800 bg-lime-800 px-5 py-2.5 text-center text-sm text-lg font-medium text-white focus:outline-none focus:ring-4"
                >
                  לחץ כאן ליצירת חשבון
                </button>
                <p className="text-black-500 dark:text-black-400 text-sm font-light">
                  Already have an account?{" "}
                  <NavLink
                    to="/tosignin"
                    className="text-primary-600 dark:text-primary-500 text-lg font-medium hover:underline"
                  >
                    Login here
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
