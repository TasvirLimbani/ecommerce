import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl font-bold mb-4">About Custom Threads</h1>
            <p className="text-xl opacity-90">Crafting premium custom clothing for the modern man</p>
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-foreground/80 mb-4">
                Custom Threads was founded with a simple mission: to create premium, perfectly-fitted clothing that celebrates individuality and quality craftsmanship.
              </p>
              <p className="text-lg text-foreground/80 mb-4">
                We believe that great clothing should be accessible to everyone. That's why we combine traditional tailoring techniques with modern design to create pieces that are both timeless and contemporary.
              </p>
              <p className="text-lg text-foreground/80">
                Each garment is crafted with meticulous attention to detail, using only the finest materials sourced from around the world.
              </p>
            </div>
            <div className="bg-secondary rounded-lg p-8 h-96 flex items-center justify-center">
              <img 
                src="/luxury-men-s-clothing-workshop.jpg"
                alt="Our workshop"
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-secondary py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Quality</h3>
                <p className="text-foreground/80">
                  We never compromise on quality. Every stitch, every seam, and every fabric is carefully selected to ensure excellence.
                </p>
              </div>
              <div className="bg-background p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Sustainability</h3>
                <p className="text-foreground/80">
                  We're committed to sustainable practices, using eco-friendly materials and ethical manufacturing processes.
                </p>
              </div>
              <div className="bg-background p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                <p className="text-foreground/80">
                  We continuously innovate to bring you the latest trends while maintaining timeless quality and elegance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Master Tailor', 'Design Director', 'Quality Manager'].map((role, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-muted rounded-lg mb-4 h-64 flex items-center justify-center overflow-hidden">
                  <img 
                    src={`/.jpg?height=256&width=256&query=${role}%20portrait`}
                    alt={role}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{role}</h3>
                <p className="text-foreground/80">Dedicated professional with years of expertise</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
