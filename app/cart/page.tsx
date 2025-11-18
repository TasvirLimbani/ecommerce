'use client';
import { Navbar } from '@/components/navbar';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Start shopping to add items to your cart.</p>
          <Link href="/shop" className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 p-4 border border-border rounded-lg">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                  className="px-2 py-1 border border-border text-foreground hover:bg-muted transition"
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                  className="px-2 py-1 border border-border text-foreground hover:bg-muted transition"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.productId, item.size, item.color)}
                  className="text-destructive hover:text-destructive/80 mt-2"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="flex justify-between mb-4 text-lg">
            <span className="font-semibold text-foreground">Subtotal:</span>
            <span className="text-primary font-bold">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-lg">
            <span className="font-semibold text-foreground">Shipping:</span>
            <span className="text-primary font-bold">$10.00</span>
          </div>
          <div className="flex justify-between text-xl font-bold border-t border-border pt-4 mb-8">
            <span className="text-foreground">Total:</span>
            <span className="text-primary">${(total + 10).toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block w-full py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition text-center"
          >
            Proceed to Checkout
          </Link>
          <button
            onClick={clearCart}
            className="w-full mt-2 py-3 border border-primary text-primary font-semibold hover:bg-primary/10 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
