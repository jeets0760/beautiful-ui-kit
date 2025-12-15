import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import FitnessCalculator from "@/components/FitnessCalculator";
import Trainers from "@/components/Trainers";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ContactForm from "@/components/ContactForm";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Programs />
        <FitnessCalculator />
        <Trainers />
        <Testimonials />
        <Pricing />
        <ContactForm />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
