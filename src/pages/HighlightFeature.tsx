import { useState, useEffect } from "react";
import { HighlightFeatureComponent } from "../components/pro-pdp/highlight-feature.component";

type ViewMode = "desktop" | "mobile";

const panelBaseStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
  zIndex: 100,
  width: 260,
  backgroundColor: "#1A1A1A",
  color: "#FFFFFF",
  fontFamily: "'Roboto', sans-serif",
  boxShadow: "-4px 0 24px rgba(0,0,0,0.18)",
  display: "flex",
  flexDirection: "column",
  transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
};

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.8px",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.5)",
  marginBottom: "6px",
  display: "block",
};

function ControlField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span style={sectionLabelStyle}>{label}</span>
      {children}
    </div>
  );
}

function ViewportToggle({ value, onChange }: { value: ViewMode; onChange: (v: ViewMode) => void }) {
  const pill = (mode: ViewMode, icon: React.ReactNode, label: string) => {
    const active = value === mode;
    return (
      <button
        key={mode}
        onClick={() => onChange(mode)}
        style={{
          flex: 1,
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Roboto', sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.4px",
          transition: "background 200ms, color 200ms",
          background: active ? "#FFFFFF" : "transparent",
          color: active ? "#1A1A1A" : "rgba(255,255,255,0.45)",
        }}
      >
        {icon}
        {label}
      </button>
    );
  };

  const desktopIcon = (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="2" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 12h5M7 10v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );

  const mobileIcon = (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
      <rect x="1" y="1" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="5" cy="11" r="0.8" fill="currentColor" />
    </svg>
  );

  return (
    <ControlField label="Viewport">
      <div style={{ display: "flex", gap: "4px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "8px", padding: "3px" }}>
        {pill("desktop", desktopIcon, "Desktop")}
        {pill("mobile", mobileIcon, "Mobile")}
      </div>
    </ControlField>
  );
}

function ConfigPanel({
  viewMode,
  onViewModeChange,
  open,
  onToggle,
}: {
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div style={{ ...panelBaseStyle, transform: open ? "translateX(0)" : "translateX(260px)" }}>
      {/* Collapse tab */}
      <button
        onClick={onToggle}
        style={{
          position: "absolute",
          top: "50%",
          left: -36,
          transform: "translateY(-50%)",
          width: 36,
          height: 72,
          background: "#1A1A1A",
          border: "none",
          borderRadius: "8px 0 0 8px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.2)",
          padding: 0,
        }}
        aria-label={open ? "Close configuration" : "Open configuration"}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          <path d="M6 3L11 8L6 13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.41 1.41M9.66 9.66l1.41 1.41M2.93 11.07l1.41-1.41M9.66 4.34l1.41-1.41" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
          Configuration
        </span>
      </div>

      {/* Controls */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px", overflowY: "auto", flex: 1 }}>
        <ViewportToggle value={viewMode} onChange={onViewModeChange} />
      </div>
    </div>
  );
}

const MOBILE_FRAME_WIDTH = 390;

export default function HighlightFeature() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setPanelOpen(false); };
    mq.addEventListener("change", handler);
    if (mq.matches) setPanelOpen(false);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isMobileView = viewMode === "mobile";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: isMobileView ? "#F5F5F4" : "#FFFFFF" }}>
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 24px",
        boxSizing: "border-box",
      }}>
        {isMobileView ? (
          <div style={{
            width: MOBILE_FRAME_WIDTH,
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <div style={{ padding: "0 12px" }}>
              <HighlightFeatureComponent key="mobile" forceMobile={true} />
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: "800px", overflow: "hidden" }}>
            <HighlightFeatureComponent key="desktop" forceMobile={false} />
          </div>
        )}
      </div>

      <ConfigPanel
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        open={panelOpen}
        onToggle={() => setPanelOpen((v) => !v)}
      />
    </div>
  );
}
