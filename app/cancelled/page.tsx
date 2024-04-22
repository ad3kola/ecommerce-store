import { Button } from "@/components/ui/button";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { CircleXIcon } from "lucide-react";
import Link from "next/link";

function Cancelled() {
  return (
    <main className="w-full h-full py-24">
      <div className="rounded-md p-6 max-w-lg mx-auto flex flex-col items-center justify-center space-y-5">
        <CircleXIcon className="h-28 w-28 text-red-500" />
        <h3 className="text-2xl font-bold tracking-wider">
          Oops!, Payment Unsuccessful
        </h3>
        <Link href="/">
          <Button className="font-semibold py-6">
            Return to E-Commerce Dashboard{" "}
            <ArrowRightCircleIcon className="h-7 w-7 ml-3 animate-bounce" />
          </Button>
        </Link>{" "}
      </div>
    </main>
  );
}

export default Cancelled;
