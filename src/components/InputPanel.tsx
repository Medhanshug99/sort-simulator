import React from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "../utils/helpers";

interface InputPanelProps {
    onArrayChange: (array: number[]) => void;
    onGenerateRandom: (size: number) => void;
    arraySize: number;
    setArraySize: (size: number) => void;
    disabled: boolean;
    themeColor: string;
}

const InputPanel: React.FC<InputPanelProps> = ({
    onArrayChange,
    onGenerateRandom,
    arraySize,
    setArraySize,
    disabled,
    themeColor
}) => {
    return (
        <div className="space-y-4">
            {/* Size Slider */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-medium text-slate-400">Array Size</label>
                    <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                        {arraySize}
                    </span>
                </div>
                <input
                    type="range"
                    min="10"
                    max="100"
                    value={arraySize}
                    onChange={(e) => setArraySize(Number(e.target.value))}
                    disabled={disabled}
                    className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#020617]"
                    style={{
                        accentColor: themeColor,
                        // @ts-ignore
                        "--tw-ring-color": themeColor
                    }}
                />
            </div>

            {/* Randomize Button */}
            <button
                onClick={() => onGenerateRandom(arraySize)}
                disabled={disabled}
                className={cn(
                    "w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 border",
                    disabled
                        ? "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700 hover:text-[#e6edf3] active:bg-slate-700"
                )}
            >
                <div className="flex items-center gap-2 group">
                    <RotateCcw size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>Randomize Data</span>
                </div>
            </button>
        </div>
    );
};

export default InputPanel;
