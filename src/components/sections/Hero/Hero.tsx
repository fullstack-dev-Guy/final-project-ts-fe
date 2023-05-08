import { Carousel } from "flowbite-react";

export default function Hero() {
  return (
    <div className="mx-auto mt-40 max-w-screen-2xl px-6 pt-6 pb-0  ">
      <div className="from-yellow-0 to-orange-0 relative h-full h-96 w-full bg-gradient-to-tr bg-cover bg-center">
        <div className="relative mx-auto h-full w-full max-w-screen-xl bg-cover bg-center py-8 px-4 text-center lg:py-16 lg:px-12">
          <h1 className="to-amber-0 relative mb-4 rounded-lg bg-gradient-to-r from-amber-100 text-4xl font-medium leading-none tracking-tight  text-yellow-800 dark:text-white md:text-5xl lg:text-6xl">
            עגלת קפה במושב מאור, מזמינים אתכם לחוות איכות
          </h1>
          <p className="md:mt-18 text-black-600 dark:text-black-600 to-amber-0 relative mt-8 mb-8 rounded-lg bg-gradient-to-l from-amber-100 text-lg font-normal sm:mt-20 sm:px-16 lg:mt-8 lg:text-xl xl:mt-12 xl:px-48 2xl:mt-12">
            מקום מושלם לקחת הפסקה ולהתרענן ,שרקפה מזמינים אתכם לבוא ולהתארח
            במקום שקט ,מוצל ושלב בחורשת האקליפטוסים שבמושב ולטעום ממגוון רחב של
            מטעמים
          </p>
        </div>
      </div>
    </div>
  );
}
