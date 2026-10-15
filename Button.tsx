import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light";

type Size = "md" | "sm" | "icon";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[0.005em] transition-colors duration-200 select-none disabled:cursor-not-allowed disabled:opacity-70";

// Размеры не пересекаются по классам, поэтому их можно безопасно переопределять.
const sizes: Record<Size, string> = {
  md: "min-h-[3.25rem] px-7 text-[1rem]",
  sm: "min-h-12 px-5 text-[0.95rem]",
  icon: "size-12 shrink-0",
};

const variants: Record<Variant, string> = {
  primary: "bg-pine text-milk hover:bg-pine-deep",
  secondary: "border border-graphite/25 text-graphite hover:border-graphite/60 hover:bg-linen",
  light: "bg-milk text-pine-deep hover:bg-linen",
};

export function buttonClass(variant: Variant = "primary", extra = "", size: Size = "md") {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  children,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <a className={buttonClass(variant, className)} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  return (
    <button className={buttonClass(variant, className)} {...rest}>
      {children}
    </button>
  );
}

/** Ссылка во внешний сервис открывается в новой вкладке */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
