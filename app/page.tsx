import MainBanner from "@/components/MainBanner";
import ProductsCarousel from "@/components/ProductsCarousel";
import ProductsDisplay from "@/components/ProductsDisplay";
import ProductsGenres from "@/components/ProductsGenres"
import Image from "next/image";

export default async function Home() {
  return (
    <main suppressHydrationWarning className ='max-w-[1400px] mx-auto w-full'>
      <MainBanner />
      <ProductsDisplay />
      <ProductsCarousel />
      <ProductsGenres />
    </main>
  );
}