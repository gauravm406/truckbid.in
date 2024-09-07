import Image from "next/image";
import { AuthBackgroundImage } from "../lib/assets";
import Logo from "../ui/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-screen h-screen">
      <Image
        src={AuthBackgroundImage}
        alt="auth-background-image"
        className="object-cover"
        fill
        priority
      />
      <div className="absolute z-10 w-full h-full flex-center flex-col">
        <Logo className="mb-10" />
        {children}
      </div>
    </main>
  );
}
