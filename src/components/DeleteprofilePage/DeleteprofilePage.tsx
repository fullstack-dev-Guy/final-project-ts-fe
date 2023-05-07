import { deleteUser, User } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { auth, db } from "../../lib/firebase";
import { userDb, getDocId } from "../../types/firestore";

export default function DeleteprofilePage() {
  const { handleSignInUser } = useAuth();
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
    //////////////////////////////////////////////////// first cart delete after that local strage delete
    const cartInStorage = localStorage.getItem("cartID");

    const responseDeleteCart = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
        cartInStorage,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!responseDeleteCart.ok) {
      throw Error("could not fetch the data");
    } else {
      localStorage.removeItem("cartID");
    }

    ////////////////////////////////////////////////////

    const checkEmail = (email: string) => {
      if (email === "") {
        setEmailError("חובה להכניס אימייל");
        return false;
      }
      if (email !== auth.currentUser?.email) {
        setEmailError("יש להכניס את האימייל שאיתו בוצע החיבור");
      } else {
        setEmailError("");
        return true;
      }
    };
    const isOkEmail = checkEmail(email);

    const checkPassword = (password: string) => {
      if (password === "") {
        setPasswordError("חובה להכניס סיסמה");
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
    } else {
      setCheckedError("");
    }

    if (isOkEmail === true && checkbox === true && isOkPassword === true) {
      let responseSignIn = await handleSignInUser(email, password);
      if (responseSignIn.ok) {
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

        const getAllEmails = JSON.parse(JSON.stringify(response)).map(
          (doc: userDb) => doc.email
        );
        const getAllUserId = JSON.parse(JSON.stringify(response)).map(
          (doc: userDb) => doc.userId
        );
        const getAllUserDocId = JSON.parse(JSON.stringify(response)).map(
          (doc: userDb) => doc.UserDocId
        );
        const getAllPassword = JSON.parse(JSON.stringify(response)).map(
          (doc: userDb) => doc.password
        );
        const getAllDocId = JSON.parse(JSON.stringify(onlyDocId)).map(
          (doc: getDocId) => doc.id
        );

        //////////////////////////////////////////////////
        const response2 = await fetch(
          "https://final-project-ts-be-prisma-atlas.onrender.com/routes/users"
        );
        const data2 = await response2.json();
        const getAllDocfromMongodb = JSON.parse(JSON.stringify(data2)).map(
          (doc: userDb) => doc.id
        );

        if (!response2.ok) {
          throw Error("could not fetch the data");
        }
        for (let j = 0; j < data2.length; j++) {
          if (auth.currentUser?.uid === data2[j].firebaseUserID) {
            const response = await fetch(
              "https://final-project-ts-be-prisma-atlas.onrender.com/routes/users/" +
                getAllDocfromMongodb[j],
              {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        }
        ////////////////////////////////////////////////

        for (let i = 0; i < getAllDocId.length; i++) {
          if (
            getAllEmails[i] === email &&
            getAllUserId[i] === auth.currentUser?.uid
          ) {
            let UserDocId: string = getAllUserDocId[i];

            const docRefDelete = doc(db, "userDb", UserDocId);
            await deleteDoc(docRefDelete);
            await deleteUser(auth.currentUser as User);
          }
        }

        return navigate("/deleteprofilesuccess");
      } else {
        return navigate("/deleteprofilefail");
      }
    } else {
      return console.error("not deleted");
    }
  }

  return (
    <div className="from-yellow-0 to-orange-0  mx-auto mt-48  max-w-screen-2xl bg-gradient-to-tr bg-cover bg-center p-2 ">
      <div className="">
        <div className="mx-auto flex flex-col items-center justify-center px-4 py-4  lg:py-0 ">
          <div className="to-amber-0  w-full rounded-lg border-4 border-amber-800 bg-gradient-to-tr from-amber-500 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                השלמת פרטים לפני מחיקה
              </h1>

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
                    Your email
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
                    Password
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
                      <p className="text-xs font-medium text-red-700">
                        {checkedError}
                      </p>
                    ) : null}
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-black-600 dark:text-gray-300"
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
                  מחיקה
                </button>
                <p className="text-black-700 text-center text-sm font-light dark:text-gray-400">
                  <NavLink
                    to="/"
                    className="text-primary-600 dark:text-primary-500  text-lg font-medium hover:underline"
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
