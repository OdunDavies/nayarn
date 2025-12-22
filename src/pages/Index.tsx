import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>NaYarn | Luxury Handmade Crochet Fashion</title>
        <meta
          name="description"
          content="Discover NaYarn's collection of luxury handmade crochet fashion. Each piece is meticulously crafted with love, celebrating individuality and timeless craftsmanship."
        />
      </Helmet>

      <Header />
      
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <BrandStory />
        <Newsletter />
      </main>

      <Footer />
    </>
  );
};

export default Index;
