// 'use client';
// import { useEffect, useState } from 'react';
// import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/lib/auth-context';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Navbar } from '@/components/navbar';
// import { Order } from '@/lib/types';

// export default function OrdersPage() {
//   const [orders, setOrders] = useState<(Order & { id: string })[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user?.role !== 'admin') {
//       router.push('/');
//       return;
//     }

//     const fetchOrders = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'orders'));
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         } as Order & { id: string }));
//         setOrders(data.sort((a, b) => (b.createdAt as any)?.toDate?.() - (a.createdAt as any)?.toDate?.()));
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [user, router]);

//   const handleStatusChange = async (orderId: string, newStatus: string) => {
//     try {
//       await updateDoc(doc(db, 'orders', orderId), {
//         status: newStatus,
//       });
//       setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o)));
//     } catch (error) {
//       console.error('Error updating order:', error);
//       alert('Failed to update order');
//     }
//   };

//   if (loading) return <div className="text-center py-16">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <Link href="/admin" className="text-primary hover:underline mb-6 inline-block">
//           Back to Dashboard
//         </Link>
//         <h1 className="text-4xl font-bold text-primary mb-8">Orders</h1>

//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order.id} className="p-6 bg-secondary rounded-lg border border-border">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h3 className="text-lg font-bold text-foreground">Order #{order.id.slice(0, 8)}</h3>
//                   <p className="text-sm text-muted-foreground">
//                     {(order.createdAt as any)?.toDate?.()?.toLocaleDateString?.() || 'N/A'}
//                   </p>
//                 </div>
//                 <select
//                   value={order.status}
//                   onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                   className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//                 >
//                   <option value="pending">Pending</option>
//                   <option value="processing">Processing</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                 </select>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-2">Customer Info</h4>
//                   <p className="text-sm text-muted-foreground">{order.shippingAddress.fullName}</p>
//                   <p className="text-sm text-muted-foreground">{order.shippingAddress.email}</p>
//                   <p className="text-sm text-muted-foreground">{order.shippingAddress.phone}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-2">Shipping Address</h4>
//                   <p className="text-sm text-muted-foreground">{order.shippingAddress.address}</p>
//                   <p className="text-sm text-muted-foreground">
//                     {order.shippingAddress.city}, {order.shippingAddress.zipCode}
//                   </p>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <h4 className="font-semibold text-foreground mb-2">Items</h4>
//                 <div className="space-y-1 text-sm">
//                   {order.items.map((item, idx) => (
//                     <p key={idx} className="text-muted-foreground">
//                       {item.quantity}x {item.name} ({item.size}, {item.color}) - ${(item.price * item.quantity).toFixed(2)}
//                     </p>
//                   ))}
//                 </div>
//               </div>

//               <div className="flex justify-end text-lg font-bold text-primary">
//                 Total: ${order.totalPrice.toFixed(2)}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/currency';
import { ChevronDown } from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<(Order & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'orders'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Order & { id: string }));
        setOrders(data.sort((a, b) => (b.createdAt as any)?.toDate?.() - (a.createdAt as any)?.toDate?.()));
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus as any } : o)));
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage customer orders and shipments</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left py-4 px-6 font-bold text-foreground">Order ID</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Customer</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Amount</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Status</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border hover:bg-secondary transition">
                  <td className="py-4 px-6 text-foreground font-semibold">#{order.id.slice(0, 8).toUpperCase()}</td>
                  <td className="py-4 px-6 text-foreground">{order.shippingAddress.fullName}</td>
                  <td className="py-4 px-6 font-bold text-primary">{formatPrice(order.totalPrice)}</td>
                  <td className="py-4 px-6">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)} border-0 cursor-pointer`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground text-sm">{(order.createdAt as any)?.toDate?.()?.toLocaleDateString?.() || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No orders yet</p>
        </div>
      )}
    </div>
  );
}
