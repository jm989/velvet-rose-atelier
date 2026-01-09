import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedBouquets from "@/components/home/FeaturedBouquets";
import ReviewsSection from "@/components/home/ReviewsSection";
import BrandSection from "@/components/home/BrandSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedBouquets />
      <ReviewsSection />
      <BrandSection />
    </Layout>
  );
};

export default Index;
