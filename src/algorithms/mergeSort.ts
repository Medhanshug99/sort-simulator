import { SortingStep } from "./types";

export const mergeSort = (array: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const arr = [...array];

    const merge = (start: number, mid: number, end: number) => {
        const left = arr.slice(start, mid + 1);
        const right = arr.slice(mid + 1, end + 1);

        let i = 0,
            j = 0,
            k = start;

        while (i < left.length && j < right.length) {
            // Compare
            steps.push({ type: "compare", i: start + i, j: mid + 1 + j });

            if (left[i] <= right[j]) {
                arr[k] = left[i];
                steps.push({ type: "overwrite", index: k, value: left[i] });
                i++;
            } else {
                arr[k] = right[j];
                steps.push({ type: "overwrite", index: k, value: right[j] });
                j++;
            }
            k++;
        }

        while (i < left.length) {
            arr[k] = left[i];
            steps.push({ type: "overwrite", index: k, value: left[i] });
            i++;
            k++;
        }

        while (j < right.length) {
            arr[k] = right[j];
            steps.push({ type: "overwrite", index: k, value: right[j] });
            j++;
            k++;
        }

        // Mark range as sorted (at this level of merge)
        for (let m = start; m <= end; m++) {
            steps.push({ type: "sorted", index: m });
        }
    };

    const divide = (start: number, end: number) => {
        if (start < end) {
            const mid = Math.floor((start + end) / 2);
            divide(start, mid);
            divide(mid + 1, end);
            merge(start, mid, end);
        }
    };

    divide(0, arr.length - 1);
    return steps;
};
