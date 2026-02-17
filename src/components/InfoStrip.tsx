import React from "react";
import { cn } from "../utils/helpers";

interface InfoStripProps {
    array: number[];
    compareIndices: number[];
    swapIndices: number[];
    currentStep: number;
    totalSteps: number;
    themeColor: string;
    isAnimating: boolean;
    isPaused: boolean;
}

const InfoStrip: React.FC<InfoStripProps> = ({
    array,
    compareIndices,
    swapIndices,
    currentStep,
    totalSteps,
    themeColor,
    isAnimating,
    isPaused
}) => {
    let statusText = "Ready";
    if (isAnimating) {
        if (isPaused) {
            statusText = "Paused";
        } else if (compareIndices.length > 0) {
            statusText = "Comparing";
        } else if (swapIndices.length > 0) {
            statusText = "Swapping";
        } else {
            statusText = "Processing...";
        }
    } else if (currentStep > 0 && currentStep === totalSteps) {
        statusText = "Sort Complete";
    }

    const getStatusIcon = () => {
        if (isPaused) {
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>; // Pause icon
        } else if (swapIndices.length === 2) {
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="m17 11-5-5-5 5" /><path d="M12 16V6" /><path d="m7 13 5 5 5-5" /><path d="M12 8v10" /></svg>; // Swap icon
        } else if (compareIndices.length === 2) {
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-transparent" style={{ stroke: '#f59e0b' }}><path d="M18 6 6 18" /><path d="M6 6l12 12" /></svg>; // Compare icon (X) - Amber
        } else if (isAnimating) {
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>; // Spinner icon
        } else if (currentStep > 0 && currentStep === totalSteps) {
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>; // Checkmark icon
        }
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><polygon points="5 3 19 12 5 21 5 3" /></svg>; // Play icon
    };

    return (
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            {/* Status Pill */}
            <div className={cn(
                "inline-flex items-center gap-3 px-3 py-2 rounded-lg backdrop-blur-md border shadow-sm transition-all duration-300",
                isAnimating
                    ? "bg-slate-900/90 border-slate-700"
                    : "bg-slate-900/50 border-slate-800"
            )}>
                <div className="flex items-center gap-2">
                    {getStatusIcon()}
                    <span className="text-xs font-bold tracking-wide text-[#e6edf3]">
                        {statusText}
                    </span>
                </div>

                {/* Compare/Swap Details */}
                {(compareIndices.length > 0 || swapIndices.length > 0) && (
                    <>
                        <div className="w-px h-3 bg-slate-700 mx-1" />
                        <div className="flex items-center gap-3 font-mono text-xs">
                            {compareIndices.length === 2 && (
                                <div className="flex items-center gap-1.5 text-[#f59e0b]">
                                    <span className="opacity-70">CMP</span>
                                    <span className="font-bold bg-[#f59e0b]/10 px-1 rounded">{array[compareIndices[0]]}</span>
                                    <span className="text-slate-500">:</span>
                                    <span className="font-bold bg-[#f59e0b]/10 px-1 rounded">{array[compareIndices[1]]}</span>
                                </div>
                            )}

                            {swapIndices.length === 2 && (
                                <div className="flex items-center gap-1.5 text-red-400">
                                    <span className="opacity-70">SWP</span>
                                    <span className="font-bold bg-red-400/10 px-1 rounded">{array[swapIndices[0]]}</span>
                                    <span className="text-slate-500">↔</span>
                                    <span className="font-bold bg-red-400/10 px-1 rounded">{array[swapIndices[1]]}</span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoStrip;
