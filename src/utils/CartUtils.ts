import { redirect, useParams } from "react-router-dom";

const { id } = useParams();

console.log({ id });

let currentId: string = id!;

export async function removeOneProducrFromCart(
  currentId: string,
  arry: string[]
) {
  try {
    const responseUpdateCartproducts = await fetch(
      "http://localhost:3000/routes/carts/" + currentId,
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
    console.log(responseUpdateCartproducts.ok + "DELETPRODUCT");
    console.log(data);

    if (!responseUpdateCartproducts.ok) {
      throw Error("could not complete the action");
    }
    return redirect("/shoppingcart");
  } catch (error) {
    console.error(error);
    return { status: "error", data: null, message: (error as Error).message };
  }
}
