import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

// Design tokens
const COLOR_PRIMARY = "#273A60";          // Token: Primary
const COLOR_WHITE = "#FFFFFF";            // Token: White
const COLOR_GREY600 = "#3D3D3C";          // Token: Grey600
const COLOR_GREY200 = "#EEEEED";          // Token: Grey200
const COLOR_HOVER_BG = "rgba(0,0,0,0.08)"; // Tints/Black 8%

const BUTTON_WIDTH = 210;
const PADDING = 8;
const GAP = 8;

const MOBILE_BUTTON_WIDTH = 140;
const MOBILE_BUTTON_HEIGHT = 40;
const MOBILE_GAP = 4;

// duration-t2: 320ms, standard-easing: cubic-bezier(0.4, 0, 0.2, 1)
const TRANSITION = "320ms cubic-bezier(0.4, 0, 0.2, 1)";

export type SegmentControlBackground = "grey" | "white";
export type SegmentControlActiveStyle = "default" | "prominent";

export type SegmentControlItem = {
  label: string;
};

export type SegmentControlComponentProps = {
  backgroundColor?: SegmentControlBackground;
  activeStyle?: SegmentControlActiveStyle;
  items?: SegmentControlItem[];
  defaultActiveIndex?: number;
  isMobile?: boolean;
  buttonWidth?: number;
  buttonHug?: boolean;
  onActiveChange?: (index: number) => void;
};

const DEFAULT_ITEMS: SegmentControlItem[] = [
  { label: "Fleet Services" },
  { label: "Pro Range" },
  { label: "Service Plus" },
  { label: "Service Plus" },
];

export const SegmentControlComponent = ({
  backgroundColor = "grey",
  activeStyle = "default",
  items = DEFAULT_ITEMS,
  defaultActiveIndex = 2,
  isMobile = false,
  buttonWidth: buttonWidthProp,
  buttonHug = false,
  onActiveChange,
}: SegmentControlComponentProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [focusIndex, setFocusIndex] = useState<number | null>(null);
  const isMouseInteraction = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pillDims, setPillDims] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    if (!buttonHug) return;
    const btn = buttonRefs.current[activeIndex];
    if (!btn) return;
    setPillDims({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [activeIndex, buttonHug, items]);

  // Auto-scroll active button to the left edge on mobile
  useEffect(() => {
    if (!isMobile || !scrollRef.current) return;
    const btn = buttonRefs.current[activeIndex];
    if (!btn) return;
    scrollRef.current.scrollTo({ left: btn.offsetLeft - PADDING, behavior: "smooth" });
  }, [activeIndex, isMobile]);


  const btnWidth = buttonWidthProp ?? (isMobile ? MOBILE_BUTTON_WIDTH : BUTTON_WIDTH);
  const btnHeight = isMobile ? MOBILE_BUTTON_HEIGHT : 48;
  const gap = isMobile ? MOBILE_GAP : GAP;
  const pillRadius = isMobile ? 12 : 16;
  const containerRadius = isMobile ? 16 : 24;

  const pillOffset = activeIndex * (btnWidth + gap);

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    padding: PADDING,
    gap,
    borderRadius: containerRadius,
    width: "fit-content",
    boxSizing: "border-box",
    backgroundColor: backgroundColor === "white" ? COLOR_WHITE : COLOR_GREY200,
  };

  const pillStyle: React.CSSProperties = buttonHug
    ? {
        position: "absolute",
        top: PADDING,
        left: 0,
        width: pillDims?.width ?? 0,
        height: btnHeight,
        borderRadius: pillRadius,
        transform: `translateX(${pillDims?.left ?? 0}px)`,
        transition: `transform ${TRANSITION}, width ${TRANSITION}`,
        background: activeStyle === "prominent" ? COLOR_PRIMARY : COLOR_WHITE,
        border: activeStyle === "default" ? `1px solid ${COLOR_GREY600}` : "none",
        boxSizing: "border-box",
        pointerEvents: "none",
        opacity: pillDims ? 1 : 0,
      }
    : {
        position: "absolute",
        top: PADDING,
        left: PADDING,
        width: btnWidth,
        height: btnHeight,
        borderRadius: pillRadius,
        transform: `translateX(${pillOffset}px)`,
        transition: `transform ${TRANSITION}`,
        background: activeStyle === "prominent" ? COLOR_PRIMARY : COLOR_WHITE,
        border: activeStyle === "default" ? `1px solid ${COLOR_GREY600}` : "none",
        boxSizing: "border-box",
        pointerEvents: "none",
      };

  const inner = (
    <div style={containerStyle}>
      {/* Sliding pill indicator */}
      <span style={pillStyle} />

      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const isHovered = hoverIndex === index && !isActive;
        const isFocused = focusIndex === index;
        const textColor =
          isActive && activeStyle === "prominent" ? COLOR_WHITE : COLOR_GREY600;

        const buttonStyle: React.CSSProperties = {
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: buttonHug ? "auto" : btnWidth,
          height: btnHeight,
          flexShrink: 0,
          borderRadius: isMobile ? (isActive ? pillRadius : 16) : 16,
          cursor: "pointer",
          border: "none",
          background: isHovered ? COLOR_HOVER_BG : "transparent",
          padding: buttonHug ? "0 16px" : "0 32px",
          boxSizing: "border-box",
          outline: isFocused ? `2px solid #D73F0D` : "none",
          outlineOffset: isFocused ? "2px" : undefined,
          transition: `background 200ms cubic-bezier(0.4, 0, 0.2, 1)`,
        };

        const labelStyle: React.CSSProperties = {
          fontFamily: "'Husqvarna Gothic', sans-serif",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "14px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: textColor,
          transition: `color ${TRANSITION}`,
          whiteSpace: "nowrap",
          paddingBottom: "1px",
        };

        return (
          <button
            key={index}
            ref={(el) => { buttonRefs.current[index] = el; }}
            style={buttonStyle}
            type="button"
            onClick={() => { setActiveIndex(index); onActiveChange?.(index); }}
            onMouseDown={() => { isMouseInteraction.current = true; }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            onFocus={() => {
              if (!isMouseInteraction.current) setFocusIndex(index);
              isMouseInteraction.current = false;
            }}
            onBlur={() => setFocusIndex(null)}
          >
            <span style={labelStyle}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );

  if (isMobile) {
    return (
      <div
        ref={scrollRef}
        style={{
          width: "100%",
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          boxSizing: "border-box",
        } as React.CSSProperties}
      >
        {inner}
      </div>
    );
  }

  return inner;
};
