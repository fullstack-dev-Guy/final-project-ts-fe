import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { emailjsObject } from "../../lib/mailjs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { auth } from "../../lib/firebase";

export default function ContactForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [firstname1, setFirstname1] = useState("");
  const [lastname1, setLastname1] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  const [otherrequest1, setOtherrequest1] = useState("");

  const [emailError, setEmailError] = useState("");
  const [firstname1Error, setFirstname1Error] = useState("");
  const [lastname1Error, setLastname1Error] = useState("");
  const [phone1Error, setPhone1Error] = useState("");
  const [otherrequest1Error, setOtherrequest1Error] = useState("");
  const form = useRef();

  const handleSubmitContactForm = async (
    firstname1: string,
    lastname1: string,
    email1: string,
    phone1: string,
    otherrequest1: string
  ) => {
    const checkFirstname1 = (firstname1: string) => {
      if (firstname1 === "") {
        setFirstname1Error("חובה למלא שם פרטי");
        return false;
      } else {
        setFirstname1Error("");
        return true;
      }
    };

    const checkPhone1 = (phone1: string) => {
      if (phone1 === "") {
        setPhone1Error("חובה למלא מספר טלפון");
        return false;
      } else {
        setPhone1Error("");
        return true;
      }
    };

    const checkLastname1 = (lastname1: string) => {
      if (lastname1 === "") {
        setLastname1Error("חובה למלא שם משפחה");
        return false;
      } else {
        setLastname1Error("");
        return true;
      }
    };

    const checkOtherrequest1 = (otherrequest1: string) => {
      if (otherrequest1 === "") {
        setOtherrequest1Error("חובה למלא תוכן פנייה");
        return false;
      } else {
        setOtherrequest1Error("");
        return true;
      }
    };

    const checkEmail = (email: string) => {
      if (email === "") {
        setEmailError("Email is a required field");
        return false;
      }
      if (user && auth.currentUser?.email !== email) {
        setEmailError("זה לא האימייל שנרשמת איתו");
        return false;
      } else {
        setEmailError("");
        return true;
      }
    };
    const isOkEmail = checkEmail(email1);
    const isOkfirstname1 = checkFirstname1(firstname1);
    const isOklastname1 = checkLastname1(lastname1);
    const isOkphone1 = checkPhone1(phone1);
    const isOkotherrequest1 = checkOtherrequest1(otherrequest1);

    const newDate = new Date();
    const currentTime = newDate.toLocaleString("he-IL");
    if (
      isOkEmail === true &&
      isOkfirstname1 === true &&
      isOklastname1 === true &&
      isOkphone1 === true &&
      isOkotherrequest1 === true
    ) {
      var templateParams1 = {
        email1: email1,
        firstname: firstname1,
        lastname: lastname1,
        phonenumber: phone1,
        otherrequest1: otherrequest1,
        date: currentTime,
      };

      const service = emailjsObject.serviceId;
      const template = emailjsObject.templateId1;
      const publickey = emailjsObject.publiceKey;

      emailjs.send(service, template, templateParams1, publickey).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
      return navigate("/contactmassage");
    }
  };
  return (
    <html dir="rtl" lang="he">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre&display=swap"
        />
      </head>
      <div className="mx-auto mt-44  flex  justify-center  ">
        {user ? (
          <div className=" h-full w-full max-w-2xl p-4 md:h-auto">
            <div className="rounded-lg border-4 bg-white p-4 shadow dark:bg-gray-800 sm:p-5">
              <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4  dark:border-gray-600 sm:mb-5">
                <Link to="/">
                  <p className="text-end">X</p>
                </Link>
                <h3 className="mx-auto text-lg font-semibold text-gray-900 dark:text-white">
                  יצירת קשר
                </h3>
              </div>

              <form action="#">
                <div className="mb-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="mb-2 block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      שם פרטי
                    </label>
                    <input
                      onChange={(event) => setFirstname1(event.target.value)}
                      value={firstname1}
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="שם פרטי"
                    />
                    {firstname1Error ? (
                      <p className="text-center font-medium text-red-700">
                        {firstname1Error}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="lastname"
                      className="mb-2 block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      שם משפחה
                    </label>
                    <input
                      onChange={(event) => setLastname1(event.target.value)}
                      value={lastname1}
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="שם משפחה"
                    />
                    {lastname1Error ? (
                      <p className="text-center font-medium text-red-700">
                        {lastname1Error}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label
                      htmlFor="email1"
                      className="mb-2 block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      אימייל
                    </label>
                    <input
                      onChange={(event) => setEmail1(event.target.value)}
                      value={email1}
                      type="email1"
                      name="email1"
                      id="email"
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="אימייל"
                    />
                    {emailError ? (
                      <p className="text-center font-medium text-red-700">
                        {emailError}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="phonenumber"
                      className="mb-2 block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      מספר טלפון
                    </label>
                    <input
                      onChange={(event) => setPhone1(event.target.value)}
                      value={phone1}
                      type="text"
                      name="phonenumber"
                      id="phonenumber"
                      className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="מספר טלפון"
                    />
                    {phone1Error ? (
                      <p className="text-center font-medium text-red-700">
                        {phone1Error}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="otherrequest1"
                      className="mb-2 block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      תוכן ההודעה
                    </label>
                    <textarea
                      onChange={(event) => setOtherrequest1(event.target.value)}
                      value={otherrequest1}
                      id="otherrequest1"
                      rows={4}
                      name="otherrequest1"
                      className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5  text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                      placeholder="תוכן ההודעה"
                    ></textarea>
                    {otherrequest1Error ? (
                      <p className="text-center font-medium text-red-700">
                        {otherrequest1Error}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() =>
                      handleSubmitContactForm(
                        firstname1,
                        lastname1,
                        email1,
                        phone1,
                        otherrequest1
                      )
                    }
                    type="button"
                    className=" border-grey-600  text-black-600 focus:ring-grey-300 dark:border-grey-500 dark:text-grey-500 dark:hover:bg-grey-600 dark:focus:ring-grey-900 mt-2 rounded-lg border-4 p-2 text-center text-xl font-medium hover:bg-green-500 hover:text-white focus:outline-none focus:ring-4 dark:hover:text-white"
                  >
                    שליחת הודעה
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="mx-auto  max-w-screen-xl  sm:mt-10 md:mt-10 lg:mt-10 xl:mt-10">
            <section className=" bg-white dark:bg-gray-900">
              <div className="mx-auto max-w-screen-2xl py-2 px-2 lg:py-6 lg:px-6">
                <div className="mx-auto max-w-screen-lg text-center">
                  <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-red-600 dark:text-indigo-500 lg:text-6xl">
                    יצירת קשר רק למשתמשים רשומים
                  </h1>
                  <p className="mb-4 text-3xl font-bold tracking-tight text-gray-800 dark:text-white md:text-4xl">
                    כדי לשלוח הודעה דרך המערכת יש ליצור משתמש או להתחבר עם משתמש
                    קיים
                  </p>
                  <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                    ניתן לפנות אלינו באימייל או דרך הטלפון
                  </p>

                  <Link to="/" role="button">
                    <button className=" rounded-lg border border-gray-700 bg-yellow-200 p-2 text-base  font-semibold  text-violet-700 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-violet-300 active:bg-yellow-500 dark:border-gray-600  dark:bg-gray-800 dark:text-white dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                      חזרה לדף הבית
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </html>
  );
}
