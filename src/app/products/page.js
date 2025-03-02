"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import handleError from "@/utils/handleError";
import { toast } from "react-toastify";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const {
          data: { products },
        } = await api.products.getAllActiveProducts();
        setProducts(products);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    router.push("/products/add");
  };

  const handleViewArchived = () => {
    router.push("/products/archived");
  };

  const handleArchiveProduct = async (id) => {
    if (confirm("Are you sure you want to archive this product?")) {
      try {
        await api.products.archive(id);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        toast.success("Product archived successfully!");
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex gap-3">
            <button
              onClick={handleViewArchived}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-600"
            >
              View Archived Products
            </button>
            <button
              onClick={handleAddProduct}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-md shadow-md overflow-hidden p-3"
              >
                <Image
                  src={product.images?.[0]?.s3Location || "/placeholder.png"}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="w-full h-auto max-h-40 object-contain rounded-md cursor-pointer"
                  onClick={() => router.push(`/products/${product._id}`)}
                />
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-md font-semibold">{product.title}</h2>
                    <p className="text-gray-700 font-medium">
                      ₹{product.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleArchiveProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md hover:bg-red-600"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
