import React from "react";
import { cn } from "@/lib/utils";

interface FrameDivProps {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  borderRadius?: number;
  showBRStyle?: boolean;
  showDots?: boolean;
  dotSize?: number;
  dotSpacing?: number;
  showParent?: boolean;
  showWidthBadge?: boolean;
  showHeightBadge?: boolean;
  className?: string;
  parentPadding?: string;
  innerPadding?: string;
  childrenFullWidth?: boolean;
  childrenFullHeight?: boolean;
}

export function FrameDiv({
  children,
  width = "400px",
  height = "200px",
  borderRadius = 0,
  showBRStyle = true,
  showDots = true,
  dotSize = 2,
  dotSpacing = 15,
  showParent = true,
  showWidthBadge = true,
  showHeightBadge = true,
  className,
  parentPadding = "1rem",
  innerPadding = "0.5rem",
  childrenFullWidth = false,
  childrenFullHeight = false,
}: FrameDivProps) {
  const frameId = React.useMemo(() => Math.random().toString(36).slice(2), []);

  // Handle full space for empty strings
  const finalWidth = width === "" ? "100%" : width;
  const finalHeight = height === "" ? "100%" : height;

  // Get display text for badges
  const getDisplayText = (value: string, dimension: "width" | "height") => {
    if (value === "" || value === "100%") {
      return "Fill";
    }
    return `${dimension === "width" ? "W" : "H"}: ${value}`;
  };

  return (
    <div
      className={cn(
        "relative",
        showParent ? "border border-current" : "",
        className
      )}
      style={{
        width: finalWidth,
        height: finalHeight,
        padding: parentPadding,
        boxSizing: "border-box",
      }}
    >
      {/* Second div - Child container with inner border radius */}
      <div
        className="relative w-full h-full"
        style={{
          padding: innerPadding,
          boxSizing: "border-box",
          borderRadius: showBRStyle ? `${borderRadius}px` : 0,
          border: showBRStyle ? "1px solid currentColor" : "none",
        }}
      >
        {/* Third div - Data container */}
        <div
          className="relative bg-background"
          style={{
            zIndex: 10,
            width: childrenFullWidth ? "100%" : "auto",
            height: childrenFullHeight ? "100%" : "auto",
          }}
        >
          {children}
        </div>

        {/* Lines behind the data container */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <defs>
            {/* Dot pattern */}
            {showDots && (
              <pattern
                id={`dots-${frameId}`}
                x="0"
                y="0"
                width={dotSpacing}
                height={dotSpacing}
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx={dotSpacing / 2}
                  cy={dotSpacing / 2}
                  r={dotSize / 2}
                  fill="currentColor"
                  opacity={0.3}
                />
              </pattern>
            )}
          </defs>

          {/* Background dots */}
          {showDots && (
            <rect
              width="100%"
              height="100%"
              fill={`url(#dots-${frameId})`}
              className="text-muted-foreground"
            />
          )}
        </svg>
      </div>

      {showParent && showWidthBadge && (
        <div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-background px-1"
          style={{ fontSize: "10px" }}
        >
          <span className="font-mono text-muted-foreground">
            {getDisplayText(width, "width")}
          </span>
        </div>
      )}

      {/* Height badge - plain text */}
      {showParent && showHeightBadge && (
        <div
          className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-background px-1"
          style={{
            fontSize: "10px",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
          }}
        >
          <span className="font-mono text-muted-foreground">
            {getDisplayText(height, "height")}
          </span>
        </div>
      )}
    </div>
  );
}
