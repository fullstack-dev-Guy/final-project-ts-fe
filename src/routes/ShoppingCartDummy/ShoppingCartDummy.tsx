export default function ShoppingCartDummy() {
  return (
    <div>
      <section className="bg-gray-50 py-3 dark:bg-gray-900 sm:py-5">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col space-y-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex flex-1 items-center space-x-4">
                <h5>
                  <span className="mx-2 text-gray-500">מספר המוצרים:</span>
                  <span className="dark:text-white">אין פריטים בסל</span>
                </h5>
                <h5>
                  <span className="mx-2 text-gray-500">מחיר לתשלום:</span>
                  <span className="dark:text-white">{0}</span>
                </h5>
              </div>
              <div className="flex flex-shrink-0 flex-col space-y-3 md:flex-row md:items-center md:space-y-0 md:space-x-3 lg:justify-end"></div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="p-4 text-center">
                      מק"ט
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      תמונה
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      שם המוצר
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      קטגוריה
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      מחיר ש"ח
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      הנחה
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      כמות
                    </th>
                    <th scope="col" className="px-4 py-3 text-center">
                      הסרה
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="mb-10 flex justify-center text-center text-5xl">
                <span>סל הקניות ריק</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
