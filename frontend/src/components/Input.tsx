import { forwardRef } from "react";

type Props = {
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  label: string;
  error?: { message?: string };
  props?: Record<string, any>;
};

const Input = forwardRef(({ type, label, error, ...props }: Props, ref) => {
  return (
    <div className="relative w-full">
      <input
        ref={ref}
        type={type}
        {...props}
        className={`w-full px-3 pt-4 pb-2 border rounded-md outline-none transition-all bg-transparent border-gray-300 focus:border-blue-500 peer ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base transition-all duration-200 ease-in-out peer-valid:top-0 peer-valid:text-xs peer-valid:bg-white peer-valid:px-1 peer-valid:text-blue-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:bg-white peer-focus:px-1">
        {label}
      </div>
      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </div>
  );
});

export default Input;
