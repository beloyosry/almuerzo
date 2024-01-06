import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeightName(value: string) {
  switch (value) {
    case "1/4":
      return "1/4"
    case "1/2":
      return "1/2"
    case "1/3":
      return "1/3"
    case "1":
      return "1"
  }
}
