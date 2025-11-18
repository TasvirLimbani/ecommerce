// 'use client';
// import { useEffect, useState } from 'react';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { Product } from '@/lib/types';
// import Link from 'next/link';
// import { Navbar } from '@/components/navbar';
// import { useSearchParams } from 'next/navigation';

// export default function ShopPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const category = searchParams.get('category');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         let q;
//         if (category) {
//           q = query(collection(db, 'products'), where('category', '==', category));
//         } else {
//           q = query(collection(db, 'products'));
//         }
//         const snapshot = await getDocs(q);
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
//   }, [category]);

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <h1 className="text-4xl font-bold mb-8 text-primary">
//           {category ? `${category}` : 'All Products'}
//         </h1>
//         {loading ? (
//           <div className="text-center py-16">Loading...</div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <Link key={product.id} href={`/product/${product.id}`}>
//                 <div className="group">
//                   <div className="relative h-80 bg-muted rounded-lg overflow-hidden mb-4">
//                     <img
//                       src={product.image || "/placeholder.svg"}
//                       alt={product.name}
//                       className="w-full h-full object-cover group-hover:scale-105 transition"
//                     />
//                   </div>
//                   <h3 className="font-semibold text-foreground group-hover:text-primary transition mb-1">
//                     {product.name}
//                   </h3>
//                   <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
//                   <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { useSearchParams } from 'next/navigation';
import { formatPrice } from '@/lib/currency';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let q;
        if (category && category !== 'all') {
          q = query(collection(db, 'products'), where('category', '==', category));
        } else {
          q = collection(db, 'products');
        }
        
        const snapshot = await getDocs(q);
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
  }, [category]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-primary">
          {category && category !== 'all' ? `${category}` : 'All Products'}
        </h1>
        {loading ? (
          <div className="text-center py-16">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="group">
                  <div className="relative h-80 bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    {product.stock <= 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <p className="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                  <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
