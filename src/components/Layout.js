"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const Layout = ({ children }) => {
  const { logout, isLoggedIn } = useAuth();
  return (
    <>
      {isLoggedIn ? (
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="w-64 bg-blue-800 text-white hidden md:block">
            {/* Logo */}
            <div className="p-6 text-2xl font-bold text-center">Gandhiram</div>

            {/* Navigation Links */}
            <nav className="mt-6">
              <Link href="/" className="block py-2.5 px-4 hover:bg-blue-700">
                Home
              </Link>
              <Link
                href="/products"
                className="block py-2.5 px-4 hover:bg-blue-700"
              >
                Products
              </Link>
              <Link
                href="/enquiries"
                className="block py-2.5 px-4 hover:bg-blue-700"
              >
                Enquiries
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow-sm p-4 flex justify-between items-center">
              <h1 className="text-xl font-semibold">Admin Panel</h1>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={logout}
              >
                Logout
              </button>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 bg-gray-50">
              {children}
            </main>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;
