"use client";

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

const EnquiryDetails = ({ enquiry }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Enquiry Details</h1>

      {/* Customer Information */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold">Customer Information</h2>
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
      <div className="border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {enquiry.cart.map(({ _id, product, quantity }) => (
          <div
            key={_id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center gap-4">
              <Image
                src={product?.images[0]?.s3Location}
                alt={product.title}
                width={60}
                height={60}
              />
              <div>
                <Link href={`/products/${product._id}`}>
                  <p className="font-medium blue-600 underline">
                    {product.title}
                  </p>
                </Link>
                <p className="text-gray-500">
                  ₹{product.price} x {quantity}
                </p>
              </div>
            </div>
            <p className="font-semibold">₹{product.price * quantity}</p>
          </div>
        ))}
        <p className="text-lg font-bold text-right mt-2">
          Total: ₹{enquiry.totalAmount}
        </p>
      </div>
    </div>
  );
};

export default EnquiryDetails;
