/**
 * Represents a single step in the sorting process.
 * This allows the animation engine to consume steps and update UI accordingly.
 */
export type SortingStep =
    | { type: "compare"; i: number; j: number }
    | { type: "swap"; i: number; j: number }
    | { type: "overwrite"; index: number; value: number }
    | { type: "sorted"; index: number };

/**
 * Metadata for each sorting algorithm.
 */
export interface AlgorithmInfo {
    name: string;
    timeComplexity: {
        best: string;
        average: string;
        worst: string;
    };
    spaceComplexity: string;
    description: string;
}

export const ALGORITHM_INFO: Record<string, AlgorithmInfo> = {
    bubble: {
        name: "Bubble Sort",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)",
        },
        spaceComplexity: "O(1)",
        description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    },
    selection: {
        name: "Selection Sort",
        timeComplexity: {
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)",
        },
        spaceComplexity: "O(1)",
        description: "Finds the minimum element from the unsorted part and puts it at the beginning.",
    },
    insertion: {
        name: "Insertion Sort",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)",
        },
        spaceComplexity: "O(1)",
        description: "Builds the final sorted array one item at a time by inserting each element into its correct position.",
    },
    merge: {
        name: "Merge Sort",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)",
        },
        spaceComplexity: "O(n)",
        description: "A divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves.",
    },
    quick: {
        name: "Quick Sort",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)",
        },
        spaceComplexity: "O(log n)",
        description: "A divide-and-conquer algorithm that picks an element as pivot and partitions the given array around the picked pivot.",
    },
};
