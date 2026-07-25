"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  length?: number;
  value: string;
  onChange: (value: string) => void;
}


export function OtpInput({ length = 6, value, onChange, className, ...props }: OtpInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // Sirf numbers allow karein

    const newValue = value.split("");
    newValue[index] = val;
    const joinedValue = newValue.join("");
    onChange(joinedValue);

    // Agli input pe auto-focus
    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace dabane par pichli input pe focus
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    // Sirf numbers paste karein aur max length tak kaat dein
    const pastedData = e.clipboardData.getData("text").slice(0, length).replace(/\D/g, "");
    onChange(pastedData);
    
    // Last filled input ya next empty input pe focus karein
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el:any) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "flex h-14 w-12 items-center justify-center rounded-md border border-input bg-background text-center text-2xl font-semibold text-foreground ring-offset-background transition-all",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Active/filled state ke liye dynamic border
            value[index] ? "border-primary shadow-sm" : "border-input"
          )}
          {...props}
        />
      ))}
    </div>
  );
}