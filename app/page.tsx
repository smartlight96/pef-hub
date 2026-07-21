import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/home/HeroSection';
import PopularMeals from '@/components/home/PopularMeals';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PopularMeals />
      <Footer />
    </>
  );
}
