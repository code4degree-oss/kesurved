import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoriesSection } from "@/components/CategoriesSection";
import { ProductsSection } from "@/components/ProductsSection";
import { BannerSection, SecondBanner } from "@/components/BannerSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-light flex flex-col">
      <Header />
      <Hero />
      <CategoriesSection />
      <ProductsSection />
      <BannerSection />
      <SecondBanner />
      <ReviewsSection />
      <Footer />
    </main>
  );
}
