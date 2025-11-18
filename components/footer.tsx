import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:underline">Our Story</Link></li>
              <li><Link href="/about" className="hover:underline">Sustainability</Link></li>
              <li><Link href="/about" className="hover:underline">Quality</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/contact" className="hover:underline">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
              <li><Link href="#" className="hover:underline">Cookies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow</h3>
            <div className="flex gap-4">
              <Facebook size={20} className="hover:opacity-80 cursor-pointer" />
              <Instagram size={20} className="hover:opacity-80 cursor-pointer" />
              <Twitter size={20} className="hover:opacity-80 cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm">
          <p>&copy; 2025 Custom Threads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
