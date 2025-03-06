"use client";

import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import InputForm from "@/components/EditProduct/InputForm";
import ImageUpload from "@/components/EditProduct/ImageUpload";

export default function EditProduct() {
  const router = useRouter();
  const { productId } = useParams();

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
      images: [], // array of {s3Location, s3Key}
      imagesToRemove: [], // array of s3 keys
      newImages: [], // array of files
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
    }),
    onSubmit: async (values) => {
      try {
        const productData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (!["images", "imagesToRemove", "newImages"].includes(key)) {
            productData.append(key, value);
          }
        });
        values.imagesToRemove.forEach((s3Key) =>
          productData.append("imagesToRemove", s3Key)
        );
        values.newImages.forEach((file) =>
          productData.append("newImages", file)
        );
        await api.products.update(productId, productData);
        toast.success("Product updated successfully!");
        router.push("/products");
      } catch (error) {
        handleError(error);
      }
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const {
          data: { product },
        } = await api.products.getOne(productId);
        formik.setValues({
          title: product.title,
          shortDescription: product.shortDescription,
          originalPrice: product.originalPrice,
          price: product.price,
          material: product.material,
          dimensions: product.dimensions,
          embroideryType: product.embroideryType,
          closureType: product.closureType,
          pockets: product.pockets,
          images: product.images,
          imagesToRemove: [],
          newImages: [],
        });
      } catch (error) {
        handleError(error);
      }
    };

    fetchProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 flex-grow text-center">
          Edit Product
        </h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-wrap gap-4">
        <InputForm formik={formik} />
        <ImageUpload formik={formik} />
        <div className="w-full mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
