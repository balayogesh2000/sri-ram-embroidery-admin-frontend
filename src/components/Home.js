"use client";

import withAuth from "@/hoc/withAuth";

const Home = () => {
  // Mock data for number of products and enquiries
  const numberOfProducts = 120;
  const numberOfEnquiries = 25;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Products Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Number of Products
          </h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {numberOfProducts}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Total products available in the system
          </p>
        </div>

        {/* Enquiries Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Number of Enquiries
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {numberOfEnquiries}
          </p>
          <p className="text-sm text-gray-500 mt-2">Total enquiries received</p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
