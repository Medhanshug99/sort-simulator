import { useState, useRef, useCallback, useEffect } from "react";
import { SortingStep } from "../algorithms/types";

interface UseSortingAnimationProps {
    initialArray: number[];
    speed: number; // delay in ms
}

export const useSortingAnimation = ({ initialArray, speed }: UseSortingAnimationProps) => {
    const [array, setArray] = useState<number[]>([...initialArray]);
    const [compareIndices, setCompareIndices] = useState<number[]>([]);
    const [swapIndices, setSwapIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isStepMode, setIsStepMode] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const stepsRef = useRef<SortingStep[]>([]);
    const timeoutRef = useRef<number | null>(null);
    const speedRef = useRef(speed);

    // Sync speed ref
    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    const reset = useCallback((newArray: number[]) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setArray([...newArray]);
        setCompareIndices([]);
        setSwapIndices([]);
        setSortedIndices(new Set());
        setIsAnimating(false);
        setIsPaused(false);
        setCurrentStepIndex(0);
        stepsRef.current = [];
    }, []);

    const executeStep = useCallback((step: SortingStep) => {
        switch (step.type) {
            case "compare":
                setCompareIndices([step.i, step.j]);
                setSwapIndices([]);
                break;
            case "swap":
                setSwapIndices([step.i, step.j]);
                setCompareIndices([]);
                setArray((prev) => {
                    const newArr = [...prev];
                    [newArr[step.i], newArr[step.j]] = [newArr[step.j], newArr[step.i]];
                    return newArr;
                });
                break;
            case "overwrite":
                setCompareIndices([]);
                setSwapIndices([]);
                setArray((prev) => {
                    const newArr = [...prev];
                    newArr[step.index] = step.value;
                    return newArr;
                });
                break;
            case "sorted":
                setSortedIndices((prev) => new Set(prev).add(step.index));
                setCompareIndices([]);
                setSwapIndices([]);
                break;
        }
    }, []);

    const playNextStep = useCallback(() => {
        if (currentStepIndex >= stepsRef.current.length) {
            setIsAnimating(false);
            setCompareIndices([]);
            setSwapIndices([]);
            return;
        }

        const step = stepsRef.current[currentStepIndex];
        executeStep(step);
        setCurrentStepIndex((prev) => prev + 1);

        // Only auto-advance if not in step mode
        if (!isStepMode) {
            timeoutRef.current = window.setTimeout(playNextStep, speedRef.current);
        }
    }, [currentStepIndex, executeStep, isStepMode]);

    useEffect(() => {
        // Only auto-play if not in step mode
        if (isAnimating && !isPaused && !isStepMode) {
            timeoutRef.current = window.setTimeout(playNextStep, speedRef.current);
        } else {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [isAnimating, isPaused, isStepMode, playNextStep]);

    const startAnimation = (steps: SortingStep[]) => {
        stepsRef.current = steps;
        setIsAnimating(true);
        setIsPaused(false);
    };

    const pauseAnimation = () => setIsPaused(true);
    const resumeAnimation = () => setIsPaused(false);
    const toggleStepMode = () => setIsStepMode((prev) => !prev);

    const stepForward = () => {
        if (currentStepIndex < stepsRef.current.length) {
            const step = stepsRef.current[currentStepIndex];
            executeStep(step);
            setCurrentStepIndex((prev) => prev + 1);
        } else if (currentStepIndex === stepsRef.current.length && isAnimating) {
            setIsAnimating(false);
            setCompareIndices([]);
            setSwapIndices([]);
        }
    };

    return {
        array,
        compareIndices,
        swapIndices,
        sortedIndices,
        isAnimating,
        isPaused,
        isStepMode,
        currentStepIndex,
        totalSteps: stepsRef.current.length,
        startAnimation,
        pauseAnimation,
        resumeAnimation,
        toggleStepMode,
        reset,
        stepForward,
    };
};
