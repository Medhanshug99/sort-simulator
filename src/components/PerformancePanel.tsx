import React from "react";
import { Database, ArrowRightLeft, Timer } from "lucide-react";

interface PerformancePanelProps {
    selectedAlgo: string;
    currentStep: number;
    totalSteps: number;
    arraySize: number;
    isAnimating: boolean;
    isPaused: boolean;
    themeColor: string;
}

const PerformancePanel: React.FC<PerformancePanelProps> = ({
    selectedAlgo,
    currentStep,
    totalSteps,
    arraySize,
    isAnimating,
    isPaused,
    themeColor
}) => {
    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-[#f5b942] opacity-80"><Database size={14} /></span>
                    <span className="text-xs font-medium text-slate-400">Total Items</span>
                </div>
                <span className="text-sm font-mono font-bold text-[#e6edf3]">{arraySize}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#f5b942] opacity-80"><ArrowRightLeft size={14} /></span>
                    <span className="text-xs font-medium text-slate-400">Comparisons</span>
                </div>
                <div className="text-lg font-mono font-bold text-[#e6edf3]">
                    {((currentStep / (totalSteps || 1)) * 100).toFixed(0)}%
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                    <div
                        className="h-full transition-all duration-300 ease-out"
                        style={{ width: `${(currentStep / (totalSteps || 1)) * 100}%`, backgroundColor: themeColor }}
                    />
                </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#f5b942] opacity-80"><Timer size={14} /></span>
                    <span className="text-xs font-medium text-slate-400">Progress</span>
                </div>
                <div className="text-lg font-mono font-bold text-[#e6edf3]">
                    {currentStep} <span className="text-xs text-slate-600 font-normal">/ {totalSteps}</span>
                </div>
            </div>
        </div>
    );
};

export default PerformancePanel;
