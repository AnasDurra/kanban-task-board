import type React from "react";

import { useEffect, useRef, useState } from "react";
import { cn } from "lib/utils";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "danger";
  className?: string;
}

export function DropdownMenu({
  trigger,
  children,
  align = "right",
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "absolute mt-2 min-w-[10rem] bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-[9999] overflow-auto max-h-[300px] transition-all",
              align === "right" ? "right-0" : "left-0",
              "max-w-full"
            )}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  variant = "default",
  className,
}: DropdownMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full px-4 py-3 text-left flex items-center gap-3 text-sm transition-colors",
        variant === "default" && "text-gray-700 hover:bg-gray-50",
        variant === "danger" && "text-red-600 hover:bg-red-50",
        className
      )}
    >
      {children}
    </button>
  );
}
