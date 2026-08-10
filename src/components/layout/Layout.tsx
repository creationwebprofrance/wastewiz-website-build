import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "./FloatingButtons";
import TopBanner from "./TopBanner";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
