import Link from "next/link";

const ProductsOverview = ({ totalProducts, latestProducts }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      {/* Top Section: Total Products and View All Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Total Products */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Total Products
          </h2>
          <p className="text-3xl font-bold text-orange-600">{totalProducts}</p>
        </div>

        {/* View All Products Button */}
        <Link href="/products">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-200">
            View All Products
          </button>
        </Link>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Product Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {latestProducts.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.title}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {product.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsOverview;
