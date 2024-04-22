"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { productCategories } from "@/lib/all-products-categories-data";
import Image from "next/image";
import Link from "next/link";

function ProductsGenres() {
  return (
    <section className='py-14 flex flex-col space-y-8'>
      <h2 className="text-xl dark:text-gray-200 font-bold uppercase tracking-wider px-10 text-center md:text-left text-dark">
        Choose a Product that matches your aesthetics
      </h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full px-1.5 max-w-[1360px] mx-auto"
        >
          <CarouselContent className="-ml-3">
            {productCategories.map((category) => (
              <CarouselItem
                key={category.id}
                className="basis-1/2 group md:basis-1/3 pl-3 lg:basis-1/4 group cursor-pointer"
              >
                <Link href={`category/${category.name.toLowerCase()}`}>
                  {" "}
                  <div className="relative w-full h-72">
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-gray-100 text-xl md:text-2xl uppercase font-bold tracking-wider z-20">{category.name}</p>
                    <Image
                      src={category.image}
                      alt="category-img"
                      fill
                      className="object-cover duration-200 transition ease-in-out group-hover:brightness-[8pag0%] z-10 rounded-md brightness-[50%]"
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
    </section>
  );
}

export default ProductsGenres;
