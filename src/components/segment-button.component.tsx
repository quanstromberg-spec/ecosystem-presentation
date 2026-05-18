import React, { useState } from "react";

// Design token values from @husqvarna/ui-core
const COLOR_PRIMARY = "#273A60";      // Token: Primary
const COLOR_WHITE = "#FFFFFF";        // Token: White
const COLOR_GREY600 = "#3D3D3C";      // Token: Grey600
const COLOR_FOCUS_RING = "#D73F0D";   // Husqvarna Orange 110 (no token alias)
const COLOR_HOVER_GHOST_BG = "rgba(0,0,0,0.08)"; // Tints/Black 8%

export type SegmentButtonStyle = "ghost" | "default" | "prominent";
export type SegmentButtonState = "rest" | "hover" | "focus";

export type SegmentButtonComponentProps = {
  label?: string;
  buttonStyle?: SegmentButtonStyle;
  /** Optional forced state — overrides real mouse/keyboard interaction */
  buttonState?: SegmentButtonState;
  isMobile?: boolean;
  onClick?: () => void;
};

export const SegmentButtonComponent = ({
  label = "Service Plus",
  buttonStyle = "ghost",
  buttonState,
  isMobile = false,
  onClick,
}: SegmentButtonComponentProps) => {
  const [internalState, setInternalState] = useState<SegmentButtonState>("rest");

  // Forced state from props takes priority (for static documentation)
  const activeState = buttonState ?? internalState;

  const isGhost = buttonStyle === "ghost";
  const isDefault = buttonStyle === "default";
  const isProminent = buttonStyle === "prominent";
  const isHover = activeState === "hover";
  const isFocus = activeState === "focus";

  const width = isMobile ? "140px" : "210px";
  const height = isMobile ? "40px" : "48px";
  // Mobile: default/prominent use 12px radius; ghost keeps 16px on both
  const borderRadius = isMobile && !isGhost ? "12px" : "16px";

  const baseStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width,
    height,
    borderRadius,
    cursor: "pointer",
    border: "none",
    background: "transparent",
    padding: "0 32px",
    boxSizing: "border-box",
    outline: "none",
    transition: "background 200ms cubic-bezier(0.4, 0, 0.2, 1), border 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  };

  // Background
  if (isGhost && isHover) {
    baseStyle.background = COLOR_HOVER_GHOST_BG;
  } else if (isDefault) {
    baseStyle.background = COLOR_WHITE;
  } else if (isProminent) {
    baseStyle.background = COLOR_PRIMARY;
  }

  // Border
  if (isGhost && isFocus) {
    baseStyle.border = `2px solid ${COLOR_FOCUS_RING}`;
  } else if (isDefault) {
    baseStyle.border = `1px solid ${COLOR_GREY600}`;
  } else if (isProminent && isFocus) {
    baseStyle.border = `1px solid ${COLOR_WHITE}`;
  }

  // Outer focus ring via CSS outline — perfectly symmetric, follows border-radius
  if (isFocus && (isDefault || isProminent)) {
    baseStyle.outline = `2px solid ${COLOR_FOCUS_RING}`;
    baseStyle.outlineOffset = "2px";
  }

  const textColor = isProminent ? COLOR_WHITE : COLOR_GREY600;

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Husqvarna Gothic', sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "14px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: textColor,
    whiteSpace: "nowrap",
    paddingBottom: "1px",
  };

  return (
    <button
      style={baseStyle}
      onClick={onClick}
      type="button"
      onMouseEnter={() => { if (!buttonState) setInternalState("hover"); }}
      onMouseLeave={() => { if (!buttonState) setInternalState("rest"); }}
      onFocus={() => { if (!buttonState) setInternalState("focus"); }}
      onBlur={() => { if (!buttonState) setInternalState("rest"); }}
    >
      <span style={labelStyle}>{label}</span>
    </button>
  );
};
