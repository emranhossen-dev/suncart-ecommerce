import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function HomePage() {
  const popularProducts = productsData.slice(0, 3);

  const careTips = [
    { title: "Stay Hydrated", desc: "Drink at least 3 liters of water daily to maintain electrolyte levels." },
    { title: "Sun Protection", desc: "Apply broad-spectrum SPF 50 sunscreen 15 minutes before stepping out." },
    { title: "Wear Breathable Fabrics", desc: "Choose light-colored linen or cotton clothing to stay ventilated." }
  ];

  const brands = ["SunShade", "GlowBeach", "BreezeWear", "HydroChill"];

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center lg:text-left">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-xs font-semibold text-orange-600 animate__animated animate__fadeInDown">
              Hot Deals 🔥
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl animate__animated animate__fadeInLeft">
              Summer Sale <span className="text-orange-500">50% OFF</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Gear up for the sun. Explore our curated premium sunglasses, apparel, and skincare designed to keep you fresh all summer long.
            </p>
            <div className="mt-10">
              <Link href="/" className="rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600">
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Popular Products</h2>
          <p className="mt-2 text-sm text-gray-500">Our trending summer items chosen by shoppers this week.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Summer Care Tips Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Summer Care Tips</h2>
            <p className="mt-2 text-sm text-gray-500">Essential habits to stay healthy and vibrant in hot weather.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {careTips.map((tip, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
                  0{idx + 1}
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-800">{tip.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Brands Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Top Brands</h2>
          <p className="mt-1 text-sm text-gray-500">We partner with global manufacturers to deliver top-tier materials.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {brands.map((brand, idx) => (
            <div key={idx} className="flex h-24 items-center justify-center rounded-2xl border border-gray-100 bg-white p-4 shadow-sm hover:border-orange-200">
              <span className="text-base font-bold tracking-wider text-gray-400 uppercase">{brand}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}