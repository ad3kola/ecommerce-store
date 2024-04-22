"use client";

import { AppDispatch, useAppSelector } from "@/redux/store";

import { Button } from "./ui/button";

import Image from "next/image";

import EmptyShoppingBag from "@/public/assets/EmptyShoppingBag.png";

import CartProduct from "@/components/CartProduct";

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDispatch } from "react-redux";

import {
  increaseProductQTY,
  decreaseProductQTY,
  clearCart,
  removeProductFromCart,
} from "@/redux/features/CartSlice";

import { CartProductProps } from "@/lib/typings";

import { loadStripe } from "@stripe/stripe-js";

import { useToast } from "./ui/use-toast";

import { MouseEvent, useState } from "react";

import axios from "axios";

import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function Cart() {
  const cartProducts = useAppSelector(
    (state) => state.CartSlice.value.cartproducts
  );

  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const { data: session } = useSession();

  const pricesArray = cartProducts.map(
    (product) => product.price * product.itemQty
  );

  const proceedToCheckout = async () => {
    setLoading(true);
    try {
      await axios
        .post("/api/checkout", {
          cartItems: cartProducts,
          email: session?.user?.email!,
        })
        .then((response) => {
          router.replace(response.data.url);
        });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error redirecting for payment",
        description: "Must be a network/server error, pls try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = pricesArray.reduce((a, b) => a + b, 0);

  const removeFromCart = (product: CartProductProps) => {
    if (product.itemQty <= 1) {
      dispatch(removeProductFromCart(product));
      toast({
        title: "Product Removed From Cart",
      });
    } else {
      dispatch(decreaseProductQTY(product));
      toast({
        title: "Product Quantity Decreased",
        description: `${product.title}`,
      });
    }
  };

  const addToCart = (product: CartProductProps) => {
    dispatch(increaseProductQTY(product));
    toast({
      title: "Product Quantity Decreased",
      description: `${product.title}`,
    });
  };

  return (
    <div className="h-full scrollbar-hide overflow-y-scroll">
      {cartProducts.length > 0 ? (
        <div className="relative w-full flex flex-col py-3">
          <Table className="mt-5 px-5">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>QTY</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartProducts.map((product) => (
                <TableRow key={product.id} className="relative">
                  <TableCell className="w-[100px]">
                    <div className="relative w-full h-[72px]">
                      <Image
                        src={product.image}
                        alt="product-img"
                        fill
                        className="rounded-md object-fit"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="pt-8 align-middle text-[12px] line-clamp-3 sm:text-sm md:text-base pr-5">
                    {product.title}
                  </TableCell>
                  <TableCell className="text-dark dark:text-gray-200">
                    <div className="text-center w-full h-full grid grid-cols-1 gap-2">
                      <button
                        onClick={(e: MouseEvent<HTMLButtonElement>) =>
                          removeFromCart(product)
                        }
                        className="p-1 cursor-pointer hover:text-gray-200 hover:bg-gray-800 duration-200 transition ease-in-out max-w-fit mx-auto rounded-sm flex items-center justify-center border border-gray-700"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      {product.itemQty}
                      <button
                        onClick={(e: MouseEvent<HTMLButtonElement>) =>
                          addToCart(product)
                        }
                        className="p-1 cursor-pointer hover:text-gray-200 hover:bg-gray-800 duration-200 transition ease-in-out max-w-fit mx-auto rounded-sm flex items-center justify-center border border-gray-700"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold tracking-wider">
                    ${product.price * product.itemQty}
                  </TableCell>
                  <TrashIcon
                    onClick={() => dispatch(removeProductFromCart(product))}
                    className="absolute w-4 h-4 cursor-pointer opacity-80 duration-200 transition ease-in-out transform hover:scale-[1.02] hover:opacity-100 bottom-2 right-2"
                  />
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right font-bold text-lg tracking-wider">
                  ${totalPrice}
                </TableCell>
              </TableRow>
            </TableFooter>
            <TableCaption>A list of your cart pending orders.</TableCaption>
          </Table>
          <Button
            onClick={proceedToCheckout}
            role="link"
            className="mt-3 w-full bg-dark p-6 text-gray-200 dark:bg-gray-200 dark:text-dark"
            variant="outline"
          >
            {loading ? ` Redirecting...` : "Proceed to Checkout"}
          </Button>
        </div>
      ) : (
        <div className="mt-20 w-full flex flex-col overflow-hidden items-center justify-center">
          <div className="relative flex items-center justify-center flex-col w-full h-72">
            <Image
              src={EmptyShoppingBag}
              alt="cart-is-empty-image"
              className="object-contain"
              fill
            />
          </div>
          <p className="text-xl mt-3 text-center font-semibold dark:text-gray-100 text-dark">
            Looks like your cart is empty!!!
          </p>
        </div>
      )}
    </div>
  );
}

export default Cart;
