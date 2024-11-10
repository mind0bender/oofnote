import Button from "@/app/components/Button";
import Link from "next/link";

export default async function MonitorPage(): Promise<JSX.Element> {
  return (
    <div className={`flex flex-col grow w-full`}>
      <ul>
        <li>
          <Link href="/admin/monitor/user">
            <Button data-tertiary>Users Collection</Button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
