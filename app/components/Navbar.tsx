"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

function Navbar(): JSX.Element {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect((): (() => void) => {
    const handleScroll: () => void = (): void => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`sticky top-0 bg-stone-900 bg-opacity-85 backdrop-blur-sm flex justify-between items-center ${
        scrollY ? "py-3" : "py-5"
      } px-6 sm:px-8 border-b border-b-stone-700 duration-200`}>
      <Link href={`/`} className={`text-lg`}>
        OofNote
      </Link>
      <ul className={`flex justify-center items-center sm:gap-4 gap-2`}>
        <li>
          <Link
            className={`hover:underline underline-offset-2 outline-none focus:underline`}
            href="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`hover:underline underline-offset-2 outline-none focus:underline`}
            href="/about">
            About
          </Link>
        </li>
        <li>
          <Link
            className={`hover:underline underline-offset-2 outline-none focus:underline`}
            href="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
