import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  setPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  signInWithRedirect,
} from "firebase/auth";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  User,
  deleteUser,
  getAuth,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { Cart, getDocId, Role, userDb } from "../types/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";
import { redirect, useNavigate } from "react-router-dom";

interface AuthResponse {
  ok: boolean;
}

interface AuthContextType {
  user: User | null | false;
  handleSignUpUser: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<AuthResponse>;
  handleSignInUser: (email: string, password: string) => Promise<AuthResponse>;
  handleUserForgotPassword: (email: string) => Promise<void>;
  handleSignOutUser: () => Promise<void>;
  handleSigInWithGoogle: () => Promise<void>;
  handleUserAccountDelete: () => Promise<void>;
}

interface AuthProviderProps extends PropsWithChildren {}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const provider = new GoogleAuthProvider();

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | false>(null);

  const handleSignUpUser = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);

      if (!user) {
        throw Error("Could not create new user");
      }
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName });
        await sendEmailVerification(auth.currentUser);
      }
      //////////////////////////////////////

      const response1 = await fetch("http://localhost:3000/routes/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName,
          hash: "",
          role: "user",
          email: email,
          orders: [],
          firebaseUserID: auth.currentUser?.uid,
        }),
      });
      console.log(response1.ok);
      //window.location.reload();

      if (!response1.ok) {
        throw Error("could not complete the action");
      }

      ///////////////////////////////////////
      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false };
    }
  };
  const handleSignInUser = async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const authPersistence = getAuth();
      setPersistence(authPersistence, browserSessionPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.

          return signInWithEmailAndPassword(
            authPersistence,
            "email",
            "password"
          );
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });

      const user = await signInWithEmailAndPassword(auth, email, password);
      if (!user) {
        throw Error("Could not sign in user");
      }

      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false };
    }
  };

  const handleUserForgotPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOutUser = async () => {
    //////////////////////////////////////////////////// localstorage clear

    localStorage.removeItem("cartID");
    ////////////////////////////////////////////////////

    try {
      await signOut(auth);

      redirect("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSigInWithGoogle = async () => {
    try {
      const collectionRef1 = collection(db, "userDb");
      const querySnapshot1 = await getDocs(collectionRef1);
      const docs1 = querySnapshot1.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const onlyDocId1 = querySnapshot1.docs.map((doc) => ({
        id: doc.id,
      }));
      const getAllDocId1 = JSON.parse(JSON.stringify(onlyDocId1)).map(
        (doc: getDocId) => doc.id
      );
      console.log("getAllDocId1 ");
      console.log(getAllDocId1);
      /////////////////////////////////

      ///////////////////////////////////
      await signInWithPopup(auth, provider);
      console.log(auth.currentUser?.email);

      // שמירת משתמש בקולקשיין של userDb
      const salt = Math.floor(Math.random() * 1000000000) + "Aa";
      const collectionRef = collection(db, "userDb");
      const docRef = await addDoc(collectionRef, {
        email: auth.currentUser?.email,
        password: salt,
        displayName: auth.currentUser?.displayName,
        userId: auth.currentUser?.uid,
        UserDocId: " UserDocId",
        role: "user ",
      });

      ///////////////////////////////////////////////////// enter doc id to userDB collection
      const collectionRef2 = collection(db, "userDb");
      const querySnapshot2 = await getDocs(collectionRef2);
      const docs2 = querySnapshot2.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const onlyDocId2 = querySnapshot2.docs.map((doc) => ({
        id: doc.id,
      }));
      const getAllDocId2 = JSON.parse(JSON.stringify(onlyDocId2)).map(
        (doc: getDocId) => doc.id
      );

      const getAllUserId = JSON.parse(JSON.stringify(docs2)).map(
        (doc: userDb) => doc.userId
      );

      const getAllUserEmail = JSON.parse(JSON.stringify(docs2)).map(
        (doc: userDb) => doc.email
      );

      console.log("getAllDocId2");
      console.log(getAllDocId2);
      console.log("getAllUserEmail");
      console.log(getAllUserEmail);

      let UserDocId: string = getAllDocId2.filter(
        (x: number) => !getAllDocId1.includes(x)
      );
      console.log("UserDocId");
      console.log(UserDocId);
      //בליחצה נוספת על התחברות עם גוגל נוצר משתמש חדש - אם נוצר משתמש חדש הוא יהיה עם  אימייל שכבר נוצר בהתחברות הראשונה ולכן נבדוק אם הוא קיים במערך של אימיילים ואם קיים נמחוק אותו לפי איי די חדש שנוצר
      const emailArryResult = getAllUserEmail.includes(auth.currentUser?.email);
      let emailCounter = 0;
      for (let j = 0; j < getAllUserEmail.length; j++) {
        if (getAllUserEmail[j] === auth.currentUser?.email) {
          emailCounter++;
          console.log(emailCounter);
        }

        if (emailCounter === 2) {
          let UserDocIdtoDelete: string = getAllDocId2.filter(
            (x: number) => !getAllDocId1.includes(x)
          );

          await deleteDoc(doc(db, "userDb", UserDocIdtoDelete[0]));
          console.log("emailArryResult-includes");
          console.log(emailArryResult);
          console.log("UserDocIdtoDelete");
          console.log(UserDocIdtoDelete[0]);
        }
      }
      try {
        for (let i = 0; i < getAllUserId.length; i++) {
          if (getAllUserId[i] === auth.currentUser?.uid) {
            let UserDocId = getAllDocId2[i];

            const docRef = doc(db, "userDb", UserDocId);

            await updateDoc(docRef, { UserDocId });

            console.log(UserDocId);
          }
        }
      } catch (error) {
        console.error(error);
      }

      /////////////////////////////////////////////////////
      ///////////////////////////////////////////////////
      if (auth) {
        const getAllCarts1 = await fetch("http://localhost:3000/routes/carts"); //GET
        const dataGetAllCarts1 = await getAllCarts1.json();
        console.log(getAllCarts1.ok);

        if (!getAllCarts1.ok) {
          throw Error("could not fetch the data");
        }

        const getAlluserIDfromCart = JSON.parse(
          JSON.stringify(dataGetAllCarts1)
        ).map((doc: Cart) => doc.userID);
        const getAllcartID = JSON.parse(JSON.stringify(dataGetAllCarts1)).map(
          (doc: Cart) => doc.id
        );
        console.log("getAlluserID");
        console.log(getAlluserIDfromCart);
        for (let i = 0; i < getAllcartID.length; i++) {
          if (
            auth.currentUser?.uid === getAlluserIDfromCart[i] &&
            getAlluserIDfromCart[i] !== " "
          ) {
            var cartBelongToCurrentUser = getAllcartID[i];
            const guestCart = localStorage.getItem("cartID");

            const responseDeleteCart = await fetch(
              "http://localhost:3000/routes/carts/" + guestCart,
              {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
              }
            );

            if (!responseDeleteCart.ok) {
              throw Error("could not fetch the data");
            } else {
              localStorage.removeItem("cartID");
              localStorage.setItem("cartID", cartBelongToCurrentUser);
            }
          } else {
            console.log("user does not have any cart ");
          }
        }
        window.location.reload();
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
              userID: auth.currentUser.uid,
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
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserAccountDelete = async () => {
    try {
      if (auth.currentUser) {
        await deleteUser(auth.currentUser);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const values = {
    user,
    handleSignUpUser,
    handleSignInUser,
    handleUserForgotPassword,
    handleSignOutUser,
    handleSigInWithGoogle,
    handleUserAccountDelete,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
