"use client";

import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldShell =
  "peer w-full rounded-md border border-border/90 bg-white px-4 pt-6 pb-2.5 text-[0.9375rem] text-black outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder-transparent focus:border-gold focus:shadow-[0_0_0_3px_rgba(183,163,90,0.18)]";

const labelShell =
  "pointer-events-none absolute start-4 top-1/2 z-[1] origin-[right_center] -translate-y-1/2 text-sm text-muted transition-[transform,color,top,font-size] duration-300 ease-out peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[0.7rem] peer-focus:font-medium peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-gold";

type FloatingInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function FloatingInput({
  id,
  label,
  error,
  className = "",
  ...props
}: FloatingInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        placeholder=" "
        className={`${fieldShell} ${error ? "border-red-400/80 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.18)]" : ""} ${className}`}
        {...props}
      />
      <label htmlFor={id} className={labelShell}>
        {label}
      </label>
      {error ? (
        <p className="mt-2 text-xs text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FloatingTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function FloatingTextarea({
  id,
  label,
  error,
  className = "",
  ...props
}: FloatingTextareaProps) {
  return (
    <div className="relative">
      <textarea
        id={id}
        placeholder=" "
        className={`${fieldShell} min-h-[9rem] resize-y pt-7 leading-7 ${error ? "border-red-400/80 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.18)]" : ""} ${className}`}
        {...props}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-4 top-[1.125rem] z-[1] origin-[right_center] text-sm text-muted transition-[transform,color,top,font-size] duration-300 ease-out peer-focus:top-2.5 peer-focus:text-[0.7rem] peer-focus:font-medium peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:font-medium peer-[:not(:placeholder-shown)]:text-gold"
      >
        {label}
      </label>
      {error ? (
        <p className="mt-2 text-xs text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FloatingSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: readonly string[];
};

export function FloatingSelect({
  id,
  label,
  error,
  options,
  className = "",
  ...props
}: FloatingSelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        className={`${fieldShell} appearance-none pe-10 ${error ? "border-red-400/80" : ""} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-4 top-2.5 z-[1] text-[0.7rem] font-medium text-gold"
      >
        {label}
      </label>
      <span
        className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-muted"
        aria-hidden
      >
        ▾
      </span>
      {error ? (
        <p className="mt-2 text-xs text-red-500" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
