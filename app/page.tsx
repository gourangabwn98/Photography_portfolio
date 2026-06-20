import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import {
  FeaturedSection,
  ServicesSection,
  AwardsBand,
  TestimonialsSection,
  InstagramSection,
} from "@/components/sections/HomeSections";

export const metadata: Metadata = {
  title: "Elara Voss Studio | Award-Winning Photography",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <ServicesSection />
      <AwardsBand />
      <TestimonialsSection />
      <InstagramSection />
    </>
  );
}
