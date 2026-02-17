import { SortingStep } from "./types";

export const quickSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];

    const partition = (low: number, high: number): number => {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            steps.push({ type: "compare", i: j, j: high });
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                steps.push({ type: "swap", i: i, j: j });
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        steps.push({ type: "swap", i: i + 1, j: high });
        steps.push({ type: "sorted", index: i + 1 });

        return i + 1;
    };

    const sort = (low: number, high: number) => {
        if (low <= high) {
            if (low === high) {
                steps.push({ type: "sorted", index: low });
                return;
            }
            const pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        }
    };

    sort(0, arr.length - 1);
    return steps;
};
