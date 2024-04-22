import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeletonCard() {
  return (
    <div className="max-w-[420px] w-full border p-2 border-gray-600 rounded-lg flex flex-col space-y-2">
      <div className="grid py-2 w-full">
        <Skeleton className="rounded-md w-full h-72" />
      </div>
      <div className="w-full flex items-center space-x-4 justify-between ">
        <Skeleton className="h-4 flex-1 rounded-full w-[200px]" />
        <Skeleton className="w-[70px] flex-shrink-0 h-4 rounded-full" />
      </div>
      <div className ='flex items-center flex-col w-full space-y-2'>
        <Skeleton className="h-3 w-[120px] ml-auto rounded-full" />
        <Skeleton className="w-full h-14 rounded-lg" />
    </div>
    </div>
  );
}

export default ProductSkeletonCard;
