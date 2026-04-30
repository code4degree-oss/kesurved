import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductsSection } from "@/components/ProductsSection";
import { VideosSection } from "@/components/VideosSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-light flex flex-col pt-20">
      <Header />
      <Hero />
      <ProductsSection />
      <VideosSection />
      <ReviewsSection />
      <Footer />
    </main>
  );
}
