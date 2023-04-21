import { Link } from "react-router-dom";

export default function Coupons() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6">
          <div className="mx-auto mb-6 max-w-screen-sm text-center lg:mb-6">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
              הטבות ללקוחות שרקפה
            </h2>
            <p className="font-light text-gray-900 dark:text-gray-400 sm:text-xl">
              אצלנו כרטיסיית ניקובים , בניקוב העשירי איזה כייף יש הטבה
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

          <div className=" flex flex-wrap justify-center p-3">
            <div className="m-2 max-w-sm  rounded-lg border border-gray-200 bg-white p-3 shadow dark:border-gray-700 dark:bg-gray-800">
              <img
                className="rounded-t-lg"
                src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2Fimg-20230209-wa0000.jpg?alt=media&token=afa2aa8c-4c6c-424b-8776-7d229cdb8bec"
                alt="10 time ticket"
              />

              <div className="p-5">
                <p className="mb-3 text-center font-normal text-gray-700 dark:text-gray-400">
                  הטבת כרטיסיית ניקובים , כל 10 ניקובים יש הטבה. איזו הטבה אני
                  מקבל ? תלוי בסוג הכרטיסייה
                </p>
              </div>
            </div>
            <div className="m-2 max-w-sm rounded-lg border border-gray-200 bg-white p-3 shadow dark:border-gray-700 dark:bg-gray-800">
              <img
                className="rounded-t-lg"
                src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2Fimg-20230209-wa0001.jpg?alt=media&token=d17434ee-4676-4428-a996-d4edc27a7b1c"
                alt="10 time ticket"
              />

              <div className="p-5">
                <p className="mb-3 text-center font-normal text-gray-700 dark:text-gray-400">
                  בכרטיסייה זו , בניקוב העשירי מקבלים קפה
                </p>
              </div>
            </div>
            <div className="m-2 max-w-sm rounded-lg border border-gray-200 bg-white p-3 shadow dark:border-gray-700 dark:bg-gray-800">
              <img
                className="rounded-t-lg"
                src="https://firebasestorage.googleapis.com/v0/b/final-project-coffee-trailer.appspot.com/o/images%2Fimg-20230209-wa0002.jpg?alt=media&token=018491d5-5b38-4c6e-95f7-35f967ca6d6c"
                alt="10 time ticket"
              />

              <div className="p-5">
                <p className="mb-3 text-center font-normal text-gray-700 dark:text-gray-400">
                  בכרטיסייה זו , בניקוב העשירי מקבלים שוקו
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
