import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import About from "@/components/About";
import Services from "@/components/Services";
import CalculatorsTeaser from "@/components/CalculatorsTeaser";
import Credentials from "@/components/Credentials";
import BecomeAdvisor from "@/components/BecomeAdvisor";
import WhyUs from "@/components/WhyUs";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <CalculatorsTeaser />
        <Credentials />
        <BecomeAdvisor />
        <WhyUs />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
