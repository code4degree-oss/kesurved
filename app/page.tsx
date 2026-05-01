import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CategoriesSection } from "@/components/CategoriesSection";
import { ProductsSection } from "@/components/ProductsSection";
import { BannerSection, TrustBanner, SecondBanner } from "@/components/BannerSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Footer } from "@/components/Footer";
import fs from 'fs';
import path from 'path';

// Revalidate every 10 seconds so admin banner changes reflect quickly
export const revalidate = 10;

interface BannerData {
  id: string;
  slot: string;
  imageUrl: string;
  mobileImageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  linkedProductId: string;
  isActive: boolean;
}

function getBanners(): BannerData[] {
  try {
    const file = path.join(process.cwd(), 'data', 'banners.json');
    if (!fs.existsSync(file)) return [];
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return [];
  }
}

export default function Home() {
  const banners = getBanners();

  return (
    <main className="min-h-screen flex flex-col">
      <div className="bg-brand-light">
        <Header />
        <Hero banners={banners} />
        <TrustBanner />
        <CategoriesSection />
        <ProductsSection banners={banners} />
      </div>

      <div className="bg-white">
        <BannerSection banners={banners} />
        <SecondBanner banners={banners} />
        <ReviewsSection />
      </div>

      <Footer />
    </main>
  );
}
