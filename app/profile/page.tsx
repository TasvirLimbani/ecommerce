// 'use client';
// import { useAuth } from '@/lib/auth-context';
// import { Navbar } from '@/components/navbar';
// import { Footer } from '@/components/footer';
// import Link from 'next/link';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function ProfilePage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push('/login');
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <div className="min-h-screen bg-background" />;
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       <Navbar />
//       <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
//         <h1 className="text-4xl font-bold mb-8">My Account</h1>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Profile Info */}
//           <div className="md:col-span-1">
//             <div className="bg-card border border-border rounded-lg p-6">
//               <div className="flex flex-col gap-4">
//                 <div>
//                   <h3 className="text-sm font-semibold text-muted-foreground mb-1">Email</h3>
//                   <p className="text-lg">{user.email}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-semibold text-muted-foreground mb-1">Display Name</h3>
//                   <p className="text-lg">{user.displayName || 'Not set'}</p>
//                 </div>
//                 <div>
//                   <h3 className="text-sm font-semibold text-muted-foreground mb-1">Account Type</h3>
//                   <p className="text-lg capitalize">{user.role}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="md:col-span-2">
//             <div className="bg-card border border-border rounded-lg p-6">
//               <h2 className="text-2xl font-bold mb-6">Account Options</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Link 
//                   href="/orders" 
//                   className="p-4 border border-border rounded-lg hover:bg-secondary transition"
//                 >
//                   <h3 className="font-semibold mb-2">Order History</h3>
//                   <p className="text-sm text-muted-foreground">View all your orders and track shipments</p>
//                 </Link>
//                 <Link 
//                   href="/contact" 
//                   className="p-4 border border-border rounded-lg hover:bg-secondary transition"
//                 >
//                   <h3 className="font-semibold mb-2">Contact Support</h3>
//                   <p className="text-sm text-muted-foreground">Need help? Get in touch with us</p>
//                 </Link>
//                 <Link 
//                   href="/about" 
//                   className="p-4 border border-border rounded-lg hover:bg-secondary transition"
//                 >
//                   <h3 className="font-semibold mb-2">About Us</h3>
//                   <p className="text-sm text-muted-foreground">Learn more about our company</p>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }


'use client';
import { useAuth } from '@/lib/auth-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/currency';
import { ShoppingBag, MapPin, Settings } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchRecentOrders();
    }
  }, [user]);

  const fetchRecentOrders = async () => {
    if (!user) return;
    try {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
      setRecentOrders(ordersData.slice(0, 3)); // Show last 3 orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setOrdersLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">Welcome back, {user.displayName || user.email}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white text-2xl font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{user.displayName || 'User'}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Account Type</p>
                  <p className="text-lg font-semibold text-foreground capitalize">{user.role}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Member Since</p>
                  <p className="text-lg font-semibold text-foreground">
                    {user.createdAt ? new Date(user.createdAt as any).toLocaleDateString('en-IN') : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/orders" 
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Total Orders</p>
                    <p className="text-3xl font-bold text-primary">{recentOrders.length}</p>
                  </div>
                  <ShoppingBag className="text-primary/30 group-hover:text-primary/60 transition" size={32} />
                </div>
                <p className="text-sm text-muted-foreground">View all orders</p>
              </Link>

              <Link 
                href="/orders" 
                className="bg-card border border-border rounded-lg p-6 hover:border-primary transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground mb-1">Active Orders</p>
                    <p className="text-3xl font-bold text-primary">
                      {recentOrders.filter(o => o.status !== 'delivered').length}
                    </p>
                  </div>
                  <MapPin className="text-primary/30 group-hover:text-primary/60 transition" size={32} />
                </div>
                <p className="text-sm text-muted-foreground">Track shipments</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            <Link href="/orders" className="text-primary hover:underline text-sm">
              View All Orders →
            </Link>
          </div>

          {ordersLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading orders...</p>
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <ShoppingBag size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground mb-4">No orders yet</p>
              <Link href="/shop" className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition rounded-lg">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map(order => (
                <div key={order.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-mono font-semibold text-foreground">{order.id.slice(0, 12)}...</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Date</p>
                      <p className="font-semibold">{new Date(order.createdAt as any).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Items</p>
                      <p className="font-semibold">{order.items.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-semibold text-primary">{formatPrice(order.totalPrice)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Settings */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/contact" 
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition group flex items-start gap-4"
            >
              <Settings className="text-primary/30 group-hover:text-primary/60 transition flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Support Center</h3>
                <p className="text-sm text-muted-foreground">Get help with your orders</p>
              </div>
            </Link>

            <Link 
              href="/about" 
              className="bg-card border border-border rounded-lg p-6 hover:border-primary transition group flex items-start gap-4"
            >
              <Settings className="text-primary/30 group-hover:text-primary/60 transition flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-foreground mb-1">About Us</h3>
                <p className="text-sm text-muted-foreground">Learn about our company</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
