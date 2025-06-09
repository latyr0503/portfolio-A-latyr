"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  prefix?: string;
  prefixPosition?: "left" | "right";
  error?: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  inputSize?: "small" | "medium" | "large";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      iconPosition = "left",
      prefix,
      prefixPosition = "left",
      error,
      label,
      helperText,
      required,
      id,
      inputSize = "medium",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const inputId = id || React.useId();
    const [isFocused, setIsFocused] = React.useState(false);
    const sizeClasses = {
      small: "h-10 text-sm",
      medium: "h-12 text-base",
      large: "h-14 text-lg",
    } as const;

    return (
      <div className="w-full space-y-0.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-blackTitle "
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div
          className={cn(
            "relative flex w-full items-center rounded-md transition-colors",
            isFocused && "ring-0",
            error && "border-red-500 focus:border-red-500"
          )}
        >
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 text-orangeCopper">{icon}</div>
          )}
          {prefix && prefixPosition === "left" && (
            <div className="min-h-11 shrink-0 border-y border-l border-border-primary bg-muted px-3 py-2 text-muted-foreground">
              {prefix}
            </div>
          )}
          <input
          
            id={inputId}
            type={type === "password" && showPassword ? "text" : type}
            className={cn(
              "flex size-full min-h-11 rounded-md border border-border-primary bg-background-primary py-2 text-sm transition-colors",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-blackTitle/50",
              "focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              icon
                ? iconPosition === "left"
                  ? "pl-[2.75rem] pr-3"
                  : "pl-3 pr-[2.75rem]"
                : "px-3",
              prefix && "grow-1",
              error && "border-red-500 focus:border-red-500",
              className,
              sizeClasses[inputSize]
            )}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                ? `${inputId}-helper`
                : undefined
            }
            {...props}
          />
          {icon && iconPosition === "right" && (
            <div className="absolute right-3 text-muted-foreground">{icon}</div>
          )}
          {type == "password" && (
            <div className="absolute right-3 text-muted-foreground">
              {showPassword ? (
                <EyeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-4 h-4 cursor-pointer"
                />
              ) : (
                <EyeOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="w-4 h-4 cursor-pointer"
                />
              )}
            </div>
          )}
          {prefix && prefixPosition === "right" && (
            <div className="min-h-11 shrink-0 border-y border-r border-border-primary bg-muted px-3 py-2 text-muted-foreground">
              {prefix}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-helper`}
            className={cn(
              "text-sm",
              error ? "text-red-500" : "text-muted-foreground"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
