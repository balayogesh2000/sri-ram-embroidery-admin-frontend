"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import handleError from "@/utils/handleError";
import { toast } from "react-toastify";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { productId } = useParams();

  const handleBackClick = () => {
    router.back();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const {
          data: { product },
        } = await api.products.getOne(productId);
        setProduct(product);
      } catch (error) {
        handleError(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p className="text-center py-10">Product not found</p>;

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleRestoreProduct = async (id) => {
    if (confirm("Are you sure you want to restore this product?")) {
      try {
        const {
          data: { product },
        } = await api.products.restore(id);
        setProduct(product);
        toast.success("Product restored successfully!");
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleArchiveProduct = async (id) => {
    if (confirm("Are you sure you want to archive this product?")) {
      try {
        const {
          data: { product },
        } = await api.products.archive(id);
        setProduct(product);
        toast.success("Product archived successfully!");
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <section className="mx-auto">
      <div className="mb-6">
        <button onClick={handleBackClick} className="text-gray-600">
          <ArrowLeft size={24} />
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        {/* Image Carousel Section */}
        <div className="relative w-full h-auto flex flex-col justify-center">
          <Carousel className="relative h-full">
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-96">
                    <Image
                      src={image.s3Location}
                      alt={`Handbag ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white" />
            <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white" />
          </Carousel>
        </div>

        {/* Product Details */}
        <div>
          <div className="flex items-center gap-2">
            {product.archived ? (
              <>
                <div className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md w-fit">
                  Archived
                </div>
                <button
                  onClick={() => handleRestoreProduct(product._id)}
                  className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md hover:bg-green-600"
                >
                  Restore
                </button>
              </>
            ) : (
              <>
                <div className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md w-fit">
                  Active
                </div>
                <button
                  onClick={() => handleArchiveProduct(product._id)}
                  className="bg-gray-500 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md hover:bg-gray-600"
                >
                  Archive
                </button>
              </>
            )}
          </div>

          <h1 className="text-3xl font-semibold text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-600 mt-2">{product.shortDescription}</p>
          <p className="text-xl font-semibold text-gray-500 line-through">
            ₹{product.originalPrice}
          </p>
          <p className="text-2xl font-bold text-green-600">
            ₹{product.price}{" "}
            <span className="text-sm font-medium text-red-500">
              ({discountPercentage}% off)
            </span>
          </p>
          {/* Specifications */}
          <ul className="mt-4 space-y-2 text-gray-700 text-sm">
            <li>
              <span className="font-semibold">Material:</span>{" "}
              {product.material}
            </li>
            <li>
              <span className="font-semibold">Size:</span> {product.dimensions}
            </li>
            <li>
              <span className="font-semibold">Embroidery Type:</span>{" "}
              {product.embroideryType}
            </li>
            <li>
              <span className="font-semibold">Closure:</span>{" "}
              {product.closureType}
            </li>
            <li>
              <span className="font-semibold">Pockets:</span> {product.pockets}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
