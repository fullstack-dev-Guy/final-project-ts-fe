import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { FormEvent, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { auth, db } from "../../lib/firebase";
import { getDocId, userDb } from "../../types/firestore";

//const passwordValidation = new RegExp(
//  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
//);

const emailValidation = new RegExp(
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
);

export default function Register() {
  const { handleSignUpUser, user } = useAuth();

  //access to email -- console.log(auth.currentUser?.email);
  // access to email verify -- console.log(auth.currentUser?.emailVerified);
  const [error, setError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dispalyError, setDispalyError] = useState("");
  const [checkedError, setCheckedError] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [checkbox, setCheckBox] = useState(false);
  console.log(checkbox);

  const navigate = useNavigate();

  const handleSubmitRegisterForm = async (event: FormEvent) => {
    event.preventDefault();

    const checkDisplayName = (displayName: string) => {
      if (displayName === "") {
        setDispalyError("full name is a required field");
        return false;
      } else {
        setDispalyError("");
        return true;
      }
    };
    const isOkDisplayName = checkDisplayName(displayName);
    console.log(isOkDisplayName + "displayname");

    const checkEmail = (email: string) => {
      if (email === "") {
        setEmailError("Email name is a required field");
        return false;
      } else {
        if (email.match(emailValidation)) {
          setEmailError("");
          return true;
        } else {
          setEmailError("Must be valid Email");
          return false;
        }
      }
    };
    const isOkEmail = checkEmail(email);
    console.log(isOkEmail + "email");

    const checkPassword = (confirm: string, password: string) => {
      if (password === "") {
        setPasswordError("Password is required field");
        return false;
      } else {
        if (!password.match(/(\d+)/)) {
          setPasswordError("password must contain 1 number 0-9");
        } else {
          if (!password.match(/[A-Z]/)) {
            setPasswordError("password must contain 1 uppercase");
          } else {
            if (!password.match(/[a-z]/)) {
              setPasswordError("password must contain 1 lowercase");
            } else {
              if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/)) {
                setPasswordError("password is 8-16 character with no space");
              } else {
                if (password !== confirm) {
                  setPasswordError("Password did not match");
                  return false;
                } else {
                  setPasswordError("");
                  return true;
                }
              }
            }
          }
        }
      }
    };

    const isOkPassword = checkPassword(confirm, password);
    console.log(isOkPassword + "password");

    const checkConfirm = (confirm: string, password: string) => {
      if (confirm === "") {
        setConfirmError("confirm is required field");
        return false;
      } else {
        if (password !== confirm) {
          setConfirmError("confirm did not match");
          return false;
        } else {
          setConfirmError("");
          return true;
        }
      }
    };
    const isOkConfirm = checkConfirm(confirm, password);
    console.log(isOkConfirm + "confirm");

    const checkOkCheckBox = (checkbox: boolean) => {
      if (checkbox === false) {
        setCheckedError("Tick a V");
        return false;
      } else {
        setCheckedError("");
        return true;
      }
    };

    const isOkCheckBox = checkOkCheckBox(checkbox);
    console.log(isOkCheckBox + "chrckbox");

    if (
      isOkConfirm === true &&
      isOkDisplayName === true &&
      isOkPassword === true &&
      isOkEmail === true &&
      isOkCheckBox === true
    ) {
      const result = await handleSignUpUser(email, password, displayName);
      console.log(result);
      if (!result.ok) {
        setError(
          "There was a problem with the sign up, please try again later"
        );
      }

      if (result.ok) {
        console.log("email not exists = ok");
        console.log(
          auth.currentUser?.emailVerified + " " + "email verified status"
        );

        // היה רצון לשמור את הססמה של המשתמש דבר שהוא לא בטיחותי ולעדכן אותה כאשר יבצע איפוס ססמה
        const getUserUID = auth.currentUser?.uid;
        console.log(getUserUID);
        // שמירת משתמש בקולקשיין של userDb
        const collectionRef = collection(db, "userDb");
        const docRef = await addDoc(collectionRef, {
          email,
          password,
          displayName,
          userId: getUserUID,
          UserDocId: "",
          role: "user ",
        });

        const collectionRef2 = collection(db, "userDb");
        const querySnapshot = await getDocs(collectionRef2);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const onlyDocId = querySnapshot.docs.map((doc) => ({
          id: doc.id,
        }));

        const response = docs;
        console.log(response);
        console.log("up");
        // יצירת מערכים עבור כל : email userId id
        const getAllEmails = JSON.parse(JSON.stringify(response)).map(
          (doc: userDb) => doc.email
        );
        const getAllUserId = JSON.parse(JSON.stringify(response)).map(
          (doc: userDb) => doc.userId
        );
        const getAllDocId = JSON.parse(JSON.stringify(onlyDocId)).map(
          (doc: getDocId) => doc.id
        );

        console.log(onlyDocId);
        console.log(getAllDocId);

        for (let i = 0; i < getAllEmails.length; i++) {
          if (
            getAllEmails[i] === email &&
            getAllUserId[i] === auth.currentUser?.uid
          ) {
            let UserDocId = getAllDocId[i];

            const docRef = doc(db, "userDb", UserDocId);

            await updateDoc(docRef, { password, UserDocId });

            console.log(UserDocId);
          }
        }
        ///////////////////////////////////////////////////// update role from guest to user
        const cartInStorage = localStorage.getItem("cartID");
        if (auth.currentUser !== null && cartInStorage !== null) {
          const responseUpdateCartRole = await fetch(
            "http://localhost:3000/routes/carts/" + cartInStorage,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                role: "user",
                userID: auth.currentUser?.uid,
              }),
            }
          );
          const data = await responseUpdateCartRole.json();
          console.log(data);
          //window.location.reload();
          console.log(responseUpdateCartRole.ok);

          if (!responseUpdateCartRole.ok) {
            throw Error("could not complete the action");
          }
        }
        /////////////////////////////////////////////////////
        return navigate("/emailverification");
      } else {
        console.log("email already exists");
        console.log(
          auth.currentUser?.emailVerified + " " + "email verified status"
        );
        return navigate("/emailinuse");
      }
    }
  };

  return (
    <div className="from-yellow-0 to-orange-0 relative mx-auto mt-20 h-full w-full max-w-screen-2xl bg-gradient-to-tr bg-cover bg-center p-6 sm:mt-28 md:mt-28 lg:mt-28">
      <div className="relative">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2FIMG-20230126-WA0008-sar2.jpg?alt=media&token=41792fd1-fb1c-4acf-b3c8-6e883aa0dad7"
          className=" absolute h-full w-full object-cover mix-blend-overlay"
        />
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0 ">
          <div className="to-amber-0 relative w-full rounded-lg border-4 border-amber-800 bg-gradient-to-tr from-amber-500 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                יצירת משתמש חדש
              </h1>
              {error ? (
                <p className="text-lg font-medium text-rose-600">{error}</p>
              ) : null}
              <form
                onSubmit={handleSubmitRegisterForm}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="fullname"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name
                  </label>
                  <input
                    onChange={(event) => setDisplayName(event.target.value)}
                    value={displayName}
                    type="fullname"
                    name="fullname"
                    id="fullname"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="fullname"
                    //required
                  />
                  {dispalyError ? (
                    <p className="font-medium text-red-700">{dispalyError}</p>
                  ) : null}
                </div>
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
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    placeholder="name@company.com"
                    // required
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
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    //required
                  />
                  {passwordError ? (
                    <p className="font-medium text-red-700">{passwordError}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    onChange={(event) => setConfirm(event.target.value)}
                    value={confirm}
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    //  required
                  />
                  {confirmError ? (
                    <p className="font-medium text-red-700">{confirmError}</p>
                  ) : null}
                </div>
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
                    <div className=" ml-2 mr-2 flex">
                      {checkedError ? (
                        <p className="text-xs font-medium text-red-700">
                          {checkedError}
                        </p>
                      ) : null}
                    </div>
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
