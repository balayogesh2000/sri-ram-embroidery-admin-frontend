"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft, X, Upload, Plus } from "lucide-react";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import withAuth from "@/hoc/withAuth";
import PageHeader from "@/components/PageHeader";

function AddProduct() {
  const router = useRouter();
  const [previewImages, setPreviewImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      shortDescription: "",
      originalPrice: "",
      price: "",
      material: "",
      dimensions: "",
      embroideryType: "",
      closureType: "",
      pockets: "",
      images: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Product title is required"),
      shortDescription: Yup.string().required("Short description is required"),
      originalPrice: Yup.number().required("Original price is required"),
      price: Yup.number().required("Price is required"),
      material: Yup.string().required("Material is required"),
      dimensions: Yup.string().required("Dimensions are required"),
      embroideryType: Yup.string().required("Embroidery type is required"),
      closureType: Yup.string().required("Closure type is required"),
      pockets: Yup.string().required("Pocket details are required"),
      images: Yup.array().min(1, "At least one image is required"),
    }),
    onSubmit: async (values) => {
      try {
        const productData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (key === "images") {
            value.forEach((file) => productData.append("images", file));
          } else {
            productData.append(key, value);
          }
        });
        await api.products.create(productData);
        formik.resetForm();
        setPreviewImages([]);
        toast.success("Product added successfully!");
        router.push("/products");
      } catch (error) {
        handleError(error);
      }
    },
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [...formik.values.images, ...files];
    formik.setFieldValue("images", newImages);
    const newPreviews = [
      ...previewImages,
      ...files.map((file) => URL.createObjectURL(file)),
    ];
    setPreviewImages(newPreviews);
  };

  const removeImage = (index) => {
    const newImages = [...formik.values.images];
    const newPreviews = [...previewImages];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    formik.setFieldValue("images", newImages);
    setPreviewImages(newPreviews);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <PageHeader
        title="Add Product"
        onBackClick={() => router.push("/products")}
      />

      {/* Form Section */}
      <form onSubmit={formik.handleSubmit} className="flex flex-wrap gap-4">
        {[
          { name: "title", label: "Product Title", type: "text" },
          {
            name: "shortDescription",
            label: "Short Description",
            type: "text",
          },
          { name: "originalPrice", label: "Original Price", type: "number" },
          { name: "price", label: "Discounted Price", type: "number" },
          { name: "material", label: "Material", type: "text" },
          { name: "dimensions", label: "Dimensions", type: "text" },
          { name: "embroideryType", label: "Embroidery Type", type: "text" },
          { name: "closureType", label: "Closure Type", type: "text" },
          { name: "pockets", label: "Pockets", type: "text" },
        ].map(({ name, label, type }) => (
          <div key={name} className="flex-1 min-w-[250px]">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor={name}
            >
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
            )}
          </div>
        ))}

        {/* Image Upload */}
        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">Images</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
          <label
            htmlFor="images"
            className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer w-32 hover:bg-blue-600"
          >
            <Upload size={20} className="mr-2" /> Upload
          </label>
          {formik.touched.images && formik.errors.images && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.images}</p>
          )}
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {previewImages.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt="Preview"
                    className="w-full h-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(AddProduct);
