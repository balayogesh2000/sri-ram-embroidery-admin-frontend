import Link from "next/link";

const CollectionsOverview = ({ totalCollections, latestCollections }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      {/* Top Section: Total Collections and View All Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Total Collections */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Total Collections
          </h2>
          <p className="text-3xl font-bold text-blue-600">{totalCollections}</p>
        </div>

        {/* View All Collections Button */}
        <Link href="/collections">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            View All Collections
          </button>
        </Link>
      </div>

      {/* Collections Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Collection Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                No. of Products
              </th>
            </tr>
          </thead>
          <tbody>
            {latestCollections && latestCollections.length > 0 ? (
              latestCollections.map((collection) => (
                <tr
                  key={collection._id || collection.name}
                  className="border-b border-gray-200 hover:bg-blue-50"
                >
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {collection.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    {collection.productsCount}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-4 text-center text-gray-400">
                  No collections found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionsOverview;
