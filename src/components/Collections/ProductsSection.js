import { useRouter, usePathname } from "next/navigation";

const ProductsSection = ({ products, onRemove }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-bold tracking-wide text-gray-800 dark:text-gray-100">
          Products
        </p>
        <button
          className="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => router.push(`${pathname}/assign-products`)}
        >
          Assign Product
        </button>
      </div>
      {products.length === 0 && (
        <div className="text-gray-500 dark:text-gray-300 text-center">
          No products in this collection.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded p-3 flex gap-4 items-center relative bg-white shadow"
          >
            <img
              src={product.images[0]?.s3Location || "/placeholder.png"}
              alt={product.title}
              className="w-20 h-20 object-cover rounded border"
            />
            <div className="flex-1">
              <div className="font-semibold">{product.title}</div>
              <div className="text-sm text-gray-600">{product.description}</div>
            </div>
            <button
              className="text-red-500 hover:underline ml-4"
              onClick={() => onRemove(product._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
