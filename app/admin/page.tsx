// 'use client';
// import { useAuth } from '@/lib/auth-context';
// import { Navbar } from '@/components/navbar';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

// export default function AdminPage() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && (!user || user.role !== 'admin')) {
//       router.push('/');
//     }
//   }, [user, loading, router]);

//   if (loading) return <div className="text-center py-16">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <h1 className="text-4xl font-bold text-primary mb-12">Admin Dashboard</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <Link href="/admin/products" className="p-6 bg-secondary rounded-lg border border-border hover:border-primary transition">
//             <h2 className="text-xl font-bold text-primary mb-2">Products</h2>
//             <p className="text-muted-foreground">Manage products, add, edit, or delete items</p>
//           </Link>
//           <Link href="/admin/orders" className="p-6 bg-secondary rounded-lg border border-border hover:border-primary transition">
//             <h2 className="text-xl font-bold text-primary mb-2">Orders</h2>
//             <p className="text-muted-foreground">View and manage customer orders</p>
//           </Link>
//           <Link href="/admin/customers" className="p-6 bg-secondary rounded-lg border border-border hover:border-primary transition">
//             <h2 className="text-xl font-bold text-primary mb-2">Customers</h2>
//             <p className="text-muted-foreground">Manage customer accounts and information</p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsSnap = await getDocs(collection(db, 'products'));
        const ordersSnap = await getDocs(collection(db, 'orders'));
        const usersSnap = await getDocs(query(collection(db, 'users')));

        let totalRevenue = 0;
        ordersSnap.docs.forEach((doc) => {
          const order = doc.data();
          if (order.paymentStatus === 'completed') {
            totalRevenue += order.totalPrice || 0;
          }
        });

        const customersCount = usersSnap.docs.filter((doc) => doc.data().role !== 'admin').length;

        setStats({
          totalProducts: productsSnap.size,
          totalOrders: ordersSnap.size,
          totalCustomers: customersCount,
          totalRevenue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: Package, href: '/admin/products', color: 'bg-blue-100 text-blue-600' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, href: '/admin/orders', color: 'bg-green-100 text-green-600' },
    { label: 'Total Customers', value: stats.totalCustomers, icon: Users, href: '/admin/customers', color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: TrendingUp, href: '/admin/orders', color: 'bg-orange-100 text-orange-600' },
  ];

  if (loading) return <div className="text-center py-16">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="p-6 bg-card border border-border rounded-lg hover:border-primary transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-2">{card.label}</p>
              <p className="text-2xl font-bold text-foreground">{card.value}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
