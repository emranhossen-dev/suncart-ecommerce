import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import productsData from "@/data/products.json";
import Link from "next/link";
import { headers } from "next/headers";

export default async function ProductDetailsPage({ params }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Product Not Found</h2>
        <Link href="/" className="text-sm font-semibold text-orange-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 aspect-square w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="flex flex-col justify-between py-2">
          <div>
            <span className="text-xs font-bold tracking-wider text-orange-500 uppercase">
              {product.category}
            </span>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-gray-400">Brand: {product.brand}</p>
            
            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-black text-gray-900">${product.price}</span>
              <span className="rounded-md bg-amber-50 px-2.5 py-1 text-sm font-semibold text-amber-600">
                ★ {product.rating} Rating
              </span>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold text-gray-900">Description</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="font-medium text-gray-500">Availability</span>
              <span className={`font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                {product.stock > 0 ? `${product.stock} Units In Stock` : "Out of Stock"}
              </span>
            </div>
            
            <button
              disabled={product.stock === 0}
              className="w-full rounded-xl bg-orange-500 py-4 text-center text-sm font-bold text-white shadow-md hover:bg-orange-600 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
            >
              Add to Cart
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}