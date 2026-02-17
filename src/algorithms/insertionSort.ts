import { SortingStep } from "./types";

export const insertionSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    const n = arr.length;

    // First element is already considered "sorted" in the context of insertion
    steps.push({ type: "sorted", index: 0 });

    for (let i = 1; i < n; i++) {
        let j = i;
        while (j > 0) {
            steps.push({ type: "compare", i: j - 1, j: j });
            if (arr[j] < arr[j - 1]) {
                const temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                steps.push({ type: "swap", i: j - 1, j: j });
                j--;
            } else {
                break;
            }
        }
        // All elements up to i are now relatively ordered, 
        // but in insertion sort we mark the whole prefix as sorted visually
        for (let k = 0; k <= i; k++) {
            steps.push({ type: "sorted", index: k });
        }
    }

    return steps;
};
