"use client";

import { signIn, useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Cart from "@/components/Cart";
import { AppDispatch, useAppSelector } from "@/redux/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { openCart } from "@/redux/features/CartModal";

function TopNav() {
  const { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  const cartProducts = useAppSelector(
    (state) => state.CartSlice.value.cartproducts
  );

  const cartState = useAppSelector((state) => state.cart.value.cartState);

  return (
    <nav className="sticky top-0 left-0 right-0 w-full z-50 flex bg-gray-100 dark:bg-darker dark:text-gray-100 flex-col">
      <div className="w-full flex items-center p-3 md:px-6 max-w-7xl mx-auto justify-between shadow-md">
        <Link href="/ ">
          <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider">
            E-COMMERCE
          </h3>
        </Link>
        <div className="flex items-center justify-center space-x-3">
          <ThemeToggle />
          {session ? (
            <div className="flex items-center justify-center space-x-3">
              <div
                onClick={() => dispatch(openCart())}
                className="relative flex"
              >
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <ShoppingCartIcon className="z-10 w-[1.5rem] h-[1.5rem]" />
                      <span className="absolute -top-1 -right-2 text-[9px] font-bold flex items-center justify-center bg-red-600 text-gray-100 z-20 rounded-full h-4 w-4">
                        {cartProducts?.length}
                      </span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent className ='md:w-fit h-full scrollbar-hide px-3 pb-10 md:px-5 w-full flex-1'>
                    <SheetHeader className='h-full mt-5'>
                      <SheetTitle>Your Cart</SheetTitle>
                       <Cart />
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src={session?.user?.image!} />
                    <AvatarFallback>{session?.user?.name!}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button onClick={() => signIn()}>Sign in</Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default TopNav;
