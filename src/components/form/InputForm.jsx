import { CircleAlert } from "lucide-react";

function InputForm({
  error,
  register,
  name,
  type = "text",
  placeholder = "",
  isLoading,
}) {
  return (
    <div>
      <input
        {...register(name)}
        disabled={isLoading}
        className={`w-full ${
          isLoading
            ? "pointer-events-none bg-roamology/20 animate-pulse"
            : "bg-roamology/30"
        } rounded-full py-2 px-4 ${
          error ? "outline-1 outline-red-500" : "outline-0"
        } placeholder:text-roamology text-gray-600 hover:shadow-md hover:outline-1 hover:outline-roamology duration-100`}
        type={type}
        placeholder={placeholder}
      />
      {error && (
        <p className="text-red-500 text-xs flex gap-0.5 items-center">
          <CircleAlert strokeWidth={1.8} width={14} />
          {error}
        </p>
      )}
    </div>
  );
}
export default InputForm;
