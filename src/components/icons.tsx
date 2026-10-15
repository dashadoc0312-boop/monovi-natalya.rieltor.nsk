import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const KeyIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="8" cy="15" r="4" />
    <path d="M11 12l9-9M17 6l2 2M15 8l2 2" />
  </Base>
);

export const SaleIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 9.5V20h14V9.5" />
    <path d="M10 20v-5h4v5" />
  </Base>
);

export const GrowthIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 20h18" />
    <path d="M6 16v-3M11 16V9M16 16V5" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </Base>
);

export const RenovationIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="3.5" width="14" height="5" rx="1.5" />
    <path d="M18 6h2v5h-8v3" />
    <rect x="10.5" y="14" width="3" height="7" rx="1" />
  </Base>
);

export const MapPinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Base>
);

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </Base>
);

export const TelegramIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M21 4L3 11l6 2.5M21 4l-3 16-9-6.5M21 4L9 13.5V19l3-3" />
  </Base>
);

export const WhatsappIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20l1.3-4A8 8 0 1112 20a8 8 0 01-4-1.1L4 20z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 01-1.8-1.8l.8-1-1-2L9 9.5z" />
  </Base>
);

export const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6l8.5 7 8.5-7" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Base>
);

export const serviceIcons = {
  key: KeyIcon,
  sale: SaleIcon,
  growth: GrowthIcon,
  shield: ShieldIcon,
  renovation: RenovationIcon,
};
