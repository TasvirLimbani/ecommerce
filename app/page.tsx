'use client';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Categories } from '@/components/categories';
import { NewArrivals } from '@/components/new-arrivals';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Categories />
      <NewArrivals />
      <Footer />
    </div>
  );
}
