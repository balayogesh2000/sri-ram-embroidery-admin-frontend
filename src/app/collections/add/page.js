"use client";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";

import api from "@/lib/api";
import handleError from "@/utils/handleError";
import PageHeader from "@/components/PageHeader";
import withAuth from "@/hoc/withAuth";

const AddCollection = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Collection name is required"),
      description: Yup.string().required("Description is required"),
      // Removed image validation
    }),
    onSubmit: async (values) => {
      try {
        await api.collections.create({
          name: values.name,
          description: values.description,
        });
        formik.resetForm();
        toast.success("Collection added successfully!");
        router.push("/collections");
      } catch (error) {
        handleError(error);
      }
    },
  });

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <PageHeader
        title="Add Collection"
        onBackClick={() => router.push("/collections")}
      />
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full border rounded p-2"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-full border rounded p-2"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm">
              {formik.errors.description}
            </div>
          )}
        </div>
        {/* Image upload removed */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Adding..." : "Add Collection"}
        </button>
      </form>
    </div>
  );
};

export default withAuth(AddCollection);
