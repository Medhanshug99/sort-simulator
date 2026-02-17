import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Generates a random array of numbers
 */
export const generateRandomArray = (size: number, min = 10, max = 400): number[] => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

/**
 * Validates comma separated input
 */
export const validateInput = (input: string): number[] | string => {
    if (!input.trim()) return "Please enter some numbers.";

    const parts = input.split(",").map(p => p.trim());
    const numbers: number[] = [];

    for (const p of parts) {
        if (p === "") continue;
        const n = Number(p);
        if (isNaN(n)) return `Invalid number: ${p}`;
        numbers.push(n);
    }

    if (numbers.length === 0) return "Please enter at least one number.";
    if (numbers.length > 100) return "Array size too large (max 100).";

    return numbers;
};
