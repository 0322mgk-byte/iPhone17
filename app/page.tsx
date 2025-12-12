import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { TechSpecs } from "@/components/TechSpecs";
import { Buy } from "@/components/Buy";

export default function Home() {
  return (
    <main style={{ backgroundColor: '#000' }}>
      <Hero />
      <Features />
      <TechSpecs />
      <Buy />
    </main>
  );
}
