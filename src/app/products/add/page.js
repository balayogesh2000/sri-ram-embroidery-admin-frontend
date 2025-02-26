"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function AddProduct() {
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
    },
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue("images", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Add Product</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            <div key={name}>
              <label
                className="block text-gray-700 font-medium mb-2"
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
                className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                  formik.touched[name] && formik.errors[name]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
              {formik.touched[name] && formik.errors[name] ? (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors[name]}
                </p>
              ) : null}
            </div>
          ))}

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="images"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleImageChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            />
            {formik.errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.images}
              </p>
            )}
            {previewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt="Preview"
                    className="w-full h-auto rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
