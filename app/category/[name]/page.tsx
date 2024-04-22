"use client";

import ProductCard from "@/components/ProductCard";
import { offlineProducts } from "@/lib/all-products-data";

type Props = {
  params: {
    name: string;
  };
};

function Category({ params }: Props) {
  const filteredCategoryProducts = offlineProducts.filter(
    (products) =>
      products.category.name.toLowerCase() == params.name.toLowerCase()
  );
  console.log(params.name.toLowerCase());
  console.log(filteredCategoryProducts);
  return (
    <main className="w-full py-10 mx-auto">
      <h3 className="w-full text-2xl uppercase text-dark dark:text-gray-100 tracking-wider font-bold text-center">
        {params.name}
      </h3>

      <div className="w-full grid mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-md gap-5 p-5 mt-5 place-items-center">
        {filteredCategoryProducts.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </main>
  );
}

export default Category;
