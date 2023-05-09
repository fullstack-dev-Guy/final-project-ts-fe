import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { auth } from "../../lib/firebase";

export default function ForgotPassword() {
  const { handleUserForgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [checkbox, setCheckBox] = useState(false);
  const [checkedError, setCheckedError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const checkEmail = (email: string) => {
      if (email === "") {
        setEmailError("Email is a required field");
        return false;
      } else {
        setEmailError("");
        return true;
      }
    };

    const isOkEmail = checkEmail(email);

    if (checkbox === false) {
      setCheckedError("Tick a V");
      setError("אמצעי ההתחברות לא תקינים");

      return false;
    } else {
      setCheckedError("");
    }

    if (isOkEmail === true && checkbox === true) {
      await handleUserForgotPassword(email);
      return navigate("/resetpasswordpage");
    } else {
      return navigate("/forgotpassword");
    }
  }

  return (
    <div className="from-yellow-0 to-orange-0  mx-auto mt-48  max-w-screen-2xl bg-gradient-to-tr bg-cover bg-center p-2 ">
      <div className="">
        <div className="mx-auto flex flex-col items-center justify-center px-4 py-4  lg:py-0 ">
          <div className="to-amber-0  w-full rounded-lg border-4 border-amber-800 bg-gradient-to-tr from-amber-500 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                שחזור סיסמה
              </h1>
              <p className="bg-orange-200 text-center font-bold text-red-900">
                שחזור סיסמה מתבצע על ידיי שליחת לינק לאימייל
              </p>

              {error ? (
                <p className="text-center font-medium text-white">{error}</p>
              ) : null}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-center text-sm font-medium text-gray-900 dark:text-white"
                  >
                    יש להכניס אימייל
                  </label>
                  <input
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border border-stone-300 bg-stone-50 p-2.5 text-stone-900 focus:border-amber-600 focus:ring-amber-600 dark:border-stone-600 dark:bg-stone-700 dark:text-white dark:placeholder-stone-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="name@company.com"
                  />
                  {emailError ? (
                    <p className="font-medium text-red-700">{emailError}</p>
                  ) : null}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        onChange={() => setCheckBox(!checkbox)}
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                        checked={checkbox}
                      />
                    </div>
                    {checkedError ? (
                      <p className="ml-2 text-xs font-medium text-red-700">
                        {checkedError}
                      </p>
                    ) : null}
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-black-600 dark:text-gray-300"
                      >
                        חובה לסמן
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg border-4 border-amber-800 bg-lime-800 px-5 py-2.5 text-center text-lg font-medium text-white focus:outline-none focus:ring-4"
                >
                  שליחת מייל
                </button>
                <p className="text-black-700 text-center text-sm font-light dark:text-gray-400">
                  <NavLink
                    to="/"
                    className="text-primary-600 dark:text-primary-500 text-lg font-medium hover:underline"
                  >
                    חזרה לדף הבית
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
