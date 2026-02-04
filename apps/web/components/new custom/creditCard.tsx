"use client";

import { SVGProps, useMemo } from "react";
import { cx } from "class-variance-authority";

export function sortCx<T extends Record<string, string | number | Record<string, string | number | Record<string, string | number>>>>(classes: T): T {
    return classes;
}

export const PaypassIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" {...props}>
            <g clipPath="url(#clip0_1307_7682)">
                <path
                    d="M15.1429 1.28571C17.0236 4.54326 18.0138 8.23849 18.0138 12C18.0138 15.7615 17.0236 19.4567 15.1429 22.7143M10.4286 3.64285C11.8956 6.18374 12.6679 9.06602 12.6679 12C12.6679 14.934 11.8956 17.8162 10.4286 20.3571M5.92859 5.80713C6.98933 7.66394 7.54777 9.77022 7.54777 11.9143C7.54777 14.0583 6.98933 16.1646 5.92859 18.0214M1.42859 8.14285C2.19306 9.29983 2.59834 10.6362 2.59834 12C2.59834 13.3638 2.19306 14.7002 1.42859 15.8571"
                    stroke="currentColor"
                    strokeWidth="2.57143"
                    strokeLinecap="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_1307_7682">
                    <rect width="20" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const MastercardIconWhite = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="30" height="19" viewBox="0 0 30 19" fill="none" {...props}>
            <path
                opacity="0.5"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9053 16.4392C13.3266 17.7699 11.2787 18.5733 9.04092 18.5733C4.04776 18.5733 0 14.5737 0 9.63994C0 4.70619 4.04776 0.706604 9.04092 0.706604C11.2787 0.706604 13.3266 1.50993 14.9053 2.84066C16.484 1.50993 18.5319 0.706604 20.7697 0.706604C25.7629 0.706604 29.8106 4.70619 29.8106 9.63994C29.8106 14.5737 25.7629 18.5733 20.7697 18.5733C18.5319 18.5733 16.484 17.7699 14.9053 16.4392Z"
                fill="white"
            />
            <path
                opacity="0.5"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9053 16.4392C16.8492 14.8007 18.0818 12.3625 18.0818 9.63994C18.0818 6.91733 16.8492 4.47919 14.9053 2.84066C16.484 1.50993 18.5319 0.706604 20.7697 0.706604C25.7628 0.706604 29.8106 4.70619 29.8106 9.63994C29.8106 14.5737 25.7628 18.5733 20.7697 18.5733C18.5319 18.5733 16.484 17.7699 14.9053 16.4392Z"
                fill="white"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9053 16.4392C16.8492 14.8007 18.0818 12.3625 18.0818 9.63995C18.0818 6.91736 16.8492 4.47924 14.9053 2.8407C12.9614 4.47924 11.7288 6.91736 11.7288 9.63995C11.7288 12.3625 12.9614 14.8007 14.9053 16.4392Z"
                fill="white"
            />
        </svg>
    );
};

export const MastercardIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg width="30" height="19" viewBox="0 0 30 19" fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9053 16.4393C13.3266 17.77 11.2787 18.5733 9.04092 18.5733C4.04776 18.5733 0 14.5737 0 9.64C0 4.70625 4.04776 0.706665 9.04092 0.706665C11.2787 0.706665 13.3266 1.51 14.9053 2.84072C16.484 1.51 18.5319 0.706665 20.7697 0.706665C25.7629 0.706665 29.8106 4.70625 29.8106 9.64C29.8106 14.5737 25.7629 18.5733 20.7697 18.5733C18.5319 18.5733 16.484 17.77 14.9053 16.4393Z"
                fill="#ED0006"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9053 16.4393C16.8492 14.8007 18.0818 12.3626 18.0818 9.64C18.0818 6.91739 16.8492 4.47925 14.9053 2.84072C16.484 1.50999 18.5319 0.706665 20.7697 0.706665C25.7628 0.706665 29.8106 4.70625 29.8106 9.64C29.8106 14.5737 25.7628 18.5733 20.7697 18.5733C18.5319 18.5733 16.484 17.77 14.9053 16.4393Z"
                fill="#F9A000"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.9053 16.4393C16.8492 14.8008 18.0818 12.3627 18.0818 9.64007C18.0818 6.91748 16.8492 4.47936 14.9053 2.84082C12.9614 4.47936 11.7288 6.91748 11.7288 9.64007C11.7288 12.3627 12.9614 14.8008 14.9053 16.4393Z"
                fill="#FF5E00"
            />
        </svg>
    );
};

export const VisaIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 48 16" width="30" height="19" fill="none" preserveAspectRatio="xMidYMid meet" {...props}>
      <path
        d="M18.2 15.4L20.9 0.6H25.2L22.5 15.4H18.2Z"
        fill="#1A1F71"
      />
      <path
        d="M31.8 0.9C30.8 0.5 29.3 0.3 27.7 0.3C23.7 0.3 20.9 2.3 20.9 5.1C20.9 7.2 22.8 8.4 24.2 9.1C25.7 9.8 26.2 10.2 26.2 10.9C26.2 11.9 25.1 12.3 24.1 12.3C22.6 12.3 21.7 12 20.6 11.5L20.1 11.3L19.5 14.6C20.6 15.1 22.4 15.5 24.2 15.5C28.4 15.5 31.2 13.5 31.2 10.6C31.2 9 30.2 7.8 28 6.8C26.7 6.1 25.9 5.7 25.9 5C25.9 4.4 26.6 3.8 27.9 3.8C29 3.8 29.9 4 30.6 4.3L31 4.5L31.8 0.9Z"
        fill="#1A1F71"
      />
      <path
        d="M13.8 0.6L9.6 10.6L9.2 8.4C8.6 6.4 6.6 4.3 4.4 3.2L8.3 15.4H12.9L19.8 0.6H13.8Z"
        fill="#1A1F71"
      />
      <path
        d="M4.9 0.6H0.2L0 0.8C3.7 1.8 6.9 4.1 8 8.4L6.9 2.1C6.7 1.1 6 0.6 4.9 0.6Z"
        fill="#F7A600"
      />
    </svg>
  );
};

export const RuPayIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 60 20" width="30" height="19" fill="none" {...props}>
      <defs>
        <linearGradient id="rupayBlue" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#224099" />
          <stop offset="1" stopColor="#1A4FA3" />
        </linearGradient>

        <linearGradient id="rupayOrange" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F58220" />
          <stop offset="1" stopColor="#E36D00" />
        </linearGradient>

        <linearGradient id="rupayGreen" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2BB673" />
          <stop offset="1" stopColor="#1F9F5C" />
        </linearGradient>
      </defs>

      <rect x="0" y="2" width="40" height="16" rx="3" fill="url(#rupayBlue)" />
      <rect x="18" y="2" width="30" height="16" rx="3" fill="url(#rupayOrange)" />
      <rect x="34" y="2" width="26" height="16" rx="3" fill="url(#rupayGreen)" />
    </svg>
  );
};

export const AmexIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 48 30" width="30" height="19" fill="none" {...props}>
      <rect width="48" height="30" rx="4" fill="#2E77BC" />

      <path
        d="M7 20V10H11L13.5 16L16 10H20V20H17V13.8L14.9 20H12.1L10 13.8V20H7Z"
        fill="white"
      />
      <path
        d="M22 20V10H30V12.7H25V14H29.5V16.6H25V17.3H30V20H22Z"
        fill="white"
      />
      <path
        d="M32 20V10H36.5C39.2 10 41 11.6 41 14.2C41 16.9 39.2 18.5 36.5 18.5H35V20H32ZM35 16.1H36.3C37.5 16.1 38.2 15.4 38.2 14.2C38.2 13.1 37.5 12.4 36.3 12.4H35V16.1Z"
        fill="white"
      />
    </svg>
  );
};

const detectBrand = (num: string) => {
  if (/^4/.test(num)) return "visa";
  if (/^5[1-5]/.test(num)) return "mastercard";
  if (/^3[47]/.test(num)) return "amex";
  if (/^6/.test(num)) return "rupay";
  return "mastercard";
};

const styles = sortCx({
    "brand-dark": {
        root: "bg-linear-to-tr from-brand-900 to-brand-700 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
    },
    "brand-light": {
        root: "bg-brand-100 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-black/10 before:ring-inset",
        company: "text-gray-700",
        footerText: "text-gray-700",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white",
    },
    "gray-dark": {
        root: "bg-linear-to-tr from-gray-900 to-gray-700 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
    },
    "gray-light": {
        root: "bg-gray-100 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-black/10 before:ring-inset",
        company: "text-gray-700",
        footerText: "text-gray-700",
        paypassIcon: "text-gray-400",
        cardTypeRoot: "bg-white",
    },
    "transparent-strip": {
        root: "bg-linear-to-br from-slate-800/90 via-slate-900/95 to-black backdrop-blur-[6px] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:ring-1 before:ring-white/10 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
    },
    "gray-strip": {
        root: "bg-gray-100 before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-gray-700",
        footerText: "text-white",
        paypassIcon: "text-gray-400",
        cardTypeRoot: "bg-white/10",
    },
    "gradient-strip": {
        root: "bg-linear-to-b from-[#A5C0EE] to-[#FBC5EC] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
    },
    "salmon-strip": {
        root: "bg-[#F4D9D0] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-gray-700",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
    },
    "gray-strip-vertical": {
        root: "bg-linear-to-br from-slate/30 to-transparent before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-slate/20 before:ring-1 before:ring-slate/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-gray-400",
        cardTypeRoot: "bg-white/10",
    },
    "gradient-strip-vertical": {
        root: "bg-linear-to-b from-[#FBC2EB] to-[#A18CD1] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
    },
    "salmon-strip-vertical": {
        root: "bg-[#F4D9D0] before:pointer-events-none before:absolute before:inset-0 before:z-1 before:rounded-[inherit] before:mask-linear-135 before:mask-linear-to-white/20 before:ring-1 before:ring-white/30 before:ring-inset",
        company: "text-white",
        footerText: "text-white",
        paypassIcon: "text-white",
        cardTypeRoot: "bg-white/10",
    },
});

const _NORMAL_TYPES = ["transparent", "transparent-gradient", "brand-dark", "brand-light", "gray-dark", "gray-light"] as const;
const STRIP_TYPES = ["transparent-strip", "gray-strip", "gradient-strip", "salmon-strip"] as const;
const VERTICAL_STRIP_TYPES = ["gray-strip-vertical", "gradient-strip-vertical", "salmon-strip-vertical"] as const;

const CARD_WITH_COLOR_LOGO = ["brand-dark", "brand-light", "gray-dark", "gray-light"] as const;

export type CreditCardType = (typeof _NORMAL_TYPES)[number] | (typeof STRIP_TYPES)[number] | (typeof VERTICAL_STRIP_TYPES)[number];

interface CreditCardProps {
    company?: string;
    cardNumber?: string;
    cardHolder?: string;
    cardExpiration?: string;
    type?: CreditCardType;
    className?: string;
    width?: number;
}

export const CreditCard = ({
    company,
    cardNumber,
    cardHolder,
    cardExpiration,
    type,
    className,
    width,
}: CreditCardProps) => {
    const originalWidth = 345;
    const originalHeight = 190;
    const brand = detectBrand(cardNumber ?? "");

    const { scale} = useMemo(() => {
        if (!width)
            return {
                scale: 1,
                scaledWidth: originalWidth,
                scaledHeight: originalHeight,
            };

        const scaleValue = width / originalWidth;
        return {
            scale: scaleValue,
            scaledWidth: originalWidth * scaleValue,
            scaledHeight: originalHeight * scaleValue,
        };
    }, [width]);

    return (
        <div
            style={{
                width: `${originalWidth * scale}px`,
                height: `${originalHeight * scale}px`,
            }}
            className={cx("relative flex", className)}
        >
            <div
                style={{
                    width: `${originalWidth * scale}px`,
                    height: `${originalHeight * scale}px`,
                }}
                className={cx("absolute top-0 left-0 flex origin-top-left flex-col justify-between overflow-hidden rounded-2xl p-4", styles[type].root)}
            >
                {/* Horizontal strip */}
                {STRIP_TYPES.includes(type as (typeof STRIP_TYPES)[number]) && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/2 bg-gray-800"></div>
                )}
                {/* Vertical stripe */}
                {VERTICAL_STRIP_TYPES.includes(type as (typeof VERTICAL_STRIP_TYPES)[number]) && (
                    <div className="pointer-events-none absolute inset-y-0 right-22 left-0 z-0 bg-gray-800"></div>
                )}
                {/* Gradient diffusor */}
                {type === "transparent-gradient" && (
                    <div className="absolute -top-4 -left-4 grid grid-cols-2 blur-3xl">
                        <div className="size-20 rounded-tl-full bg-pink-500 opacity-30 mix-blend-normal" />
                        <div className="size-20 rounded-tr-full bg-orange-500 opacity-50 mix-blend-normal" />
                        <div className="size-20 rounded-bl-full bg-blue-500 opacity-30 mix-blend-normal" />
                        <div className="size-20 rounded-br-full bg-success-500 opacity-30 mix-blend-normal" />
                    </div>
                )}

                <div className="relative flex items-start justify-between px-1 pt-1">
                    <div className={cx("text-md leading-[normal] font-semibold", styles[type].company)}>{company}</div>

                    <PaypassIcon className={styles[type].paypassIcon} />
                </div>

                <div className="relative flex items-end justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-2">
                        <div className="flex items-end gap-1">
                            <p
                                style={{
                                    wordBreak: "break-word",
                                }}
                                className={cx("text-xs leading-snug font-semibold tracking-[0.6px] uppercase", styles[type].footerText)}
                            >
                                {cardHolder}
                            </p>
                            <p
                                className={cx(
                                    "ml-auto text-right text-xs leading-[normal] font-semibold tracking-[0.6px] tabular-nums",
                                    styles[type].footerText,
                                )}
                            >
                                {cardExpiration}
                            </p>
                        </div>
                        <div className={cx("text-md leading-[normal] font-semibold tracking-[1px] tabular-nums", styles[type].footerText)}>
                            {cardNumber}
                            <span className="pointer-events-none invisible inline-block w-0 max-w-0 opacity-0">1</span>
                        </div>
                    </div>

                    <div
                        className={cx(
                            "flex h-8 w-11.5 shrink-0 items-center justify-center rounded",
                            styles[type].cardTypeRoot
                        )}
                        >
                        {brand === "visa" && <VisaIcon />}
                        {brand === "mastercard" &&
                            (CARD_WITH_COLOR_LOGO.includes(type as any)
                            ? <MastercardIcon />
                            : <MastercardIconWhite />)}
                        {brand === "amex" && <AmexIcon />}
                        {brand === "rupay" && <RuPayIcon />}
                    </div>
                </div>
            </div>
        </div>
    );
};