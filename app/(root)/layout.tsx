import LeftNavigationBar from "@/components/shared/LeftNavigationBar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-row">
          <div className="w-[250px] h-screen border-r-[1px] border-[#E0E0E0]">
            <LeftNavigationBar/>
          </div>
          <div className="flex w-full flex-col">
            <div className="w-full h-[64px] border-b-[1px] border-[#E0E0E0]"></div>
            <div className="">{children}</div>
          </div>
      </div>
  );
}
