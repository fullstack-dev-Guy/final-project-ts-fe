import { Outlet } from "react-router-dom";
import { Footer } from "../components/common/Footer";
import { Header } from "../components/common/Header";

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
