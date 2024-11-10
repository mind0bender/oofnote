import { confirmAdminAccess } from "@/app/auth/access/admin.access.auth";
import HorizontalRuler from "@/app/components/HorizontalRuler";
import UserMonitorCard from "@/app/components/UserMonitorCard";
import User, { UserInterface } from "@/app/database/models/user/user";

export default async function UserMonitorPage() {
  await confirmAdminAccess();

  const users: UserInterface[] = await User.find(
    {},
    {
      password: 0,
      salt: 0,
    }
    // {
    //   // paginate
    //   limit: 2,
    //   skip: 0,
    // }
  );

  return (
    <div className={`pt-2 flex flex-col gap-2 grow w-full`}>
      <h1>Users Collection</h1>
      <HorizontalRuler />
      <div className={`flex flex-wrap gap-4`}>
        {users.map(
          (user: UserInterface): JSX.Element => (
            <UserMonitorCard key={String(user._id)} user={user} />
          )
        )}
      </div>
    </div>
  );
}
