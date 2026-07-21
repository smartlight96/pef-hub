import Navbar from '@/components/layout/Navbar';
import MenuGrid from '@/components/menu/MenuGrid';
import CartButton from '@/components/cart/CartButton';
import Footer from '@/components/layout/Footer';

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <MenuGrid />
      <CartButton />
      <Footer />
    </>
  );
}
