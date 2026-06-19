import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-semibold text-white">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <span className="text-xs font-medium text-gray-400">{product.brand}</span>
        <h3 className="mt-1 text-sm font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <span className="text-xs font-medium text-amber-500">★ {product.rating}</span>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="mt-4 block w-full rounded-xl bg-gray-900 py-2.5 text-center text-xs font-semibold text-white transition-colors hover:bg-orange-500"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}