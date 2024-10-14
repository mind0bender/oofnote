import Link from "next/link";

function Navbar(): JSX.Element {
  return (
    <nav
      className={`sticky top-0 bg-black bg-opacity-85 backdrop-blur-sm flex justify-between items-center py-4 px-8 border-b border-b-stone-700`}>
      <Link href={`/`} className={`font-semibold text-lg`}>
        <span className={`font-black`}>Oof</span>
        <span className={`font-thin`}>Note</span>
      </Link>
      <ul className={`flex justify-center items-center gap-6`}>
        <li>
          <Link className={`hover:underline underline-offset-2`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={`hover:underline underline-offset-2`} href="/about">
            About
          </Link>
        </li>
        <li>
          <Link
            className={`hover:underline underline-offset-2`}
            href="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
