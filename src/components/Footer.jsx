import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-gray-50 text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left">
          
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">SunCart</h3>
            <p className="text-sm text-gray-500 max-w-sm">
              Your premium destination for seasonal summer essentials. Stay cool, protected, and stylish all season long.
            </p>
          </div>

          {/* Policy Links */}
          <div className="flex flex-col space-y-2 text-sm">
            <h4 className="font-semibold text-gray-900 mb-1">Company</h4>
            <Link href="/" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-orange-500 transition-colors">Terms of Service</Link>
          </div>

          <div className="text-sm">
            <h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
            <p className="text-gray-500">Email: suncart@emran.work</p>
            <p className="text-gray-500 mb-4">Location: Dhaka, Bangladesh</p>
          </div>

        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} SunCart Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}