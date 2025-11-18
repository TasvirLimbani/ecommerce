// // 'use client';
// // import { useEffect, useState } from 'react';
// // import { doc, getDoc } from 'firebase/firestore';
// // import { db } from '@/lib/firebase';
// // import { Product, CartItem } from '@/lib/types';
// // import { useCart } from '@/lib/cart-context';
// // import Link from 'next/link';
// // import { Navbar } from '@/components/navbar';
// // import { Heart } from 'lucide-react';

// // export default function ProductPage({ params }: { params: { id: string } }) {
// //   const [product, setProduct] = useState<Product | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [quantity, setQuantity] = useState(1);
// //   const [selectedSize, setSelectedSize] = useState('');
// //   const [selectedColor, setSelectedColor] = useState('');
// //   const { addToCart } = useCart();

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const docSnap = await getDoc(doc(db, 'products', params.id));
// //         if (docSnap.exists()) {
// //           setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
// //           if (docSnap.data().sizes) setSelectedSize(docSnap.data().sizes[0]);
// //           if (docSnap.data().colors) setSelectedColor(docSnap.data().colors[0]);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching product:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProduct();
// //   }, [params.id]);

// //   const handleAddToCart = () => {
// //     if (product && selectedSize && selectedColor) {
// //       const cartItem: CartItem = {
// //         productId: product.id,
// //         name: product.name,
// //         price: product.price,
// //         quantity,
// //         size: selectedSize,
// //         color: selectedColor,
// //         image: product.image,
// //       };
// //       addToCart(cartItem);
// //       alert('Added to cart!');
// //     }
// //   };

// //   if (loading) return <div className="text-center py-16">Loading...</div>;
// //   if (!product) return <div className="text-center py-16">Product not found</div>;

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <Navbar />
// //       <div className="max-w-7xl mx-auto px-4 py-16">
// //         <Link href="/shop" className="text-primary hover:underline mb-6 inline-block">
// //           Back to Shop
// //         </Link>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
// //           {/* Image */}
// //           <div className="h-96 md:h-screen bg-muted rounded-lg overflow-hidden">
// //             <img
// //               src={product.image || "/placeholder.svg"}
// //               alt={product.name}
// //               className="w-full h-full object-cover"
// //             />
// //           </div>

// //           {/* Details */}
// //           <div className="flex flex-col justify-center">
// //             <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>
// //             <p className="text-lg text-muted-foreground mb-2">{product.category}</p>
// //             <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
// //             <p className="text-foreground mb-8 text-lg leading-relaxed">{product.description}</p>

// //             {/* Size Selection */}
// //             <div className="mb-6">
// //               <label className="block text-sm font-semibold text-foreground mb-2">Size</label>
// //               <div className="flex gap-2">
// //                 {product.sizes.map((size) => (
// //                   <button
// //                     key={size}
// //                     onClick={() => setSelectedSize(size)}
// //                     className={`px-4 py-2 border-2 transition ${
// //                       selectedSize === size
// //                         ? 'border-primary bg-primary text-primary-foreground'
// //                         : 'border-border text-foreground hover:border-primary'
// //                     }`}
// //                   >
// //                     {size}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Color Selection */}
// //             <div className="mb-6">
// //               <label className="block text-sm font-semibold text-foreground mb-2">Color</label>
// //               <div className="flex gap-3">
// //                 {product.colors.map((color) => (
// //                   <button
// //                     key={color}
// //                     onClick={() => setSelectedColor(color)}
// //                     className={`w-10 h-10 rounded-full border-2 transition`}
// //                     style={{
// //                       backgroundColor: color,
// //                       borderColor: selectedColor === color ? '#000' : '#ccc',
// //                       borderWidth: selectedColor === color ? '3px' : '2px',
// //                     }}
// //                     title={color}
// //                   />
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Quantity */}
// //             <div className="mb-8">
// //               <label className="block text-sm font-semibold text-foreground mb-2">Quantity</label>
// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
// //                   className="px-4 py-2 border border-border text-foreground hover:bg-muted transition"
// //                 >
// //                   −
// //                 </button>
// //                 <input
// //                   type="number"
// //                   value={quantity}
// //                   onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
// //                   className="w-16 text-center border border-border rounded-lg bg-background text-foreground"
// //                 />
// //                 <button
// //                   onClick={() => setQuantity(quantity + 1)}
// //                   className="px-4 py-2 border border-border text-foreground hover:bg-muted transition"
// //                 >
// //                   +
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Add to Cart */}
// //             <button
// //               onClick={handleAddToCart}
// //               className="w-full py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition mb-4"
// //             >
// //               Add to Cart
// //             </button>
// //             <button className="w-full py-3 border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition flex items-center justify-center gap-2">
// //               <Heart size={20} />
// //               Add to Wishlist
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';
// import { useEffect, useState } from 'react';
// import { use } from 'react';
// import { doc, getDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { Product, CartItem } from '@/lib/types';
// import { useCart } from '@/lib/cart-context';
// import Link from 'next/link';
// import { Navbar } from '@/components/navbar';
// import { Heart } from 'lucide-react';

// export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = use(params);
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const docSnap = await getDoc(doc(db, 'products', id));
//         if (docSnap.exists()) {
//           setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
//           if (docSnap.data().sizes) setSelectedSize(docSnap.data().sizes[0]);
//           if (docSnap.data().colors) setSelectedColor(docSnap.data().colors[0]);
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleAddToCart = () => {
//     if (product && selectedSize && selectedColor) {
//       const cartItem: CartItem = {
//         productId: product.id,
//         name: product.name,
//         price: product.price,
//         quantity,
//         size: selectedSize,
//         color: selectedColor,
//         image: product.image,
//       };
//       addToCart(cartItem);
//       alert('Added to cart!');
//     }
//   };

//   if (loading) return <div className="text-center py-16">Loading...</div>;
//   if (!product) return <div className="text-center py-16">Product not found</div>;

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-16">
//         <Link href="/shop" className="text-primary hover:underline mb-6 inline-block">
//           Back to Shop
//         </Link>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//           {/* Image */}
//           <div className="h-96 md:h-screen bg-muted rounded-lg overflow-hidden">
//             <img
//               src={product.image || "/placeholder.svg"}
//               alt={product.name}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Details */}
//           <div className="flex flex-col justify-center">
//             <h1 className="text-4xl font-bold text-primary mb-4">{product.name}</h1>
//             <p className="text-lg text-muted-foreground mb-2">{product.category}</p>
//             <p className="text-3xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
//             <p className="text-foreground mb-8 text-lg leading-relaxed">{product.description}</p>

//             {/* Size Selection */}
//             <div className="mb-6">
//               <label className="block text-sm font-semibold text-foreground mb-2">Size</label>
//               <div className="flex gap-2">
//                 {product.sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`px-4 py-2 border-2 transition ${
//                       selectedSize === size
//                         ? 'border-primary bg-primary text-primary-foreground'
//                         : 'border-border text-foreground hover:border-primary'
//                     }`}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Color Selection */}
//             <div className="mb-6">
//               <label className="block text-sm font-semibold text-foreground mb-2">Color</label>
//               <div className="flex gap-3">
//                 {product.colors.map((color) => (
//                   <button
//                     key={color}
//                     onClick={() => setSelectedColor(color)}
//                     className={`w-10 h-10 rounded-full border-2 transition`}
//                     style={{
//                       backgroundColor: color,
//                       borderColor: selectedColor === color ? '#000' : '#ccc',
//                       borderWidth: selectedColor === color ? '3px' : '2px',
//                     }}
//                     title={color}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Quantity */}
//             <div className="mb-8">
//               <label className="block text-sm font-semibold text-foreground mb-2">Quantity</label>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="px-4 py-2 border border-border text-foreground hover:bg-muted transition"
//                 >
//                   −
//                 </button>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                   className="w-16 text-center border border-border rounded-lg bg-background text-foreground"
//                 />
//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="px-4 py-2 border border-border text-foreground hover:bg-muted transition"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Add to Cart */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition mb-4"
//             >
//               Add to Cart
//             </button>
//             <button className="w-full py-3 border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition flex items-center justify-center gap-2">
//               <Heart size={20} />
//               Add to Wishlist
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';
import { useEffect, useState } from 'react';
import { use } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, CartItem } from '@/lib/types';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Heart } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedFit, setSelectedFit] = useState('');
  const [selectedSleeve, setSelectedSleeve] = useState('');
  const [hasMonogram, setHasMonogram] = useState(false);
  const [stockError, setStockError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'products', id));
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as Product;
          setProduct(data);
          if (data.sizes) setSelectedSize(data.sizes[0]);
          if (data.colors) setSelectedColor(data.colors[0]);
          if (data.fits) setSelectedFit(data.fits[0]);
          if (data.sleeves) setSelectedSleeve(data.sleeves[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !selectedSize || !selectedColor) return;

    setStockError('');

    if (quantity > product.stock) {
      setStockError(`Only ${product.stock} items available in stock`);
      return;
    }

    const customizationPrice = hasMonogram ? (product.monogramPrice || 350) : 0;
    
    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
      fit: selectedFit,
      sleeve: selectedSleeve,
      hasMonogram,
      customizationPrice,
    };

    addToCart(cartItem);
    
    try {
      const newStock = product.stock - quantity;
      await updateDoc(doc(db, 'products', product.id), {
        stock: newStock,
      });
      setProduct({ ...product, stock: newStock });
      alert('Added to cart!');
      setQuantity(1);
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Item added to cart but stock update failed');
    }
  };

  if (loading) return <div className="text-center py-16">Loading...</div>;
  if (!product) return <div className="text-center py-16">Product not found</div>;

  const totalPrice = product.price * quantity + (hasMonogram ? (product.monogramPrice || 350) : 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Link href="/shop" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Shop
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="h-96 md:h-screen bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-start pt-8">
            <h1 className="text-4xl font-bold text-primary mb-2">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{product.category}</p>
            <p className="text-4xl font-bold text-primary mb-2">{formatPrice(product.price)}</p>
            
            {/* Stock Status */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-muted-foreground">
                Stock Available: <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>{product.stock}</span>
              </p>
            </div>

            <p className="text-foreground mb-8 text-lg leading-relaxed">{product.description}</p>

            {/* Tabs for Standard and Custom Sizes */}
            <div className="flex gap-4 mb-8 border-b border-border">
              <button className="pb-4 font-semibold text-foreground border-b-2 border-primary">
                Standard Sizes
              </button>
            </div>

            {/* Fit Selection */}
            {product.fits && product.fits.length > 0 && (
              <div className="mb-8">
                <label className="block text-lg font-semibold text-foreground mb-3">
                  Fit: <span className="text-primary">{selectedFit}</span>
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {product.fits.map((fit) => (
                    <button
                      key={fit}
                      onClick={() => setSelectedFit(fit)}
                      className={`py-3 px-4 border-2 transition font-medium ${
                        selectedFit === fit
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-foreground hover:border-primary'
                      }`}
                    >
                      {fit}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-foreground mb-3">
                Size: <span className="text-primary">{selectedSize}</span> - 40.0 cm Neck / 110.0 cm Chest
              </label>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border-2 transition font-medium ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-foreground hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleeve Selection */}
            {product.sleeves && product.sleeves.length > 0 && (
              <div className="mb-8">
                <label className="block text-lg font-semibold text-foreground mb-3">
                  Sleeve: <span className="text-primary">{selectedSleeve}</span>
                </label>
                <div className="flex gap-3">
                  {product.sleeves.map((sleeve) => (
                    <button
                      key={sleeve}
                      onClick={() => setSelectedSleeve(sleeve)}
                      className={`py-3 px-6 border-2 transition font-medium ${
                        selectedSleeve === sleeve
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-foreground hover:border-primary'
                      }`}
                    >
                      {sleeve}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-foreground mb-3">Color</label>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-4 transition`}
                    style={{
                      backgroundColor: color,
                      borderColor: selectedColor === color ? '#000' : '#ccc',
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Monogram Customization */}
            {product.monogramPrice && (
              <div className="mb-8 p-4 border border-border rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasMonogram}
                    onChange={(e) => setHasMonogram(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="font-semibold text-foreground">
                    Monogram Customization: +{formatPrice(product.monogramPrice)}
                  </span>
                </label>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-foreground mb-3">Quantity</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-6 py-3 border-2 border-border text-foreground hover:bg-muted transition font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 text-center border-2 border-border rounded-lg bg-background text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-6 py-3 border-2 border-border text-foreground hover:bg-muted transition font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Error Message */}
            {stockError && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">
                {stockError}
              </div>
            )}

            {/* Total Price */}
            <div className="mb-8 p-4 bg-secondary rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Total:</span>
                <span className="text-3xl font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              className="w-full py-4 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition mb-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <button className="w-full py-4 border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition flex items-center justify-center gap-2">
              <Heart size={20} />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
