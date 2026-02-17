import React from "react";
import { Play, Pause, RotateCcw, FastForward, Zap, Footprints, StepForward, Eye, EyeOff } from "lucide-react";
import { cn } from "../utils/helpers";

interface ControlPanelProps {
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void;
    onStep: () => void;
    isAnimating: boolean;
    isPaused: boolean;
    isStepMode: boolean;
    toggleStepMode: () => void;
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    disabled: boolean;
    themeColor: string;
    showValues: boolean;
    onToggleShowValues: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
    onStart,
    onPause,
    onResume,
    onReset,
    onStep,
    isAnimating,
    isPaused,
    isStepMode,
    toggleStepMode,
    speed,
    setSpeed,
    disabled,
    themeColor,
    showValues,
    onToggleShowValues
}) => {
    return (
        <div className="space-y-4">
            {/* Mode Toggles Row */}
            <div className="flex gap-2">
                {/* Step/Auto Toggle */}
                <div className="flex-1 flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800">
                    <button
                        onClick={() => isStepMode && toggleStepMode()}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all duration-200",
                            !isStepMode ? "text-[#020617] shadow-sm" : "text-slate-500 hover:text-slate-300"
                        )}
                        style={{
                            backgroundColor: !isStepMode ? themeColor : 'transparent',
                        }}
                    >
                        <Zap size={13} />
                        Auto
                    </button>
                    <button
                        onClick={() => !isStepMode && toggleStepMode()}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all duration-200",
                            isStepMode ? "text-[#020617] shadow-sm" : "text-slate-500 hover:text-slate-300"
                        )}
                        style={{
                            backgroundColor: isStepMode ? themeColor : 'transparent',
                        }}
                    >
                        <Footprints size={13} />
                        Step
                    </button>
                </div>

                {/* Show Values Toggle - Semantic Warm Accent? Or Keep Neutral? 
                    User said: "Replace secondary cyan highlights with muted slate-blue". 
                    "Add subtle warm accent for small UI details". 
                    Let's use Warm Accent (#f5b942) for this secondary toggle state to distinguish from Primary actions.
                */}
                <button
                    onClick={onToggleShowValues}
                    className={cn(
                        "px-3 rounded-lg border flex items-center justify-center gap-2 transition-all duration-200",
                        showValues ? "bg-slate-800 text-[#f5b942] border-[#f5b942]/30" : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700"
                    )}
                    title={showValues ? "Hide Values" : "Show Values"}
                >
                    {showValues ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
            </div>

            <div className="flex gap-2">
                {!isAnimating || isPaused ? (
                    <button
                        onClick={isPaused ? onResume : onStart}
                        disabled={isAnimating && !isPaused}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md font-bold transition-all duration-200 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
                            "text-[#05070d] shadow-lg hover:brightness-110"
                        )}
                        style={{ backgroundColor: themeColor }}
                    >
                        {isPaused ? <Play size={18} /> : <Play size={18} />}
                        {isPaused ? "RESUME" : "START"}
                    </button>
                ) : (
                    <button
                        onClick={onPause}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#fbbf24] hover:bg-[#f59e0b] text-[#05070d] py-2.5 rounded-md font-bold transition-all duration-200 transform active:scale-95 shadow-lg"
                    >
                        <Pause size={18} />
                        PAUSE
                    </button>
                )}

                <button
                    onClick={onReset}
                    disabled={isAnimating && !isPaused}
                    className="flex items-center justify-center p-2.5 bg-[#1f2937] hover:bg-[#374151] border border-white/[0.08] text-slate-300 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RotateCcw size={18} />
                </button>
            </div>

            <div className={cn("transition-all duration-300 overflow-hidden", isStepMode ? "h-[42px] opacity-100" : "h-0 opacity-0")}>
                <button
                    onClick={onStep}
                    className="w-full flex items-center justify-center gap-2 border border-white/[0.1] hover:bg-[#1f2937] text-slate-300 py-2.5 rounded-md font-bold transition-all duration-200 active:scale-95 group"
                    style={{ borderColor: `${themeColor}40` }}
                >
                    <StepForward size={16} className="transition-transform group-hover:translate-x-1" style={{ color: themeColor }} />
                    NEXT STEP
                </button>
            </div>

            <div className={cn("space-y-2 pt-1 transition-opacity duration-200", isStepMode ? "opacity-30 pointer-events-none" : "opacity-100")}>
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>SPEED</span>
                    <span>{speed}ms</span>
                </div>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={101 - speed}
                    onChange={(e) => setSpeed(101 - parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#1f2937] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-current"
                    disabled={isStepMode}
                    style={{ color: themeColor }}
                />
            </div>
        </div>
    );
};

export default ControlPanel;
