import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ product, handleArchiveProduct }) => {
  const router = useRouter();

  const handleEditProduct = (id) => {
    router.push(`/products/${id}/edit`);
  };

  return (
    <div
      key={product._id}
      className="bg-white rounded-md shadow-md overflow-hidden p-3"
    >
      <Image
        src={product.images?.[0]?.s3Location || "/placeholder.png"}
        alt={product.title}
        width={300}
        height={200}
        className="w-full h-auto max-h-40 object-contain rounded-md cursor-pointer"
        onClick={() => router.push(`/products/${product._id}`)}
      />
      <div className="mt-3">
        {/* Title with ellipsis if too long */}
        <h2 className="text-sm font-semibold truncate">{product.title}</h2>

        <div className="flex justify-between items-center mt-1">
          {/* Price in green on the left */}
          <p className="text-green-600 font-medium">₹{product.price}</p>

          {/* Edit & Archive buttons on the right end */}
          <div className="flex gap-2 w-1/2">
            <button
              onClick={() => handleEditProduct(product._id)}
              className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-yellow-600 w-1/2"
            >
              Edit
            </button>
            <button
              onClick={() => handleArchiveProduct(product._id)}
              className="bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-red-600 w-1/2"
            >
              Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
