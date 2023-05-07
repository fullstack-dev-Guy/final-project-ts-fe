import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { auth, db } from "../../lib/firebase";
import { userDb, getDocId, Cart } from "../../types/firestore";

export default function ToSignIn() {
  const { handleSignInUser, handleSigInWithGoogle } = useAuth();
  const { user } = useAuth();
  const userAuth = auth;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checkbox, setCheckBox] = useState(false);
  const [checkedError, setCheckedError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    const checkPassword = (password: string) => {
      if (password === "") {
        setPasswordError("Password is required field");
        return false;
      } else {
        setPasswordError("");
        return true;
      }
    };

    const isOkPassword = checkPassword(password);

    if (checkbox === false) {
      setCheckedError("Tick a V");
      setError("אמצעי ההתחברות לא תקינים");

      return false;
      // return navigate("/forgotpassword");
    } else {
      setCheckedError("");
    }

    if (isOkEmail === true && checkbox === true && isOkPassword === true) {
      await handleSignInUser(email, password);
      sessionStorage.removeItem("itemquantity");
      sessionStorage.removeItem("productsSum");
      const collectionRef = collection(db, "userDb");
      const querySnapshot = await getDocs(collectionRef);
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const onlyDocId = querySnapshot.docs.map((doc) => ({
        id: doc.id,
      }));

      const response = docs;

      ///////////////////////////////////////////////////// update role from guest to user
      // אם יש למשתמש סל מהתחברות קודמת נציג לו את הסל שלו מהתחברות קודמת ולא ניצור לו סל חדש
      let storageCartStatus: string | null = localStorage.getItem("cartID");

      if (userAuth) {
        const getAllCarts1 = await fetch(
          "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts"
        ); //GET
        const dataGetAllCarts1 = await getAllCarts1.json();

        if (!getAllCarts1.ok) {
          throw Error("could not fetch the data");
        }

        const getAlluserIDfromCart = JSON.parse(
          JSON.stringify(dataGetAllCarts1)
        ).map((doc: Cart) => doc.userID);
        const getAllcartID = JSON.parse(JSON.stringify(dataGetAllCarts1)).map(
          (doc: Cart) => doc.id
        );

        for (let i = 0; i < getAllcartID.length; i++) {
          if (auth.currentUser?.uid === getAlluserIDfromCart[i]) {
            var cartBelongToCurrentUser = getAllcartID[i];
            // זה הסל הקניות ששייך למשתמש שנרשם בעבר

            const guestCart = localStorage.getItem("cartID"); // הוא חושב שזה בהכרח משתמש שהוא אורח ולכן רוצה למחוק אותו בהתחברות

            if (guestCart !== cartBelongToCurrentUser) {
              // במידה ומשתמש יוצא מהדפדפן וחוזר אליו נוצר מצב שלמשתמש יש סל קניות באיחסון המקומי וגם בבבסיס הנתונים למרות שהדפדפן עולה הוא הפך לאורח . בהתחברות נוספת נוצרה בעיה שהוא חשב שהסל קניות הנוכחי שייך לאורח ולכן מחק אותו מיד בהתחברות דבר שיצר בעייה ברינדור של סל הקניות ובנוסף גם מחק את סל הקניות בבסיס הנתונים
              var responseDeleteCart = await fetch(
                "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
                  guestCart,
                {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
                }
              );
              localStorage.removeItem("cartID");
              localStorage.setItem("cartID", cartBelongToCurrentUser);
              if (!responseDeleteCart.ok) {
                throw Error("could not fetch the data");
              }
            } else {
              console.log("user does not have any cart ");
            }
          }
        }
      }
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //עדכון סל למשתמש לרול של יוזר בהנחה שסל הקניות הוא לא נאל והמשתמש התחבר
      const cartInStorage = localStorage.getItem("cartID");
      if (userAuth && cartInStorage !== null) {
        const responseUpdateCartRole = await fetch(
          "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
            cartInStorage,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              role: "user",
              userID: auth.currentUser?.uid,
              email: auth.currentUser?.email,
              orderNumber: " ",
              date: " ",
            }),
          }
        );
        const data = await responseUpdateCartRole.json();

        if (!responseUpdateCartRole.ok) {
          throw Error("could not complete the action");
        }
      }
      /////////////////////////////////////////////////////

      const getAllEmails = JSON.parse(JSON.stringify(response)).map(
        (doc: userDb) => doc.email
      );
      const getAllUserId = JSON.parse(JSON.stringify(response)).map(
        (doc: userDb) => doc.userId
      );
      const getAllDocId = JSON.parse(JSON.stringify(onlyDocId)).map(
        (doc: getDocId) => doc.id
      );

      for (let i = 0; i < getAllEmails.length; i++) {
        if (
          getAllEmails[i] === email &&
          getAllUserId[i] === auth.currentUser?.uid
        ) {
          let UserDocId: string = getAllDocId[i];

          const docRef = doc(db, "userDb", UserDocId);

          await updateDoc(docRef, { password, UserDocId });
        }
      }
      if (auth.currentUser) {
        return navigate("/signinindicationpage");
      } else {
        return navigate("/signinmassageerror");
      }
    } else {
      return navigate("/signinmassageerror");
    }
  }

  return (
    <div className="from-yellow-0 to-orange-0  mx-auto mt-48  max-w-screen-2xl bg-gradient-to-tr bg-cover bg-center p-2 ">
      <div className="">
        <div className="mx-auto flex flex-col items-center justify-center px-4 py-4  lg:py-0 ">
          <div className="to-amber-0  w-full rounded-lg border-4 border-amber-800 bg-gradient-to-tr from-amber-500 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                התחברות
              </h1>
              <Link to="/" role="button">
                <button
                  onClick={handleSigInWithGoogle}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                >
                  <svg
                    className="mr-2 -ml-1 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    ></path>
                  </svg>
                  Sign in with Google
                </button>
              </Link>
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
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    אימייל
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
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    סיסמה
                  </label>
                  <input
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-stone-300 bg-stone-50 p-2.5 text-stone-900 focus:border-amber-600 focus:ring-amber-600 dark:border-stone-600 dark:bg-stone-700 dark:text-white dark:placeholder-stone-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                  />
                  {passwordError ? (
                    <p className="font-medium text-red-700">{passwordError}</p>
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
                        //required
                      />
                    </div>
                    {checkedError ? (
                      <p className="ml-2 text-xs font-medium text-red-700">
                        {checkedError}
                      </p>
                    ) : null}
                    <div className="mr-2 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-black-600 ml-2 dark:text-gray-300"
                      >
                        V יש לסמן
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forgotpassword"
                    className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                  >
                    ? שכחת סיסמה
                  </Link>
                </div>

                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg border-4 border-amber-800 bg-lime-800 px-5 py-2.5 text-center text-lg font-medium text-white focus:outline-none focus:ring-4"
                >
                  כניסה
                </button>
                <p className="text-black-700 text-sm font-light dark:text-gray-400">
                  יש לך כבר משתמש ?{" "}
                  <NavLink
                    to="/register"
                    className="text-primary-600 dark:text-primary-500 text-lg font-medium hover:underline"
                  >
                    צור משתמש כאן
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
