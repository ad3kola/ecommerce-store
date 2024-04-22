
import Image from "next/image";

import { Button } from "./ui/button";

import Link from 'next/link'

function MainBanner() {
  return (
    <div className="p-3 lg:p-10 mt-5 grid grid-cols-1 lg:grid-cols-2 w-full gap-14 lg:gap-8">
      <div className="flex flex-col space-y-4 lg:space-y-6 items-center lg:items-start w-full h-full justify-center">
        <h3 className="text-center lg:text-left text-5xl/[60px] tracking-wider font-bold max-w-2xl">
          Welcome to My{" "}
          <span className="underline tracking-wide">
            Online Commerce Web Store
          </span>
        </h3>
        <h4 className="text-center lg:text-left text-lg lg:pr-10 max-w-lg">
          Shop for the best items in the market, from clothings and fashion
          aesthetics to the best appliances and devices in the tech world.{" "}
        </h4>
        <Link href='#allProducts'>
        <Button className="w-fit font-bold">Start Shopping &rarr;</Button>
        </Link>
      </div>
      <div className="w-[80%] h-96 relative mx-auto">
        <Image
          alt="banner"
          src={"/assets/ecommerce-banner-image.webp"}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default MainBanner;
