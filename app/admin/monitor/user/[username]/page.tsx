import { confirmAdminAccess } from "@/app/auth/access/admin.access.auth";
import Form from "@/app/components/Form";
import Input from "@/app/components/Input";
import User, { UserInterface } from "@/app/database/models/user/user";
import UsernameManageForm from "./UsernameManageForm";

export default async function MonitorUserByUsernamePage({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<JSX.Element> {
  const { username } = await params;
  await confirmAdminAccess();
  const users: UserInterface | null = await User.findOne(
    {
      username,
    },
    { password: 0, salt: 0 }
  );
  if (!users) {
    return <h1>User not found</h1>;
  }
  const { email, role, bornAt, lastAwaken } = users;
  return (
    <div className={`flex flex-col grow w-full`}>
      <div className={`flex flex-col gap-2`}>
        <Form formTitle={<h1>User Details</h1>}>
          <Input
            labelProps={{
              children: "Username",
              htmlFor: "username",
            }}
            readOnly
            value={users.username}
          />
          <Input
            labelProps={{
              children: "Email",
              htmlFor: "email",
            }}
            readOnly
            value={email}
          />
          <Input
            labelProps={{
              children: "Role",
              htmlFor: "role",
            }}
            readOnly
            value={role}
          />
          <Input
            labelProps={{
              children: "Born At",
              htmlFor: "bornAt",
            }}
            readOnly
            value={bornAt.toDateString()}
          />
          <Input
            labelProps={{
              children: "Last Awaken",
              htmlFor: "lastAwaken",
            }}
            readOnly
            value={lastAwaken.toDateString()}
          />
        </Form>
      </div>
      <UsernameManageForm username={username} role={role} />
    </div>
  );
}
