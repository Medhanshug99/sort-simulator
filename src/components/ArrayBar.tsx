import React from "react";
import { cn } from "../utils/helpers";

interface ArrayBarProps {
    value: number;
    maxValue: number;
    isCompare: boolean;
    isSwap: boolean;
    isSorted: boolean;
    width: string;
    themeColor: string;
}

const ArrayBar: React.FC<ArrayBarProps & { showValue: boolean }> = ({ value, maxValue, isCompare, isSwap, isSorted, width, themeColor, showValue }) => {
    const heightPercentage = Math.max((value / maxValue) * 100, 1);

    const isTextInside = heightPercentage > 15;

    const getBarStyle = () => {
        if (isCompare) return { background: "linear-gradient(to top, #d97706, #fbbf24)" }; // Amber gradient
        if (isSwap) return { background: "linear-gradient(to top, #dc2626, #ef4444)" };    // Red gradient
        if (isSorted) return { background: "linear-gradient(to top, #059669, #10b981)" };  // Green gradient

        return {
            background: `linear-gradient(to top, ${themeColor}CC, ${themeColor})`,
            boxShadow: `0 2px 0 ${themeColor}`
        };
    };

    const getTextStyle = () => {
        if (isSwap) return { color: "#ffffff", transform: "scale(1.2)" };
        if (isCompare) return { color: "#ffffff" };
        if (isSorted) return { color: "#ffffff" };

        return { color: isTextInside ? "#ffffff" : themeColor };
    };

    const fontSize = width === "16px" || width === "20px" || width === "24px"
        ? "10px"
        : width === "32px" ? "12px" : "9px";
    const widthVal = parseInt(width.replace("px", ""));
    const isTooNarrow = widthVal < 12;

    return (
        <div
            className="relative rounded-t-[2px] transition-all duration-100 ease-out flex items-end justify-center group"
            style={{
                height: `${heightPercentage}%`,
                width: width,
                ...getBarStyle()
            }}
        >
            {showValue && !isTooNarrow && (
                <span
                    className={cn(
                        "absolute font-mono font-bold tracking-tight transition-all duration-100 pointer-events-none z-10",
                        isTextInside ? "bottom-1.5" : "-top-5"
                    )}
                    style={{
                        fontSize,
                        ...getTextStyle(),
                        textShadow: isTextInside ? "0 1px 2px rgba(0,0,0,0.5)" : "none",
                        opacity: 1
                    }}
                >
                    {value}
                </span>
            )}
        </div>
    );
};

export default React.memo(ArrayBar);
