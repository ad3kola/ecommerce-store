"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { shoesData } from "@/lib/all-shoes-data";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/redux/features/CartSlice";
import { ProductProps } from "@/lib/typings";

function ProductsCarousel() {
  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const [qty, setQty] = useState<number>(1);

  const addToCart = (product: ProductProps) => {
    dispatch(addProductToCart(product));
    toast({
      title: "Product Added to Cart",
      description: `${product.title}`,
    });
  };
  const allShoes = shoesData;
  return (
    <section className="pb-14 p-5 flex flex-col w-full space-y-8">
      <h2 className="text-xl dark:text-gray-200 font-bold uppercase tracking-wider px-10 text-center md:text-left text-dark">
        Black Friday Sales: Discount Offers
      </h2>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full px-1.5 max-w-[1360px] mx-auto"
      >
        <CarouselContent className="-ml-6">
          {allShoes.slice(0, 20).map((product) => (
            <CarouselItem
              key={product.id}
              className="sm:basis-1/2 lg:basis-1/3 group cursor-pointer"
            >
              <div className="relative max-w-full sm:h-[260px] h-[200px]">
                <Button
                  onClick={() => addToCart(product)}
                  className="w-fit rounded-full absolute top-3 left-3 z-20 bg-yellow-600 text-gray-100 dark:bg-transparent group-hover:dark:bg-yellow-600 dark:text-yellow-600 group-hover:text-gray-100 text-[13px] duration-200 ease-in group-hover:scale-105 transform"
                >
                  Buy
                  <ShoppingBagIcon className="ml-2 h-4 w-4" />
                </Button>
                <Image
                  src={product.image}
                  alt="product-image"
                  fill
                  className="object-fit object-center rounded-lg z-10"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export default ProductsCarousel;
