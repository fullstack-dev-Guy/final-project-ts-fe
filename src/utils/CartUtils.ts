import { redirect, useParams } from "react-router-dom";

const { id } = useParams();

let currentId: string = id!;

export async function removeOneProducrFromCart(
  currentId: string,
  arry: string[]
) {
  try {
    const responseUpdateCartproducts = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/carts/" +
        currentId,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          products: {
            pop: [currentId],
          },
        }),
      }
    );
    const data = await responseUpdateCartproducts.json();

    window.location.reload();

    if (!responseUpdateCartproducts.ok) {
      throw Error("could not complete the action");
    }
    return redirect("/shoppingcart");
  } catch (error) {
    console.error(error);
    return { status: "error", data: null, message: (error as Error).message };
  }
}
