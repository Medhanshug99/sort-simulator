import { SortingStep } from "./types";

export const selectionSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            steps.push({ type: "compare", i: minIdx, j: j });
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }

        if (minIdx !== i) {
            const temp = arr[i];
            arr[i] = arr[minIdx];
            arr[minIdx] = temp;
            steps.push({ type: "swap", i: i, j: minIdx });
        }
        steps.push({ type: "sorted", index: i });
    }

    return steps;
};
