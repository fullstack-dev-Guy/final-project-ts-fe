import { useLoaderData } from "react-router-dom";
import { MyFetchResponse, Role, userDb } from "../../types/firestore";
import UserMenue from "../common/UserMenue/UserMenue";
import { auth } from "../../lib/firebase";

export default function Test1() {
  const users1 = useLoaderData() as MyFetchResponse<userDb[]>;

  let user2 = users1.data?.map((x: userDb) => x);

  let currentUserRole = user2!.filter(
    (x) => x.email === auth.currentUser?.email
  );

  return <div>test1</div>;
}

export async function userRoleLoader() {
  try {
    const response = await fetch(
      "https://final-project-ts-be-prisma-atlas.onrender.com/routes/users"
    );
    const data = await response.json();

    if (!response.ok) {
      throw Error("could not fetch the data");
    }
    return { data, status: "success" };
  } catch (error) {
    console.error(error);

    return { status: "error", message: (error as Error).message, data: null };
  }
}
