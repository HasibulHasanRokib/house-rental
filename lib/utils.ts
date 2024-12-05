import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatMoney(amount: number) {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BDT",
  }).format(amount);
}

export function relativeData(from: Date) {
  return formatDistanceToNowStrict(from, { addSuffix: true });
}
