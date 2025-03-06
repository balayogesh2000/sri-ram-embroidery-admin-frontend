import { useState } from "react";
import { Upload, X } from "lucide-react";

const ImageUpload = ({ formik }) => {
  const [previewImages, setPreviewImages] = useState([]);

  // Handle new image uploads
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = [...formik.values.newImages, ...files];

    // Generate preview URLs
    const previewUrls = newImages.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);

    // Update formik values
    formik.setFieldValue("newImages", newImages);
  };

  // Remove an existing image
  const removeExistingImage = (index) => {
    const updatedImages = [...formik.values.images];
    const removedImage = updatedImages.splice(index, 1)[0];

    formik.setFieldValue("images", updatedImages);
    formik.setFieldValue("imagesToRemove", [
      ...formik.values.imagesToRemove,
      removedImage.s3Key,
    ]);
  };

  // Remove a newly added image
  const removeNewImage = (index) => {
    const updatedNewImages = [...formik.values.newImages];
    updatedNewImages.splice(index, 1);

    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);

    setPreviewImages(updatedPreviewImages);
    formik.setFieldValue("newImages", updatedNewImages);
  };

  return (
    <div className="w-full">
      <label className="block text-gray-700 font-medium mb-2">Images</label>

      {/* File Upload Input (Hidden) */}
      <input
        type="file"
        id="images"
        name="images"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Upload Button */}
      <label
        htmlFor="images"
        className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer w-32 hover:bg-blue-600"
      >
        <Upload size={20} className="mr-2" /> Upload
      </label>

      {/* Existing Images */}
      {formik.values.images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {formik.values.images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.s3Location}
                alt="Product"
                className="w-full h-auto rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeExistingImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* New Image Previews */}
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
                onClick={() => removeNewImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
