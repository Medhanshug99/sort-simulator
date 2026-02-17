import React from "react";
import { ALGORITHM_INFO } from "../algorithms/types";
import { Info } from "lucide-react";

interface StatsPanelProps {
    algorithm: string;
    themeColor: string;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ algorithm, themeColor }) => {
    const info = ALGORITHM_INFO[algorithm];

    return (
        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs font-medium text-slate-400">Complexity Analysis</span>
                <Info size={14} className="text-slate-600" />
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Time (Average)</span>
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-800 text-[#f5b942] border border-slate-700">
                        {info.timeComplexity.average}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Time (Worst)</span>
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-800 text-red-400 border border-slate-700">
                        {info.timeComplexity.worst}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Space</span>
                    <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {info.spaceComplexity}
                    </span>
                </div>
            </div>

            <div className="pt-2 text-[10px] text-slate-500 italic border-t border-slate-800">
                {info.description}
            </div>
        </div>
    );
};

export default StatsPanel;
