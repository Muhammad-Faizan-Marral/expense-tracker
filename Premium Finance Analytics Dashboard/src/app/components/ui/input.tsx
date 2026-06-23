import * as React from "react";
import { cn } from "./utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "border rounded-md px-3 py-2 w-full",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };