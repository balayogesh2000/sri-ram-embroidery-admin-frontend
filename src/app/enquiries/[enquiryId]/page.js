"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import handleError from "@/utils/handleError";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
};

const Enquiry = () => {
  const { enquiryId } = useParams();
  const router = useRouter();
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const {
          data: { enquiry },
        } = await api.enquiries.getById(enquiryId);
        setEnquiry(enquiry);
      } catch (error) {
        handleError(error);
      }
    };

    fetchEnquiry();
  }, [enquiryId]);

  if (!enquiry) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header with Back Button and Title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <ArrowLeft
            className="cursor-pointer text-gray-700 hover:text-black"
            onClick={() => router.back()}
          />
          <h1 className="text-2xl font-bold">Enquiry Details</h1>
        </div>
      </div>

      {/* Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-lg p-6">
        {/* Customer Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">
            Customer Information
          </h2>
          <p>
            <strong>Name:</strong> {enquiry.customerDetails.fullName}
          </p>
          <p>
            <strong>Mobile:</strong> {enquiry.customerDetails.mobile}
          </p>
          <p>
            <strong>Address:</strong> {enquiry.customerDetails.address}
          </p>
          {enquiry.customerDetails.notes && (
            <p>
              <strong>Notes:</strong> {enquiry.customerDetails.notes}
            </p>
          )}
          <p>
            <strong>Enquired At:</strong> {formatDateTime(enquiry.createdAt)}
          </p>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Order Summary</h2>
          <div className="space-y-4">
            {enquiry.cart.map(({ _id, product, quantity }) => (
              <div
                key={_id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={product?.images[0]?.s3Location}
                    alt={product.title}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div>
                    <Link
                      href={`/products/${product._id}`}
                      className="text-blue-600 underline font-medium"
                    >
                      {product.title}
                    </Link>
                    <p className="text-gray-500">
                      ₹{product.price} x {quantity}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900">
                  ₹{product.price * quantity}
                </p>
              </div>
            ))}
          </div>
          <p className="text-lg font-bold text-right text-gray-900 mt-4">
            Total: ₹{enquiry.totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
