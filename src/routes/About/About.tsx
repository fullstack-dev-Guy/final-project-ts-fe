import { Link } from "react-router-dom";

export default function About() {
  return (
    <html dir="rtl" lang="he">
      <head>
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Frank+Ruhl+Libre&display=swap"
        />
      </head>
      <div className="mt-44">
        <div>
          <section className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
              <div className="mx-auto mb-6 max-w-screen-sm text-center lg:mb-6">
                <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
                  אודות שרקפה
                </h2>
                <p className="font-light text-gray-500 dark:text-gray-400 sm:text-xl">
                  עגלת שרקפה הוקמה בשנת 2022 במושב מאור למען קהילת חובבי הקפה
                  המשובח ומחפשי הפינה השקטה כדי לקחת נשימה ולהרגע ממרוץ החיים.
                  האתר עצמו הוא בעצם פרוייקט משולב המשלב שיתוף פעולה בין שרקפה
                  לבין פרוייקט גמר בקורס FULL-STACK. בפרוייקט עצמו נדרשו
                  מאפיינים מסויימים עבור האתר לדוגמא דף המוצרים שלנו או דף צור
                  קשר וכ"ד .... שיתוף הפעולה איפשר בעצם הכנסה והצגה של מוצרים
                  שבאמת נמכרים בעגלה ולדמות ביצוע הזמנה או אפילו להירשם כמשתמש
                  ולהיות חבר שיכול להנות מהטבות . האתר מאפשר ללקוחות רשומים
                  לרשום בלוג או לרשום סתם על חווית העצירה בשרקפה , ובנוסף מאפשר
                  גם לערוך או למחוק אותו. אנחנו מאוד מקווים שתהנו מהחוויה הפיזית
                  במקום אצלנו וגם מהחוויה האינטרנטית. בכל בעיה ניתן ליצור קשר
                  ונשתדל לענות במהרה. נשמח לראותכם אצלנו בעגלה. בברכה שרקפה
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

              <div className="flex-auto"></div>
            </div>
          </section>
        </div>
      </div>
    </html>
  );
}
