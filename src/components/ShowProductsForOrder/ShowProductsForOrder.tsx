import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { CartArchives, MyFetchResponse, Product } from "../../types/firestore";

export default function ShowProductsForOrder() {
  const navigate = useNavigate();
  const { id } = useParams();

  let currentId: string = id!;

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const allCartArchives = useLoaderData() as MyFetchResponse<CartArchives[]>; //data1

  var arryForGettingAllCartsArchives = JSON.parse(
    JSON.stringify(allCartArchives.data1)
  ).map((x: CartArchives) => x);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  let getTheCartArchivesId = arryForGettingAllCartsArchives.filter(
    (x: CartArchives) => x.id === currentId
  );

  let temp: CartArchives = getTheCartArchivesId[0];
  let getTheOrderProduct = temp.products[0];

  let getOrderProductObject = JSON.parse(getTheOrderProduct);

  return (
    <div className="fixed top-32 z-10  max-w-screen-sm rounded border-4  border-green-700   bg-white  p-6  ">
      <div className="mx-auto  border  text-center">
        <span>:המוצרים להזמנה זו</span>
        <div>
          <button
            onClick={() => navigate("/ordermanagement")}
            className="mr-2 rounded border-4 border-red-900 bg-red-100 px-2.5 py-0.5 text-2xl font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
          >
            סגור
          </button>
          <table className=" text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-center text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  כמות
                </th>
                <th scope="col" className="px-4 py-3"></th>
                <th scope="col" className="px-4 py-3">
                  שם
                </th>
              </tr>
            </thead>

            <tbody>
              {getOrderProductObject ? (
                getOrderProductObject.map((x: Product) => (
                  <tr
                    key={x.id}
                    className="border-b text-center dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-white"
                    >
                      {x.quantity}
                    </th>
                    <td className="px-4 py-3">X</td>
                    <td className="px-4 py-3">{x.productname}</td>
                    <td className="px-4 py-3">
                      {" "}
                      <img
                        src={x.imageToProduct}
                        alt="iMac Front Image"
                        className="mr-3 h-14 w-auto "
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
