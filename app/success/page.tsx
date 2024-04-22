"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import {
  CheckBadgeIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { BadgeCheckIcon } from "lucide-react";
import Link from "next/link";

function Success() {
  useEffect(() => {
    // confetti animation code
    const duration = 18 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }
    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full h-full py-24">
      <div className="rounded-md p-6 max-w-lg mx-auto flex flex-col items-center justify-center space-y-5">
        <BadgeCheckIcon className="h-28 w-28 text-green-500" />
        <h3 className="text-2xl font-bold tracking-wider text-center flex flex-col items-center justify-center">
            Payment Successful :D
          <span className='block mt-1'>Thanks for your shopping at Adekola's E-Commerce Store</span>
        </h3>
        <Link href="/">
          <Button className="font-semibold py-6">
            Return to E-Commerce Dashboard{" "}
            <ArrowRightCircleIcon className="h-7 w-7 ml-3 animate-bounce" />
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default Success;
