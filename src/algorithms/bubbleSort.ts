import { SortingStep } from "./types";

export const bubbleSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare
            steps.push({ type: "compare", i: j, j: j + 1 });

            if (arr[j] > arr[j + 1]) {
                // Swap
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                steps.push({ type: "swap", i: j, j: j + 1 });
            }
        }
        // Mark as sorted
        steps.push({ type: "sorted", index: n - i - 1 });
    }
    // The last element is also sorted
    steps.push({ type: "sorted", index: 0 });

    return steps;
};
