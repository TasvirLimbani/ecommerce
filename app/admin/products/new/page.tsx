// 'use client';
// import { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Navbar } from '@/components/navbar';

// export default function NewProductPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     description: '',
//     image: '/diverse-products-still-life.png',
//     sizes: 'XS,S,M,L,XL,XXL',
//     colors: '#000000,#FFFFFF,#1F2937',
//     stock: '',
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await addDoc(collection(db, 'products'), {
//         name: formData.name,
//         category: formData.category,
//         price: parseFloat(formData.price),
//         description: formData.description,
//         image: formData.image,
//         sizes: formData.sizes.split(',').map((s) => s.trim()),
//         colors: formData.colors.split(',').map((c) => c.trim()),
//         stock: parseInt(formData.stock),
//         createdAt: new Date(),
//       });

//       alert('Product added successfully!');
//       router.push('/admin/products');
//     } catch (error) {
//       console.error('Error adding product:', error);
//       alert('Failed to add product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />
//       <div className="max-w-2xl mx-auto px-4 py-16">
//         <Link href="/admin/products" className="text-primary hover:underline mb-6 inline-block">
//           Back to Products
//         </Link>
//         <h1 className="text-3xl font-bold text-primary mb-8">Add New Product</h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
//             <input
//               type="text"
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               placeholder="e.g., Shirts, Jeans"
//               required
//               className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-foreground mb-2">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//               step="0.01"
//               required
//               className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-foreground mb-2">Image URL</label>
//             <input
//               type="text"
//               name="image"
//               value={formData.image}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-foreground mb-2">Sizes (comma separated)</label>
//             <input
//               type="text"
//               name="sizes"
//               value={formData.sizes}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-foreground mb-2">Colors (hex codes, comma separated)</label>
//             <input
//               type="text"
//               name="colors"
//               value={formData.colors}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-foreground mb-2">Stock</label>
//             <input
//               type="number"
//               name="stock"
//               value={formData.stock}
//               onChange={handleInputChange}
//               required
//               className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50"
//           >
//             {loading ? 'Adding...' : 'Add Product'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


'use client';
import { useState, useRef } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Upload } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('/placeholder.svg');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    sizes: 'XS,S,M,L,XL,2XL',
    colors: '#000000,#FFFFFF,#1F2937',
    stock: '',
    fits: 'Slim,Regular,Relaxed',
    sleeves: 'Long Sleeve,Short Sleeve',
    monogramPrice: '350',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setFormData({ ...formData, image: imageData });
        setImagePreview(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'products'), {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image || '/placeholder.svg',
        sizes: formData.sizes.split(',').map((s) => s.trim()),
        colors: formData.colors.split(',').map((c) => c.trim()),
        stock: parseInt(formData.stock),
        fits: formData.fits.split(',').map((f) => f.trim()),
        sleeves: formData.sleeves.split(',').map((s) => s.trim()),
        monogramPrice: parseInt(formData.monogramPrice),
        createdAt: new Date(),
      });

      alert('Product added successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <Link href="/admin/products" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-primary mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-lg p-8">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Product Image</label>
            <div className="flex gap-6 items-start">
              <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg overflow-hidden">
                <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border-2 border-primary text-primary font-semibold hover:bg-primary/10 transition flex items-center gap-2 rounded-lg"
                >
                  <Upload size={18} />
                  Upload Image
                </button>
                <p className="text-xs text-muted-foreground mt-2">PNG, JPG up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Shirts, Jeans"
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="1"
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Monogram Price (₹)</label>
              <input
                type="number"
                name="monogramPrice"
                value={formData.monogramPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Customization Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Sizes (comma separated)</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Colors (hex codes, comma separated)</label>
              <input
                type="text"
                name="colors"
                value={formData.colors}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Fits (comma separated)</label>
              <input
                type="text"
                name="fits"
                value={formData.fits}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Sleeves (comma separated)</label>
              <input
                type="text"
                name="sleeves"
                value={formData.sleeves}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition disabled:opacity-50 rounded-lg"
          >
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
