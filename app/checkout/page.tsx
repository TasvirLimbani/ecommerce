// 'use client';
// import { useState } from 'react';
// import { useCart } from '@/lib/cart-context';
// import { useAuth } from '@/lib/auth-context';
// import { Navbar } from '@/components/navbar';
// import { db } from '@/lib/firebase';
// import { collection, addDoc } from 'firebase/firestore';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function CheckoutPage() {
//   const { items, total, clearCart } = useCart();
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     zipCode: '',
//   });

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="max-w-md mx-auto px-4 py-16 text-center">
//           <h1 className="text-2xl font-bold text-primary mb-4">Please Login</h1>
//           <p className="text-muted-foreground mb-8">You need to be logged in to proceed with checkout.</p>
//           <Link href="/login" className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await addDoc(collection(db, 'orders'), {
//         userId: user.uid,
//         items,
//         totalPrice: total + 10,
//         status: 'pending',
//         createdAt: new Date(),
//         shippingAddress: formData,
//       });

//       clearCart();
//       alert('Order placed successfully!');
//       router.push('/');
//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('Failed to place order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="max-w-md mx-auto px-4 py-16 text-center">
//           <h1 className="text-2xl font-bold text-primary mb-4">Cart is Empty</h1>
//           <Link href="/shop" className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
//             Back to Shop
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-4xl mx-auto px-4 py-16">
//         <h1 className="text-3xl font-bold text-primary mb-12">Checkout</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Shipping Form */}
//           <div className="md:col-span-2">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <h2 className="text-xl font-bold text-foreground mb-4">Shipping Address</h2>
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Street Address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="text"
//                 name="zipCode"
//                 placeholder="Zip Code"
//                 value={formData.zipCode}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
//               >
//                 {loading ? 'Processing...' : 'Place Order'}
//               </button>
//             </form>
//           </div>

//           {/* Order Summary */}
//           <div className="bg-secondary p-6 rounded-lg h-fit">
//             <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
//             <div className="space-y-3 mb-6 pb-6 border-b border-border">
//               {items.map((item) => (
//                 <div key={`${item.productId}-${item.size}-${item.color}`} className="text-sm">
//                   <p className="font-semibold text-foreground">{item.name}</p>
//                   <p className="text-muted-foreground">
//                     {item.quantity} x ${item.price.toFixed(2)}
//                   </p>
//                   <p className="text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="space-y-2">
//               <div className="flex justify-between text-foreground">
//                 <span>Subtotal:</span>
//                 <span className="font-semibold">${total.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-foreground">
//                 <span>Shipping:</span>
//                 <span className="font-semibold">$10.00</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold text-primary pt-4 border-t border-border">
//                 <span>Total:</span>
//                 <span>${(total + 10).toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client';
// import { useState } from 'react';
// import { useCart } from '@/lib/cart-context';
// import { useAuth } from '@/lib/auth-context';
// import { Navbar } from '@/components/navbar';
// import { db } from '@/lib/firebase';
// import { collection, addDoc } from 'firebase/firestore';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { formatPrice } from '@/lib/currency';

// export default function CheckoutPage() {
//   const { items, total, clearCart } = useCart();
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     zipCode: '',
//   });

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="max-w-md mx-auto px-4 py-16 text-center">
//           <h1 className="text-2xl font-bold text-primary mb-4">Please Login</h1>
//           <p className="text-muted-foreground mb-8">You need to be logged in to proceed with checkout.</p>
//           <Link href="/login" className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const customizationTotal = items.reduce((sum, item) => sum + (item.customizationPrice || 0), 0);
//       const shippingCost = 100; // ₹100 shipping
//       const totalWithCharges = total + customizationTotal + shippingCost;

//       await addDoc(collection(db, 'orders'), {
//         userId: user.uid,
//         items,
//         totalPrice: totalWithCharges,
//         subtotal: total,
//         customizationTotal,
//         shippingCost,
//         status: 'pending',
//         createdAt: new Date(),
//         shippingAddress: formData,
//       });

//       clearCart();
//       alert('Order placed successfully!');
//       router.push('/orders');
//     } catch (error) {
//       console.error('Error placing order:', error);
//       alert('Failed to place order');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <Navbar />
//         <div className="max-w-md mx-auto px-4 py-16 text-center">
//           <h1 className="text-2xl font-bold text-primary mb-4">Cart is Empty</h1>
//           <Link href="/shop" className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
//             Back to Shop
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const customizationTotal = items.reduce((sum, item) => sum + (item.customizationPrice || 0), 0);
//   const shippingCost = 100;
//   const totalWithCharges = total + customizationTotal + shippingCost;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-4xl mx-auto px-4 py-16">
//         <h1 className="text-3xl font-bold text-primary mb-12">Checkout</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Shipping Form */}
//           <div className="md:col-span-2">
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <h2 className="text-xl font-bold text-foreground mb-4">Shipping Address</h2>
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Street Address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City"
//                 value={formData.city}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <input
//                 type="text"
//                 name="zipCode"
//                 placeholder="Zip Code"
//                 value={formData.zipCode}
//                 onChange={handleInputChange}
//                 required
//                 className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
//               >
//                 {loading ? 'Processing...' : 'Place Order'}
//               </button>
//             </form>
//           </div>

//           {/* Order Summary */}
//           <div className="bg-secondary p-6 rounded-lg h-fit">
//             <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
//             <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
//               {items.map((item) => (
//                 <div key={`${item.productId}-${item.size}-${item.color}`} className="text-sm">
//                   <p className="font-semibold text-foreground">{item.name}</p>
//                   <p className="text-muted-foreground text-xs">
//                     {item.quantity} x {formatPrice(item.price)}
//                     {item.fit && ` | ${item.fit}`}
//                     {item.sleeve && ` | ${item.sleeve}`}
//                   </p>
//                   {item.hasMonogram && (
//                     <p className="text-xs text-primary">+ Monogram: {formatPrice(item.customizationPrice || 0)}</p>
//                   )}
//                   <p className="text-primary font-bold">{formatPrice(item.price * item.quantity + (item.customizationPrice || 0))}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="space-y-2">
//               <div className="flex justify-between text-foreground">
//                 <span>Subtotal:</span>
//                 <span className="font-semibold">{formatPrice(total)}</span>
//               </div>
//               {customizationTotal > 0 && (
//                 <div className="flex justify-between text-foreground">
//                   <span>Customization:</span>
//                   <span className="font-semibold">{formatPrice(customizationTotal)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between text-foreground">
//                 <span>Shipping:</span>
//                 <span className="font-semibold">{formatPrice(shippingCost)}</span>
//               </div>
//               <div className="flex justify-between text-lg font-bold text-primary pt-4 border-t border-border">
//                 <span>Total:</span>
//                 <span>{formatPrice(totalWithCharges)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/lib/auth-context';
import { Navbar } from '@/components/navbar';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/lib/currency';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Please Login</h1>
          <p className="text-muted-foreground mb-8">You need to be logged in to proceed with checkout.</p>
          <Link href="/login" className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const customizationTotal = items.reduce((sum, item) => sum + (item.customizationPrice || 0), 0);
      const shippingCost = 100;
      const totalWithCharges = total + customizationTotal + shippingCost;

      // Create order in database first
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items,
        totalPrice: totalWithCharges,
        subtotal: total,
        customizationTotal,
        shippingCost,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date(),
        shippingAddress: formData,
      });

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        const razorpay = new window.Razorpay({
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: Math.round(totalWithCharges * 100),
          currency: 'INR',
          name: 'Custom Threads',
          description: 'Premium Custom Clothing',
          order_id: orderRef.id,
          handler: async (response: any) => {
            try {
              await updateDoc(doc(db, 'orders', orderRef.id), {
                paymentStatus: 'completed',
                status: 'processing',
                razorpayPaymentId: response.razorpay_payment_id,
              });

              for (const item of items) {
                const productRef = doc(db, 'products', item.productId);
                const productSnap = await getDoc(productRef);
                if (productSnap.exists()) {
                  const currentStock = productSnap.data().stock || 0;
                  await updateDoc(productRef, {
                    stock: Math.max(0, currentStock - item.quantity),
                  });
                }
              }

              clearCart();
              alert('Payment successful! Order placed.');
              router.push('/orders');
            } catch (error) {
              console.error('Error processing payment:', error);
              alert('Payment successful but order processing failed. Please contact support.');
            }
          },
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#8B7355',
          },
        });

        razorpay.open();
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Cart is Empty</h1>
          <Link href="/shop" className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const customizationTotal = items.reduce((sum, item) => sum + (item.customizationPrice || 0), 0);
  const shippingCost = 100;
  const totalWithCharges = total + customizationTotal + shippingCost;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-primary mb-12">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleRazorpayPayment} className="space-y-4">
              <h2 className="text-xl font-bold text-foreground mb-4">Shipping Address</h2>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50 rounded-lg"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>

          <div className="bg-secondary p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold text-primary mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="text-sm">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.quantity} x {formatPrice(item.price)}
                    {item.fit && ` | ${item.fit}`}
                    {item.sleeve && ` | ${item.sleeve}`}
                  </p>
                  {item.hasMonogram && (
                    <p className="text-xs text-primary">+ Monogram: {formatPrice(item.customizationPrice || 0)}</p>
                  )}
                  <p className="text-primary font-bold">{formatPrice(item.price * item.quantity + (item.customizationPrice || 0))}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-foreground">
                <span>Subtotal:</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              {customizationTotal > 0 && (
                <div className="flex justify-between text-foreground">
                  <span>Customization:</span>
                  <span className="font-semibold">{formatPrice(customizationTotal)}</span>
                </div>
              )}
              <div className="flex justify-between text-foreground">
                <span>Shipping:</span>
                <span className="font-semibold">{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary pt-4 border-t border-border">
                <span>Total:</span>
                <span>{formatPrice(totalWithCharges)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
