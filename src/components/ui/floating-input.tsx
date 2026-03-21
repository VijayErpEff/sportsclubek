"use client";

import {
  forwardRef,
  useState,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils/cn";

/* -------------------------------------------------------------------------- */
/*  FloatingInput                                                             */
/* -------------------------------------------------------------------------- */

interface FloatingInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  /** The label text that floats above the input on focus or when filled */
  label: string;
  /** Input name attribute */
  name: string;
  /** Input type. Default "text" */
  type?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message to display below the input */
  error?: string;
  className?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      label,
      name,
      type = "text",
      required = false,
      error,
      className,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? `floating-input-${generatedId}`;
    const errorId = `${id}-error`;

    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      () => !!(value ?? defaultValue)
    );

    const isFloating = isFocused || hasValue;

    return (
      <div className={cn("relative", className)}>
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "peer w-full rounded-lg border bg-white px-4 pt-5 pb-2 text-neutral-900 text-base outline-none transition-colors duration-200",
            "focus:ring-2 focus:ring-accent focus:ring-offset-0 focus:border-accent",
            "min-h-[44px]",
            error
              ? "border-error focus:ring-error focus:border-error"
              : "border-neutral-200 hover:border-neutral-500",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100"
          )}
          placeholder=" "
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
            onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            onChange?.(e);
          }}
          {...props}
        />

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 origin-top-left transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isFloating
              ? "top-1.5 scale-75 text-xs font-medium"
              : "top-1/2 -translate-y-1/2 text-base",
            error
              ? "text-error"
              : isFocused
                ? "text-accent"
                : "text-neutral-500"
          )}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-error" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-caption text-error"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

/* -------------------------------------------------------------------------- */
/*  FloatingTextarea                                                          */
/* -------------------------------------------------------------------------- */

interface FloatingTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "placeholder"> {
  /** The label text that floats above the textarea on focus or when filled */
  label: string;
  /** Textarea name attribute */
  name: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message to display below the textarea */
  error?: string;
  className?: string;
}

export const FloatingTextarea = forwardRef<
  HTMLTextAreaElement,
  FloatingTextareaProps
>(
  (
    {
      label,
      name,
      required = false,
      error,
      className,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      id: externalId,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = externalId ?? `floating-textarea-${generatedId}`;
    const errorId = `${id}-error`;

    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(
      () => !!(value ?? defaultValue)
    );

    const isFloating = isFocused || hasValue;

    return (
      <div className={cn("relative", className)}>
        <textarea
          ref={ref}
          id={id}
          name={name}
          required={required}
          value={value}
          defaultValue={defaultValue}
          rows={rows}
          aria-invalid={!!error || undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "peer w-full rounded-lg border bg-white px-4 pt-5 pb-2 text-neutral-900 text-base outline-none transition-colors duration-200 resize-y",
            "focus:ring-2 focus:ring-accent focus:ring-offset-0 focus:border-accent",
            "min-h-[88px]",
            error
              ? "border-error focus:ring-error focus:border-error"
              : "border-neutral-200 hover:border-neutral-500",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-100"
          )}
          placeholder=" "
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            setHasValue(!!e.target.value);
            onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            onChange?.(e);
          }}
          {...props}
        />

        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-4 origin-top-left transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]",
            isFloating
              ? "top-1.5 scale-75 text-xs font-medium"
              : "top-4 text-base",
            error
              ? "text-error"
              : isFocused
                ? "text-accent"
                : "text-neutral-500"
          )}
        >
          {label}
          {required && (
            <span className="ml-0.5 text-error" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="mt-1.5 text-caption text-error"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";
