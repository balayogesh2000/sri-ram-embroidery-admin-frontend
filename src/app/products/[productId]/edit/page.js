"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useParams } from "next/navigation";

export default function EditProduct() {
  const [previewImage, setPreviewImage] = useState(null);
  const [initialValues, setInitialValues] = useState({
    title: "",
    price: "",
    image: null,
  });
  const router = useRouter();
  const { productId } = useParams();

  // Fetch the existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.products.getById(productId);
        const product = response.data;

        setInitialValues({
          title: product.title,
          price: product.price,
          image: product.image,
        });

        if (product.image) {
          setPreviewImage(product.image);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Allow formik to reinitialize when initialValues change
    validationSchema: Yup.object({
      title: Yup.string().required("Product title is required"),
      price: Yup.string()
        .matches(/^\d*$/, "Price must contain only numbers")
        .required("Price is required"),
      image: Yup.mixed().required("Image is required"),
    }),
    onSubmit: async (values) => {
      try {
        const productData = new FormData();
        productData.append("title", values.title);
        productData.append("price", values.price);
        productData.append("image", values.image);

        await api.products.update(productId, productData);

        console.log("Product updated:", values);
        alert("Product updated successfully!");

        // Redirect to the product list or details page
        router.push("/products");
      } catch (error) {
        console.error("Failed to update product:", error);
        alert("Failed to update product. Please try again.");
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("image", null);
    setPreviewImage(null);
    document.getElementById("image").value = "";
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      formik.setFieldValue("price", value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Edit Product</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Product Title
            </label>
            <input
              type="text"
              id="name"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter product title"
            />
            {formik.touched.title && formik.errors.title ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
            ) : null}
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="text"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={handlePriceChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                formik.touched.price && formik.errors.price
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter product price"
            />
            {formik.touched.price && formik.errors.price ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
            ) : null}
          </div>

          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                formik.touched.image && formik.errors.image
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {formik.touched.image && formik.errors.image ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
            ) : null}
            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-auto rounded-lg mb-2"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
