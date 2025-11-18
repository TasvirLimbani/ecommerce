'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/');
      return;
    }

    const fetchCustomers = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((customer) => customer.role !== 'admin');
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [user, router]);

  if (loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link href="/admin" className="text-primary hover:underline mb-6 inline-block">
          Back to Dashboard
        </Link>
        <h1 className="text-4xl font-bold text-primary mb-8">Customers</h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-bold text-foreground">Email</th>
                <th className="text-left py-4 px-4 font-bold text-foreground">Joined</th>
                <th className="text-left py-4 px-4 font-bold text-foreground">Role</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-secondary transition">
                  <td className="py-4 px-4 text-foreground">{customer.email}</td>
                  <td className="py-4 px-4 text-muted-foreground">
                    {customer.createdAt?.toDate?.()?.toLocaleDateString?.() || 'N/A'}
                  </td>
                  <td className="py-4 px-4 text-foreground">{customer.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
