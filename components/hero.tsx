import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative h-screen bg-cover bg-center flex items-center justify-center" 
      style={{ backgroundImage: 'url(/placeholder.svg?height=1080&width=1920&query=luxury-menswear-hero)' }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative text-center text-white max-w-2xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6">
          Fit for Body & Soul
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Custom Clothing for the Modern Man
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3 bg-white text-primary font-semibold hover:bg-gray-100 transition"
          >
            Make Mine
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 border-2 border-white text-white font-semibold hover:bg-white/10 transition"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
