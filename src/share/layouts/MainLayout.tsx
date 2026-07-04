import type { ReactNode } from "react";
import Footer from "@/share/components/Footer/Footer";
import Header from "@/share/components/Header/Header";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-svh flex flex-col bg-page text-text-main">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
