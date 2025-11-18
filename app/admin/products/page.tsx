// 'use client';
// import { useEffect, useState } from 'react';
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/lib/auth-context';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Navbar } from '@/components/navbar';
// import { Product } from '@/lib/types';
// import { Edit, Trash2 } from 'lucide-react';

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user?.role !== 'admin') {
//       router.push('/');
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'products'));
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         } as Product));
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [user, router]);

//   const handleDelete = async (productId: string) => {
//     if (confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteDoc(doc(db, 'products', productId));
//         setProducts(products.filter((p) => p.id !== productId));
//         alert('Product deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         alert('Failed to delete product');
//       }
//     }
//   };

//   if (loading) return <div className="text-center py-16">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-primary">Products</h1>
//           <Link href="/admin/products/new" className="px-6 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition">
//             Add Product
//           </Link>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="border-b border-border">
//                 <th className="text-left py-4 px-4 font-bold text-foreground">Name</th>
//                 <th className="text-left py-4 px-4 font-bold text-foreground">Category</th>
//                 <th className="text-left py-4 px-4 font-bold text-foreground">Price</th>
//                 <th className="text-left py-4 px-4 font-bold text-foreground">Stock</th>
//                 <th className="text-left py-4 px-4 font-bold text-foreground">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product.id} className="border-b border-border hover:bg-secondary transition">
//                   <td className="py-4 px-4 text-foreground">{product.name}</td>
//                   <td className="py-4 px-4 text-foreground">{product.category}</td>
//                   <td className="py-4 px-4 text-primary font-bold">${product.price.toFixed(2)}</td>
//                   <td className="py-4 px-4 text-foreground">{product.stock}</td>
//                   <td className="py-4 px-4">
//                     <div className="flex gap-3">
//                       <Link href={`/admin/products/${product.id}`} className="text-primary hover:text-primary/80">
//                         <Edit size={18} />
//                       </Link>
//                       <button
//                         onClick={() => handleDelete(product.id)}
//                         className="text-destructive hover:text-destructive/80"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// 'use client';
// import { useEffect, useState } from 'react';
// import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useAuth } from '@/lib/auth-context';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Navbar } from '@/components/navbar';
// import { Product } from '@/lib/types';
// import { Edit, Trash2 } from 'lucide-react';
// import { formatPrice } from '@/lib/currency';

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (user?.role !== 'admin') {
//       router.push('/');
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, 'products'));
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         } as Product));
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [user, router]);

//   const handleDelete = async (productId: string) => {
//     if (confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteDoc(doc(db, 'products', productId));
//         setProducts(products.filter((p) => p.id !== productId));
//         alert('Product deleted successfully!');
//       } catch (error) {
//         console.error('Error deleting product:', error);
//         alert('Failed to delete product');
//       }
//     }
//   };

//   if (loading) return <div className="text-center py-16">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-bold text-primary">Products Management</h1>
//           <Link href="/admin/products/new" className="px-6 py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition rounded-lg">
//             + Add Product
//           </Link>
//         </div>

//         <div className="bg-card border border-border rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-secondary border-b border-border">
//                   <th className="text-left py-4 px-6 font-bold text-foreground">Product</th>
//                   <th className="text-left py-4 px-6 font-bold text-foreground">Category</th>
//                   <th className="text-left py-4 px-6 font-bold text-foreground">Price</th>
//                   <th className="text-left py-4 px-6 font-bold text-foreground">Stock</th>
//                   <th className="text-center py-4 px-6 font-bold text-foreground">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product) => (
//                   <tr key={product.id} className="border-b border-border hover:bg-secondary transition">
//                     <td className="py-4 px-6">
//                       <div className="flex gap-4 items-center">
//                         <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-12 h-12 rounded object-cover" />
//                         <div>
//                           <p className="font-semibold text-foreground">{product.name}</p>
//                           <p className="text-xs text-muted-foreground">{product.id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6 text-foreground">{product.category}</td>
//                     <td className="py-4 px-6 font-bold text-primary">{formatPrice(product.price)}</td>
//                     <td className="py-4 px-6">
//                       <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                         product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//                       }`}>
//                         {product.stock}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="flex gap-3 justify-center">
//                         <Link href={`/admin/products/${product.id}`} className="p-2 text-primary hover:bg-primary/10 rounded transition">
//                           <Edit size={18} />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(product.id)}
//                           className="p-2 text-destructive hover:bg-destructive/10 rounded transition"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {products.length === 0 && (
//           <div className="text-center py-16">
//             <p className="text-lg text-muted-foreground mb-4">No products yet</p>
//             <Link href="/admin/products/new" className="text-primary hover:underline">
//               Create your first product
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Edit, Trash2, Plus } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Product));
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(products.filter((p) => p.id !== productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product inventory</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition rounded-lg"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left py-4 px-6 font-bold text-foreground">Product</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Category</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Price</th>
                <th className="text-left py-4 px-6 font-bold text-foreground">Stock</th>
                <th className="text-center py-4 px-6 font-bold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-secondary transition">
                  <td className="py-4 px-6">
                    <div className="flex gap-4 items-center">
                      <img src={product.image || "/placeholder.svg?height=40&width=40"} alt={product.name} className="w-12 h-12 rounded object-cover" />
                      <span className="font-semibold text-foreground">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-foreground">{product.category}</td>
                  <td className="py-4 px-6 font-bold text-primary">{formatPrice(product.price)}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3 justify-center">
                      <Link href={`/admin/products/${product.id}`} className="p-2 text-primary hover:bg-primary/10 rounded transition">
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground mb-4">No products found</p>
          <Link href="/admin/products/new" className="text-primary hover:underline">
            Create your first product
          </Link>
        </div>
      )}
    </div>
  );
}
