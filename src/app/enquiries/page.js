"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import handleError from "@/utils/handleError";
import api from "@/lib/api";

function formatDateTime(date) {
  if (!(date instanceof Date)) {
    date = new Date(date); // Convert if it's not already a Date object
  }

  return date
    .toLocaleString("en-IN", {
      day: "2-digit", // e.g., 29
      month: "short", // e.g., Jan
      year: "numeric", // e.g., 2025
      hour: "2-digit", // e.g., 07
      minute: "2-digit", // e.g., 01
      hour12: true, // Use 12-hour format
    })
    .replace(",", ""); // Remove unwanted comma
}

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchAllEnquiries = async () => {
      try {
        const {
          data: { enquiries },
        } = await api.enquiries.getAll();

        setEnquiries(enquiries);
      } catch (error) {
        handleError(error);
      }
    };

    fetchAllEnquiries();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">Enquiries</h1>
      <div className="w-full bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
        {enquiries.length === 0 ? (
          <p>No enquiries available</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b text-left">Customer Name</th>
                <th className="px-4 py-2 border-b text-left">Mobile</th>
                <th className="px-4 py-2 border-b text-left">Total Amount</th>
                <th className="px-4 py-2 border-b text-left">Created At</th>
                <th className="px-4 py-2 border-b text-left whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">
                    {enquiry.customerDetails.fullName}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {enquiry.customerDetails.mobile}
                  </td>
                  <td className="px-4 py-2 border-b">₹{enquiry.totalAmount}</td>
                  <td className="px-4 py-2 border-b">
                    {formatDateTime(enquiry.createdAt)}
                  </td>
                  <td className="px-4 py-2 border-b whitespace-nowrap">
                    <Link
                      href={`/enquiries/${enquiry._id}`}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition inline-block"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EnquiriesPage;
