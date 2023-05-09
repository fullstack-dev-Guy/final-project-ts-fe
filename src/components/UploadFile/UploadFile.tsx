import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { storage } from "../../lib/firebase";

export default function UploadFile() {
  const navigate = useNavigate();
  const imageArry1: string[] = [];
  const imageArry2: string[] = [];

  const { id } = useParams();

  let currentId: string = id!;

  const [file, setFile] = useState<File | null>(null);

  async function handleFileUpload(event: FormEvent) {
    event.preventDefault();
    //////////////////////////////////////////////////
    const listRef = ref(storage, "images/");
    const result = await listAll(listRef);

    await Promise.all(
      result.items.map(async (image, index) => {
        const storageRef = ref(storage, image.fullPath);
        const url = await getDownloadURL(storageRef);
        imageArry2[index] = url;
        return url;
      })
    );

    //////////////////////////////////////////////////////////
    try {
      if (file) {
        const storageRef = ref(storage, "images/" + file.name);
        const arrayBuffer = await file.arrayBuffer();

        await uploadBytes(storageRef, arrayBuffer);
        ////////////////////////////////////////////////////////
        const listRef = ref(storage, "images/");
        const result = await listAll(listRef);

        await Promise.all(
          result.items.map(async (image, index) => {
            const storageRef = ref(storage, image.fullPath);
            const url = await getDownloadURL(storageRef);
            imageArry1[index] = url;
            return url;
          })
        );

        let difference = imageArry1.filter((x) => !imageArry2.includes(x));

        let productIDwithImage = difference[0];

        ////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////
        const handleEditProduct = async (
          currentId: string,
          productIDwithImage: string
        ) => {
          try {
            const response = await fetch(
              "https://final-project-ts-be-prisma-atlas.onrender.com/routes/products/" +
                currentId,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  imageToProduct: productIDwithImage,
                }),
              }
            );
            const data = await response.json();

            if (!response.ok) {
              throw Error("could not complete the action");
            }
            navigate("/allproducts");
          } catch (error) {
            console.error(error);
            return {
              status: "error",
              data: null,
              message: (error as Error).message,
            };
          }
          return navigate("/allproducts");
        };
        handleEditProduct(currentId, productIDwithImage);
        ////////////////////////////////////////////////////////
        navigate("/allproducts");
      }
      navigate("/allproducts");
    } catch (error) {
      console.error(error);
    }
    return navigate("/allproducts");
  }

  return (
    <div className=" fixed top-32 z-10 m-4 p-6 ">
      <div
        id="alert-additional-content-1"
        className="mb-4 rounded-lg border border-blue-300 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <div className="flex items-center justify-center">
          <span className="sr-only">Info</span>
          <h3 className=" text-lg font-medium">העלאת תמונה למוצר</h3>
        </div>

        <div className="mt-2 mb-4 text-sm">
          יש ללחוץ על לחצן בחירת קובץ , לאחר מכן לבחור את התמונה הרצויה ולבסוף
          ללחוץ על לחצן אישור
        </div>

        <div className="flex justify-center">
          <div className="flex justify-center">
            <form className=" " onSubmit={handleFileUpload}>
              <input
                className=" "
                onChange={(event) => setFile(event.target.files![0])}
                type="file"
                name="file-upload"
                id="file-upload"
              />

              <div className="mx-auto flex w-3/4 justify-center ">
                <button className="mx-auto mt-4 w-3/4 rounded-lg bg-blue-700 p-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  אישור
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-2 flex justify-center">
          <Link
            to="/allproducts"
            role="button"
            className="rounded-lg border border-red-800 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-red-800 hover:bg-red-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-600 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-800"
            data-dismiss-target="#alert-additional-content-2"
            aria-label="Close"
          >
            בטל פעולה
          </Link>
        </div>
      </div>
    </div>
  );
}
