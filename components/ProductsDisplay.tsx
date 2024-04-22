"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ProductProps } from "@/lib/typings";
import shuffleArray from "@/lib/shuffleData";
import ProductSkeletonCard from "./ProductSkeletonCard";
import { useAppSelector } from "@/redux/store";
import { offlineProducts } from "@/lib/all-products-data";

function ProductsDisplay() {
  const cartProducts = useAppSelector(
    (state) => state.CartSlice.value.cartproducts
  );
  const allProducts = offlineProducts;

  return (
    <section id='allProducts' className="w-full py-10 mx-auto">
      <h2 className="text-xl dark:text-gray-200 font-bold uppercase tracking-wider px-10 text-center md:text-left text-dark">
        Our Top-tier Products
      </h2>
      <div className="w-full grid mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-md gap-5 p-5 mt-5 place-items-center">
        {allProducts.slice(0, 9).map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductsDisplay;
