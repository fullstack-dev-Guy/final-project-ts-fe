import {
  Link,
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { MyFetchResponse, Product } from "../../types/firestore";

export default function ProductPage() {
  const product = useLoaderData() as MyFetchResponse<Product>;
  const { id } = useParams();

  console.log({ id });

  let currentId: string = id!;
  console.log(currentId);
  const navigate = useNavigate();
  return (
    <div className="mx-auto mt-12 max-w-screen-2xl">
      {product.data ? (
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto grid max-w-screen-xl p-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
            <div className="mx-auto place-self-center lg:col-span-7">
              <h1 className="mb-4 max-w-2xl text-center text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
                {product.data.productname}
              </h1>
              <h2 className="mb-4 max-w-2xl text-center  text-base font-normal leading-none tracking-tight dark:text-white md:text-2xl xl:text-3xl">
                {product.data.productcategory} : קטגוריה
              </h2>
              <div className="flex justify-center ">
                <p className="mr-2 flex self-center">ש"ח</p>
                <p className="flex max-w-2xl self-center text-center  text-base text-xl font-normal leading-none tracking-tight dark:text-white xl:text-2xl">
                  {product.data.productprice} : מחיר
                </p>
              </div>

              <p className="mb-6  max-w-2xl text-center font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
                {product.data.productDescription}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() =>
                    navigate(
                      "../allproducts/productpage/" +
                        currentId +
                        "/addtoshoppingcart/" +
                        currentId
                    )
                  }
                  className="m-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  הוסף לסל קניות
                </button>
                <Link
                  to="/allproducts"
                  role="button"
                  className="m-2 w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                >
                  חזרה לדף המוצרים
                </Link>
              </div>
            </div>
            <div className=" lg:col-span-5 lg:mt-0 lg:flex">
              <img src={product.data.imageToProduct} alt="product image" />
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </section>
      ) : null}
    </div>
  );
}

export async function ProductLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await fetch(
      "http://localhost:3000/routes/products/" + params.id
    );
    const data = await response.json();
    if (!response.ok) {
      throw Error("Could not fetch the data");
    }
    return { data, status: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: (error as Error).message, data: null };
  }
}
