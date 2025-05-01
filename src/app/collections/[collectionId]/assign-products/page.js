// pages/collections/[collectionId]/assign-products/page.js

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "react-toastify";
import PageHeader from "@/components/PageHeader";

export default function AssignProductsPage() {
  const { collectionId } = useParams();
  const router = useRouter();
  const [allProducts, setAllProducts] = useState([]);
  const [assignedProducts, setAssignedProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          {
            data: { products: assignableProducts },
          },
          { data: cData },
        ] = await Promise.all([
          api.collections.getAssignableProducts(collectionId),
          api.collections.getOne(collectionId),
        ]);
        setAllProducts(assignableProducts);
        setAssignedProducts(cData.collection.products || []);
      } catch (error) {
        toast.error("Failed to fetch assignable products or collection");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [collectionId]);

  const filtered = allProducts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    setAssigning(true);
    try {
      const toAssign = allProducts.filter((p) => selected.includes(p._id));
      const updatedProducts = [...assignedProducts, ...toAssign];
      await api.collections.assignProducts(collectionId, {
        productIds: updatedProducts.map((p) => p._id),
      });
      toast.success("Products assigned successfully!");
      router.push(`/collections/${collectionId}`);
    } catch (error) {
      toast.error("Failed to assign products");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <PageHeader
        title={"Assign Products"}
        buttons={
          <>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              onClick={handleAssign}
              disabled={selected.length === 0 || assigning}
            >
              {assigning ? "Assigning..." : "Assign"}
            </button>
          </>
        }
      />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded p-2"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-h-64 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {filtered.length === 0 && (
            <div className="text-gray-500">No products found.</div>
          )}
          {filtered.map((product) => (
            <div
              key={product._id}
              className={`flex items-center border rounded p-2 gap-3 cursor-pointer ${
                selected.includes(product._id)
                  ? "bg-blue-100 border-blue-500"
                  : ""
              }`}
              onClick={() => toggleSelect(product._id)}
            >
              <input
                type="checkbox"
                checked={selected.includes(product._id)}
                onChange={() => toggleSelect(product._id)}
                className="mr-2"
                onClick={(e) => e.stopPropagation()}
              />
              <img
                src={product.firstImage?.s3Location || "/placeholder.png"}
                alt={product.title}
                className="w-12 h-12 object-cover rounded border"
              />
              <div className="flex-1">
                <div className="font-semibold">{product.title}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
