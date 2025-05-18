// pages/collections/[collectionId].js

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Edit2, X } from "lucide-react";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import { toast } from "react-toastify";
import ProductsSection from "@/components/Collections/ProductsSection";
import PageHeader from "@/components/PageHeader";
import withAuth from "@/hoc/withAuth";

const CollectionPage = () => {
  const { collectionId } = useParams();
  const router = useRouter();
  const [collection, setCollection] = useState(null);
  // const [allProducts, setAllProducts] = useState([]); // Removed as products are handled separately
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", image: "" });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const {
          data: { collection },
        } = await api.collections.getOne(collectionId);
        setCollection(collection);
        setForm({
          name: collection.name || "",
          description: collection.description || "",
          image: collection.image?.s3Location || "",
        });
        setImageFile(null);
      } catch (error) {
        handleError(error);
      }
    };

    fetchCollection();
  }, [collectionId]);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditing(false);
    setForm({
      name: collection.name || "",
      description: collection.description || "",
      image: collection.image?.s3Location || "",
    });
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setImageFile(files[0]);
      setForm((prev) => ({ ...prev, image: URL.createObjectURL(files[0]) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedData = { ...form };
      if (imageFile) {
        // Assuming you have an API endpoint for image upload
        const formData = new FormData();
        formData.append("image", imageFile);
        const { data } = await api.collections.uploadImage(
          collectionId,
          formData
        );
        updatedData.image = data.imageUrl;
      }
      await api.collections.update(collectionId, updatedData);
      toast.success("Collection updated successfully!");
      setEditing(false);
      setCollection({ ...collection, ...updatedData });
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    try {
      await api.collections.delete(collectionId);
      toast.success("Collection deleted successfully!");
      router.push("/collections");
    } catch (error) {
      handleError(error);
    }
  };

  if (!collection) return <div className="p-4">Loading...</div>;

  // Remove product from collection (view mode)
  const handleRemoveProduct = async (productId) => {
    const updatedProducts = collection.products.filter(
      (p) => (p._id || p) !== productId
    );
    setCollection({ ...collection, products: updatedProducts });
    await api.collections.removeProduct({ collectionId, productId });
    toast.success("Product removed from collection successfully!");
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <PageHeader
        title="Collection Details"
        onBackClick={() => router.push("/collections")}
        buttons={
          <>
            <button
              className="text-blue-500 hover:underline flex items-center gap-1"
              onClick={handleEdit}
            >
              <Edit2 className="w-4 h-4" /> Edit
            </button>
            <button
              className="text-red-500 hover:underline flex items-center gap-1"
              onClick={handleDelete}
            >
              <X className="w-4 h-4" /> Delete
            </button>
          </>
        }
      />
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <div>
            <span className="font-medium">Name:</span> {collection.name}
          </div>
          <div>
            <span className="font-medium">Description:</span>{" "}
            {collection.description}
          </div>
        </div>
      )}
      <ProductsSection
        products={collection.products || []}
        onRemove={handleRemoveProduct}
      />
    </div>
  );
};

export default withAuth(CollectionPage);
