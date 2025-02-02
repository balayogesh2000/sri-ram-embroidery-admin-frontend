"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const Header = () => {
  const authCtx = useAuth();

  const handleLogout = () => {
    authCtx.logout();
  };

  if (!authCtx.isLoggedIn) {
    return null;
  }

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="flex justify-between items-center p-3">
        {/* Left Side: Gandhiram - clickable link */}
        <Link
          href="/"
          className="text-lg font-medium text-gray-800 cursor-pointer hover:underline"
        >
          Gandhiram
        </Link>

        {/* Right Side: Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 focus:outline-none transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
