import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="flex flex-row">
        <div className="w-full flex justify-center items-center">{children}</div>
        <div className="h-screen w-3/2">
            <Image src="/auth.png" alt="picture" width={1200} height={0} className="h-screen hidden md:block"></Image>
        </div>
      </div>
  );
}
