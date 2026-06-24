import { Outlet } from "react-router-dom";
import Header from "@/share/components/Header";
import Footer from "@/share/components/Footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
