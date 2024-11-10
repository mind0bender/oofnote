import Image from "next/image";
import { UserInterface } from "../database/models/user/user";
import moment from "moment";
import { PersonRounded, SupervisorAccountRounded } from "@mui/icons-material";
import Link from "next/link";

interface UserMonitorCardProps {
  user: Pick<
    UserInterface,
    "email" | "role" | "displayPicture" | "username" | "bornAt" | "lastAwaken"
  >;
}

export default function UserMonitorCard({
  user: { displayPicture, bornAt, email, role, lastAwaken, username },
}: UserMonitorCardProps): JSX.Element {
  return (
    <Link
      href={`./user/${username}`}
      className={`group flex flex-col justify-center items-center gap-3 border border-stone-700 hover:border-stone-500 bg-stone-950 hover:bg-stone-900 px-4 py-3 rounded-md duration-100`}>
      <div className={`flex justify-center items-center`}>
        <div className={`relative aspect-square`}>
          <Image
            src={displayPicture}
            width={100}
            height={100}
            unoptimized
            alt={`${username}'s avatar`}
            className={`rounded-full bg-stone-900 group-hover:bg-black border border-stone-700 group-hover:border-stone-500`}
          />
          <span
            title={role}
            className={`absolute bottom-0 right-0 p-1 bg-stone-800 text-stone-50 rounded-md`}>
            {role === "admin" ? (
              <SupervisorAccountRounded />
            ) : (
              <PersonRounded />
            )}
          </span>
        </div>
      </div>
      <div
        className={`flex flex-col justify-center gap-1 *:border-l-2 border-l-stone-700 group-hover:border-stone-500`}>
        <p title={`username: ${username}`} className={`px-1 border-inherit`}>
          @{username}
        </p>
        <p title={`email: ${email}`} className={`px-1 border-inherit`}>
          {email}
        </p>
        <p
          title={`Born at ${bornAt.toDateString()}`}
          className={`px-1 border-inherit`}>
          Born
          <br />
          {moment(bornAt).fromNow()}
        </p>
        <p
          title={`Last Awakening at ${lastAwaken.toDateString()}`}
          className={`px-1 border-inherit`}>
          Last Awakened
          <br />
          {moment(lastAwaken).fromNow()}
        </p>
      </div>
    </Link>
  );
}
