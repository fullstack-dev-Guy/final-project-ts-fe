import { useEffect } from "react";
import { Hero } from "../../components/sections/Hero";
import MyCarousel from "../../components/sections/Hero/Carousel";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto h-1/3 w-1/3">
        <MyCarousel />
      </div>
    </>
  );
}
