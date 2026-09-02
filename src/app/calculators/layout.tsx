import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar solid />
      <main className="flex-1 bg-paper pt-20 sm:pt-24">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
