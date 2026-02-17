import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../utils/helpers";

interface AlgorithmSelectorProps {
    selectedAlgo: string;
    onSelect: (algo: string) => void;
    disabled: boolean;
    themeColor: string;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
    selectedAlgo,
    onSelect,
    disabled,
    themeColor
}) => {
    const algorithms = [
        { id: "bubble", label: "Bubble Sort" },
        { id: "selection", label: "Selection Sort" },
        { id: "insertion", label: "Insertion Sort" },
        { id: "merge", label: "Merge Sort" },
        { id: "quick", label: "Quick Sort" },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = algorithms.find(a => a.id === selectedAlgo)?.label || "Select Algorithm";

    return (
        <div className="relative min-w-[200px]" ref={dropdownRef}>
            <button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all duration-200 text-sm font-medium",
                    isOpen
                        ? "bg-slate-800 border-slate-700 text-[#e6edf3]"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700",
                    disabled && "opacity-50 cursor-not-allowed bg-slate-900/50"
                )}
                style={{
                    borderColor: isOpen ? themeColor : undefined,
                    boxShadow: isOpen ? `0 0 0 1px ${themeColor}40` : undefined
                }}
            >
                <span>{selectedLabel}</span>
                <ChevronDown
                    size={16}
                    className={cn(
                        "transition-transform duration-200",
                        isOpen ? "rotate-180" : "rotate-0",
                        disabled ? "text-slate-600" : "text-slate-500"
                    )}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 rounded-lg border border-slate-700 bg-slate-800 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-1 space-y-0.5">
                        {algorithms.map((algo) => {
                            const isSelected = selectedAlgo === algo.id;
                            return (
                                <button
                                    key={algo.id}
                                    onClick={() => {
                                        onSelect(algo.id);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                                        isSelected
                                            ? "bg-slate-700/50 text-white"
                                            : "text-slate-300 hover:bg-slate-700 hover:text-white"
                                    )}
                                >
                                    <span className={isSelected ? "font-semibold" : "font-medium"}>
                                        {algo.label}
                                    </span>
                                    {isSelected && (
                                        <Check size={14} style={{ color: themeColor }} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlgorithmSelector;
