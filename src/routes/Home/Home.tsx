import { useEffect } from "react";
import { Hero } from "../../components/sections/Hero";
import MyCarousel from "../../components/sections/Hero/Carousel";

export default function Home() {
  return (
    <>
      <Hero />
      <MyCarousel />
    </>
  );
}
