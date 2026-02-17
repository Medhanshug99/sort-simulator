import { useState, useMemo, useEffect } from "react";
import ArrayBar from "./components/ArrayBar";
import ControlPanel from "./components/ControlPanel";
import AlgorithmSelector from "./components/AlgorithmSelector";
import InputPanel from "./components/InputPanel";
import StatsPanel from "./components/StatsPanel";
import PerformancePanel from "./components/PerformancePanel";
import { useSortingAnimation } from "./engine/useSortingAnimation";
import { generateRandomArray, cn } from "./utils/helpers";
import * as algorithms from "./algorithms";
import { BarChart3, Github, Hash, Activity, Database, BookOpen, Code2 } from "lucide-react";

import InfoStrip from "./components/InfoStrip";

const App = () => {
    const [arraySize, setArraySize] = useState(40);
    const [initialArray, setInitialArray] = useState(() => generateRandomArray(40));
    const [selectedAlgo, setSelectedAlgo] = useState("bubble");
    const [speed, setSpeed] = useState(50);

    // Smart Visibility: Default to showing values only if items <= 60
    const [showValues, setShowValues] = useState(40 <= 60);

    const {
        array,
        compareIndices,
        swapIndices,
        sortedIndices,
        isAnimating,
        isPaused,
        isStepMode,
        currentStepIndex,
        totalSteps,
        startAnimation,
        pauseAnimation,
        resumeAnimation,
        toggleStepMode,
        reset,
        stepForward,
    } = useSortingAnimation({ initialArray, speed });

    const maxValue = useMemo(() => Math.max(...array, 1), [array]);

    useEffect(() => {
        if (arraySize > 60) {
            setShowValues(false);
        } else {
            setShowValues(true);
        }
    }, [arraySize]);

    const handleStart = () => {
        // @ts-ignore
        const algoFn = algorithms[`${selectedAlgo}Sort`];
        if (algoFn) {
            const steps = algoFn(array);
            startAnimation(steps);
        }
    };

    const handleRandomize = (size: number) => {
        const newArr = generateRandomArray(size);
        setInitialArray(newArr);
        reset(newArr);
    };

    const handleArrayChange = (newArr: number[]) => {
        setInitialArray(newArr);
        setArraySize(newArr.length);
        reset(newArr);
    };

    useEffect(() => {
        if (!isAnimating) {
            const newArr = generateRandomArray(arraySize);
            setInitialArray(newArr);
            reset(newArr);
        }
    }, [arraySize, reset]);

    const ALGO_THEMES: Record<string, string> = {
        bubble: "#06b6d4",
        selection: "#6366f1",
        insertion: "#f59e0b",
        merge: "#8b5cf6",
        quick: "#14b8a6",
        heap: "#f59e0b",
    };

    const themeColor = ALGO_THEMES[selectedAlgo] || "#06b6d4";

    return (
        <div className="min-h-screen bg-[#020617] text-[#e6edf3] p-4 md:p-8 font-sans selection:bg-indigo-500/20" style={{ "--theme-color": themeColor } as any}>
            <div className="max-w-7xl mx-auto space-y-6">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="p-3 rounded-lg bg-slate-900 border border-slate-800 shadow-sm group transition-all duration-300 hover:border-slate-700"
                        >
                            <BarChart3 size={24} className="text-slate-400 group-hover:text-[#e6edf3] transition-colors" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-[#e6edf3]">
                                Sorting Visualizer
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#f5b942]"></span>
                                <p className="text-slate-400 text-sm font-medium">
                                    Algorithm Analysis Engine
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/Medhanshug99"
                            target="_blank"
                            rel="noreferrer"
                            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 transition-all text-slate-400 hover:text-[#e6edf3]"
                        >
                            <Github size={20} />
                        </a>
                        <div
                            className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-800/50 text-xs font-semibold tracking-wide text-slate-400 flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                            System Ready
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Controls Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        <section className="space-y-3">
                            <div className="flex items-center gap-2 pb-1 border-b border-slate-800/50">
                                <span className="text-[#f5b942] opacity-80">
                                    <Hash size={14} />
                                </span>
                                <label className="text-xs font-semibold text-slate-400">Configuration</label>
                            </div>
                            <AlgorithmSelector
                                selectedAlgo={selectedAlgo}
                                onSelect={(algo) => {
                                    setSelectedAlgo(algo);
                                    reset(initialArray);
                                }}
                                disabled={isAnimating && !isPaused}
                                themeColor={themeColor}
                            />
                        </section>

                        <section className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 pb-1 border-b border-slate-800/50">
                                    <span className="text-[#f5b942] opacity-80">
                                        <Activity size={14} />
                                    </span>
                                    <label className="text-xs font-semibold text-slate-400">Controls</label>
                                </div>
                                <ControlPanel
                                    onStart={handleStart}
                                    onPause={pauseAnimation}
                                    onResume={resumeAnimation}
                                    onReset={() => reset(initialArray)}
                                    onStep={stepForward}
                                    isAnimating={isAnimating}
                                    isPaused={isPaused}
                                    isStepMode={isStepMode}
                                    toggleStepMode={toggleStepMode}
                                    speed={speed}
                                    setSpeed={setSpeed}
                                    disabled={isAnimating}
                                    themeColor={themeColor}
                                    showValues={showValues}
                                    onToggleShowValues={() => setShowValues(prev => !prev)}
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 pb-1 border-b border-slate-800/50">
                                    <span className="text-[#f5b942] opacity-80">
                                        <Database size={14} />
                                    </span>
                                    <label className="text-xs font-semibold text-slate-400">Input Data</label>
                                </div>
                                <InputPanel
                                    onArrayChange={handleArrayChange}
                                    onGenerateRandom={handleRandomize}
                                    arraySize={arraySize}
                                    setArraySize={setArraySize}
                                    disabled={isAnimating}
                                    themeColor={themeColor}
                                />
                            </div>
                        </section>

                        <section className="space-y-3">
                            <div className="flex items-center gap-2 pb-1 border-b border-slate-800/50">
                                <span className="text-[#f5b942] opacity-80">
                                    <BarChart3 size={14} />
                                </span>
                                <label className="text-xs font-semibold text-slate-400">Telemetry</label>
                            </div>
                            <PerformancePanel
                                selectedAlgo={selectedAlgo}
                                currentStep={currentStepIndex}
                                totalSteps={totalSteps}
                                arraySize={array.length}
                                isAnimating={isAnimating}
                                isPaused={isPaused}
                                themeColor={themeColor}
                            />
                            <div className="pt-2">
                                <StatsPanel algorithm={selectedAlgo} themeColor={themeColor} />
                            </div>
                        </section>
                    </aside>

                    {/* Visualization Area */}
                    <main className="lg:col-span-8 space-y-6">
                        {/* Visualization Container */}
                        <div
                            className="relative aspect-video lg:aspect-square xl:aspect-video rounded-lg bg-slate-900 border border-slate-800 overflow-hidden flex items-end justify-center p-8 gap-[2px] shadow-sm transition-colors duration-300"
                            style={{ borderColor: isAnimating ? `${themeColor}40` : '#1e293b' }}
                        >
                            {/* Info Strip */}
                            <InfoStrip
                                array={array}
                                compareIndices={compareIndices}
                                swapIndices={swapIndices}
                                currentStep={currentStepIndex}
                                totalSteps={totalSteps}
                                themeColor={themeColor}
                                isAnimating={isAnimating}
                                isPaused={isPaused}
                            />

                            {/* Animated Top Progress Line - Thinner, more precise */}
                            {isAnimating && (
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-900 z-20">
                                    <div
                                        className="h-full transition-all duration-100 ease-linear"
                                        style={{
                                            width: `${(currentStepIndex / (totalSteps || 1)) * 100}%`,
                                            backgroundColor: themeColor,
                                            boxShadow: `0 0 8px ${themeColor}80`
                                        }}
                                    />
                                </div>
                            )}

                            {/* Background Engineering Grid (Subtle) */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                                style={{
                                    backgroundImage: `
                                        linear-gradient(#e6edf3 1px, transparent 1px),
                                        linear-gradient(90deg, #e6edf3 1px, transparent 1px)
                                    `,
                                    backgroundSize: '20px 20px'
                                }}
                            />

                            {/* Radial Depth Gradient */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 50% 100%, ${themeColor}05 0%, transparent 50%)`
                                }}
                            />

                            {array.map((value, idx) => (
                                <ArrayBar
                                    key={`${idx}-${value}`}
                                    value={value}
                                    maxValue={maxValue}
                                    isCompare={compareIndices.includes(idx)}
                                    isSwap={swapIndices.includes(idx)}
                                    isSorted={sortedIndices.has(idx)}
                                    width={array.length > 50 ? "4px" : array.length > 30 ? "8px" : "16px"}
                                    themeColor={themeColor}
                                    showValue={showValues}
                                />
                            ))}

                            {/* Status Indicator - Minimalist */}
                            <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
                                <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-950/50 backdrop-blur-md border border-slate-800">
                                    <span
                                        className={cn("w-1.5 h-1.5 rounded-full transition-all duration-300", isAnimating && !isPaused ? "animate-pulse" : "")}
                                        style={{ backgroundColor: isAnimating ? (isPaused ? "#f59e0b" : themeColor) : "#64748b" }}
                                    />
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                        {isAnimating ? (isPaused ? "Paused" : "Running") : "Idle"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap justify-center gap-6 px-6 py-3 rounded-lg bg-slate-900 border border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-slate-600" />
                                <span className="text-xs text-slate-400 font-medium">Idle</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                                <span className="text-xs text-slate-400 font-medium">Processing</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-500" />
                                <span className="text-xs text-slate-400 font-medium">Compare</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-xs text-slate-400 font-medium">Swap</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs text-slate-400 font-medium">Sorted</span>
                            </div>
                        </div>
                    </main>
                </div>

                {/* Footer */}
                <footer className="pt-8 pb-4 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-medium">
                    <p>© 2026 ||  Sorting Visualizer by Medhansh</p>
                    <ul className="flex gap-6">
                        <li>
                            <a href="https://github.com/Medhanshug99/sort-simulator" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#e6edf3] transition-colors">
                                <Github size={14} />
                                <span>Github</span>
                            </a>
                        </li>
                        <li>
                            {/* <a href="#" className="flex items-center gap-2 hover:text-[#e6edf3] transition-colors">
                                <BookOpen size={14} />
                                <span>Documentation</span>
                            </a> */}
                        </li>
                        <li>
                            {/* <a href="#" className="flex items-center gap-2 hover:text-[#e6edf3] transition-colors">
                                <Code2 size={14} />
                                <span>Source Code</span>
                            </a> */}
                        </li>
                    </ul>
                </footer>
            </div>
        </div>
    );
};


export default App;
