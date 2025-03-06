const InputForm = ({ formik }) => {
  return (
    <>
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
    </>
  );
};

export default InputForm;
