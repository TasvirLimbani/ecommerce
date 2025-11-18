import Link from 'next/link';
import { Image } from 'lucide-react';

const categories = [
  { name: 'Shirts', image: '/mens-shirts.png' },
  { name: 'Polos & Popovers', image: '/mens-polos.jpg' },
  { name: 'Coats & Jackets', image: '/mens-jackets.jpg' },
  { name: 'Jeans & 5-Pockets', image: '/mens-jeans.jpg' },
  { name: 'Pants', image: '/mens-pants.png' },
  { name: 'Shorts', image: '/mens-shorts.jpg' },
  { name: 'Shop All', image: '/menswear-collection.jpg' },
];

export function Categories() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={`/shop?category=${category.name.toLowerCase()}`}>
              <div className="group cursor-pointer">
                <div className="relative h-48 bg-muted rounded-lg overflow-hidden mb-3">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <p className="text-center text-sm font-medium text-foreground group-hover:text-primary transition">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
