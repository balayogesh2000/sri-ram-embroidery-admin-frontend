"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const PageHeader = ({ title, buttons, showBack = true, onBackClick }) => {
  const router = useRouter();

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        {/* Top Section: Back Button & Title */}
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={onBackClick || (() => router.back())}
              className="hover:text-gray-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        </div>

        {/* Bottom Section: Buttons (Moves to Next Line on Mobile) */}
        <div className="flex flex-col sm:flex-row sm:gap-3 gap-2 w-full sm:w-auto">
          {buttons}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
