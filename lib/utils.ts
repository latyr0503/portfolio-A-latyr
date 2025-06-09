import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleApiError = (error: any) => {
  if (error.status === 401) {
    return "Vous n'êtes pas autorisé à effectuer cette action";
  }
  if (error.status === 404) {
    return "La ressource demandée n'existe pas";
  }
  return "Une erreur est survenue";
};