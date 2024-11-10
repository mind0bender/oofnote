"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

export default function AdminNavbar(): JSX.Element {
  const activePath: string = usePathname();
  return (
    <nav
      className={`w-full px-4 py-2 rounded-lg bg-stone-900 border-b-stone-700`}>
      <h2>Admin Panel</h2>
      <ul className={`flex divide-x divide-stone-500`}>
        <li>
          <Link
            className={`border-b-stone-50 px-2 py-3 ${
              activePath.startsWith("/admin/dashboard")
                ? `border-b-4`
                : `border-b-0 text-stone-300`
            }`}
            href="/admin/dashboard">
            <Button data-tertiary>Dashboard</Button>
          </Link>
        </li>
        <li>
          <Link
            className={`border-b-stone-50 px-2 py-3 ${
              activePath.startsWith("/admin/monitor")
                ? `border-b-4`
                : `border-b-0 text-stone-300`
            }`}
            href="/admin/monitor">
            <Button data-tertiary>Monitor</Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
