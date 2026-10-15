import { About } from "@/components/About";
import { Consultation } from "@/components/Consultation";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { StickyCta } from "@/components/StickyCta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Consultation />
        <Contacts />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
