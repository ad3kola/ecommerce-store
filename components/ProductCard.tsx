"use client";

import { ProductProps } from "@/lib/typings";

import { BellRing, Check } from "lucide-react";

import { ShoppingBagIcon } from "@heroicons/react/24/solid";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  addProductToCart,
  removeProductFromCart,
} from "@/redux/features/CartSlice";
import { useToast } from "./ui/use-toast";
import { useSession } from "next-auth/react";

type CardProps = React.ComponentProps<typeof Card>;

function ProductCard({ product }: { product: ProductProps }) {
  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const [qty, setQty] = useState<number>(1);

  const { data: session } = useSession();

  const addToCart = () => {
    dispatch(addProductToCart(product));
    toast({
      title: "Product Added to Cart",
      description: `${product.title}`,
    });
  };

  return (
    <Card className="max-w-[420px] w-full group cursor-pointer">
      <CardContent className="grid gap-4 pt-">
        <div className="w-full flex flex-col">
          <div className="relative w-full h-72">
            <Image
              src={product?.image}
              alt="product-img"
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </CardContent>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product?.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product?.description}
        </CardDescription>
      </CardHeader>
      {session && (
        <CardFooter>
          <div className="flex w-full space-x-4 items-center justify-between">
            <h3 className="text-sm tracking-wider font-medium">
              From{" "}
              <span className="text-base font-bold tracking-widest">
                ${product?.price}
              </span>
            </h3>{" "}
            <Button
              onClick={addToCart}
              className="w-fit rounded-full bg-transparent group-hover:bg-yellow-600 text-yellow-600 group-hover:text-gray-100 text-[13px] duration-200 ease-in group-hover:scale-105 transform"
            >
              Buy
              <ShoppingBagIcon className="ml-2 h-4 w-4" />
            </Button>
            <div className="absolute bg-gray-200 right-0 top-0 700 w-fit ml-auto tracking-wide rounded-tr-xl rounded-bl-lg px-3 py-0.5 uppercase text-dark text-[11px] font-semibold">
              {product?.category?.name}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export default ProductCard;
