import { useField } from "formik";
import Input from "@/components/ui/Input";

const FormikInput = ({ label, className = "", ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className={className}>
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <Input
        {...field}
        {...props}
        className={meta.touched && meta.error ? "border-red-500" : ""}
      />
      {meta.touched && meta.error && (
        <p className="mt-1 text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default FormikInput;
