"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-orange-100 bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-wider text-orange-500">
              ☀️ Sun<span className="text-amber-500">Cart</span>
            </Link>
          </div>

          <div className="hidden space-x-8 md:flex">
            <Link href="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Home
            </Link>
            <Link href="/" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Products
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">
              My Profile
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={session.user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt={session.user.name}
                  className="h-9 w-9 rounded-full border-2 border-orange-400 object-cover"
                />
                <button 
                  onClick={handleLogout}
                  className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/login" 
                  className="text-sm font-medium text-gray-600 hover:text-orange-500 px-3 py-2 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}