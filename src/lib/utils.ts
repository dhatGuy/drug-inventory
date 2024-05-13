import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAvatarName = (name: string) => {
  const words = name.split(" ");
  if (words.length > 2) {
    words.length = 2;
  }
  return words.map((word) => word[0]).join("");
};
