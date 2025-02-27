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

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { productId } = useParams();

  const handleBackClick = () => {
    router.back(); // Navigate to the previous page
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

  return (
    <section className="mx-auto">
      <div className="mb-6">
        <button onClick={handleBackClick} className="text-gray-600">
          <ArrowLeft size={24} /> {/* Only the back icon */}
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
