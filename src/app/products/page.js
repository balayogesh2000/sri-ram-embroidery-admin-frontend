"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Archive, Plus } from "lucide-react";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import ProductCard from "@/components/Products/ProductCard";
import PageHeader from "@/components/PageHeader";
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

  const handleDeleteProduct = async (id) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;
    try {
      await api.products.delete(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      toast.success("Product deleted successfully");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <PageHeader
          title="Products"
          buttons={
            <>
              <button
                onClick={() => router.push("/products/archived")}
                className="flex items-center justify-center gap-2 bg-red-500 text-white text-sm px-3 py-2 rounded-md shadow-sm hover:bg-red-600 transition w-full sm:w-auto"
              >
                <Archive className="w-4 h-4" />
                View Archived
              </button>
              <button
                onClick={() => router.push("/products/add")}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white text-sm px-3 py-2 rounded-md shadow-sm hover:bg-blue-600 transition w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </>
          }
        />

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
