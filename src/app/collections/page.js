"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import PageHeader from "@/components/PageHeader";
import withAuth from "@/hoc/withAuth";

const Collections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const {
          data: { collections },
        } = await api.collections.getAll();
        setCollections(collections);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <PageHeader
          title="Collections"
          onBackClick={() => router.push("/")}
          buttons={
            <button
              onClick={() => router.push("/collections/add")}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white text-sm px-3 py-2 rounded-md shadow-sm hover:bg-blue-700 transition w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" />
              Add Collection
            </button>
          }
        />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <div>Loading...</div>
          ) : collections.length === 0 ? (
            <div>No collections found.</div>
          ) : (
            collections.map((collection) => (
              <div
                key={collection._id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <h3 className="font-bold text-lg mb-2 truncate">
                  {collection.name}
                </h3>
                <p className="text-gray-600 mb-2 truncate">
                  {collection.description}
                </p>
                <div className="text-xs text-gray-400 mb-1">
                  {collection.products?.length || 0} products
                </div>
                <button
                  onClick={() => router.push(`/collections/${collection._id}`)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View / Edit
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Collections);
