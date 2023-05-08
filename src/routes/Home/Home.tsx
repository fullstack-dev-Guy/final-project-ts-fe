import { Hero } from "../../components/sections/Hero";
import MyCarousel from "../../components/sections/Hero/Carousel";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto h-5/6 w-5/6">
        <MyCarousel />
      </div>
    </>
  );
}
