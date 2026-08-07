import { forwardRef, InputHTMLAttributes } from "react";

type StyledInputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?: string;
  };

const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`w-full rounded border px-3 py-2 duration-200 disabled:cursor-not-allowed disabled:text-zinc-400 disabled:dark:text-zinc-600 ${className}`}
      />
    );
  }
);

StyledInput.displayName = "StyledInput";

export default StyledInput;