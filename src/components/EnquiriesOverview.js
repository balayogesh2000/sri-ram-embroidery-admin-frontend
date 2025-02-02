import Link from "next/link";

const EnquiriesOverview = ({ totalEnquiries, latestEnquiries }) => {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      {/* Top Section: Total Enquiries and View All Button */}
      <div className="flex justify-between items-center mb-6">
        {/* Total Enquiries */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Total Enquiries
          </h2>
          <p className="text-3xl font-bold text-green-600">{totalEnquiries}</p>
        </div>

        {/* View All Enquiries Button */}
        <Link href="/enquiries">
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-200">
            View All Enquiries
          </button>
        </Link>
      </div>

      {/* Enquiries Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Customer Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">
                Mobile
              </th>
            </tr>
          </thead>
          <tbody>
            {latestEnquiries.map((enquiry) => (
              <tr
                key={enquiry._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-sm text-gray-700">
                  {enquiry.customerDetails.fullName}
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">
                  {enquiry.customerDetails.mobile}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiriesOverview;
