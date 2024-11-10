import AdminNavbar from "../components/AdminNavbar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<JSX.Element> {
  return (
    <div className={`flex flex-col w-full grow`}>
      <AdminNavbar />
      <main className={`flex flex-col grow items-center p-4`}>{children}</main>
    </div>
  );
}
