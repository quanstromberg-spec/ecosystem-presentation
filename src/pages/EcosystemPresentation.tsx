import { useState, useEffect } from "react";
import { EcosystemPresentationComponent } from "../components/ecosystem-presentation.component";

type ViewMode = "desktop" | "mobile";

type Config = {
  tabCount: 2 | 3 | 4;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
};

const DEFAULT_CONFIG: Config = {
  tabCount: 3,
  label1: "REMOTE MANAGEMENT",
  label2: "AI VISION CAPABILITIES",
  label3: "FLEXIBLE INSTALLATION",
  label4: "SERVICE PLUS",
};

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

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "36px",
  backgroundColor: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "6px",
  color: "#FFFFFF",
  fontFamily: "'Roboto', sans-serif",
  fontSize: "13px",
  padding: "0 10px",
  boxSizing: "border-box",
  outline: "none",
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(255,255,255,0.5)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  paddingRight: "28px",
};

const dividerStyle: React.CSSProperties = {
  height: "1px",
  backgroundColor: "rgba(255,255,255,0.08)",
  margin: "0 -20px",
};

function ControlField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span style={sectionLabelStyle}>{label}</span>
      {children}
    </div>
  );
}

// ── Viewport toggle ──────────────────────────────────────────────────────────

function ViewportToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
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
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="2" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 12h5M7 10v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );

  const mobileIcon = (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="5" cy="11" r="0.8" fill="currentColor" />
    </svg>
  );

  return (
    <ControlField label="Viewport">
      <div
        style={{
          display: "flex",
          gap: "4px",
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "8px",
          padding: "3px",
        }}
      >
        {pill("desktop", desktopIcon, "Desktop")}
        {pill("mobile", mobileIcon, "Mobile")}
      </div>
    </ControlField>
  );
}

// ── Config panel ─────────────────────────────────────────────────────────────

function ConfigPanel({
  config,
  onChange,
  viewMode,
  onViewModeChange,
  open,
  onToggle,
}: {
  config: Config;
  onChange: (next: Partial<Config>) => void;
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        ...panelBaseStyle,
        transform: open ? "translateX(0)" : "translateX(260px)",
      }}
    >
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
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 320ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <path d="M6 3L11 8L6 13" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="7" cy="7" r="2.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.93 2.93l1.41 1.41M9.66 9.66l1.41 1.41M2.93 11.07l1.41-1.41M9.66 4.34l1.41-1.41" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.6px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Configuration
        </span>
      </div>

      {/* Scrollable controls */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          overflowY: "auto",
          flex: 1,
        }}
      >
        {/* Viewport toggle — top of the panel */}
        <ViewportToggle value={viewMode} onChange={onViewModeChange} />

        <div style={dividerStyle} />

        {/* Number of tabs */}
        <ControlField label="Number of segment tabs">
          <select
            style={selectStyle}
            value={config.tabCount}
            onChange={(e) => onChange({ tabCount: Number(e.target.value) as 2 | 3 | 4 })}
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </ControlField>

        <div style={dividerStyle} />

        <ControlField label="Tab 1 label">
          <input style={inputStyle} value={config.label1} onChange={(e) => onChange({ label1: e.target.value })} />
        </ControlField>

        <ControlField label="Tab 2 label">
          <input style={inputStyle} value={config.label2} onChange={(e) => onChange({ label2: e.target.value })} />
        </ControlField>

        {config.tabCount >= 3 && (
          <ControlField label="Tab 3 label">
            <input style={inputStyle} value={config.label3} onChange={(e) => onChange({ label3: e.target.value })} />
          </ControlField>
        )}

        {config.tabCount >= 4 && (
          <ControlField label="Tab 4 label">
            <input style={inputStyle} value={config.label4} onChange={(e) => onChange({ label4: e.target.value })} />
          </ControlField>
        )}

        <div style={dividerStyle} />

        <button
          onClick={() => onChange(DEFAULT_CONFIG)}
          style={{
            height: "36px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "6px",
            color: "rgba(255,255,255,0.6)",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.4px",
            cursor: "pointer",
            transition: "border-color 200ms, color 200ms",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.5)";
            (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
          }}
        >
          Reset to defaults
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const MOBILE_FRAME_WIDTH = 390;

export default function EcosystemPresentation() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [panelOpen, setPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("desktop");

  // Auto-close panel on real mobile screens
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setPanelOpen(false); };
    mq.addEventListener("change", handler);
    if (mq.matches) setPanelOpen(false);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleChange = (next: Partial<Config>) => {
    setConfig((prev) => ({ ...prev, ...next }));
  };

  const customLabels = [config.label1, config.label2, config.label3, config.label4].slice(0, config.tabCount);
  const stableKey = `${viewMode}-${config.tabCount}-${customLabels.join("|")}`;

  const isMobileView = viewMode === "mobile";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: isMobileView ? "#F5F5F4" : "#FFFFFF" }}>
      {/* Canvas */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          minHeight: "100vh",
          padding: isMobileView ? "40px 24px" : "40px 24px",
          boxSizing: "border-box",
        }}
      >
        {isMobileView ? (
          /* Mobile frame */
          <div
            style={{
              width: MOBILE_FRAME_WIDTH,
              backgroundColor: "#FFFFFF",
              borderRadius: "24px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <EcosystemPresentationComponent
              key={stableKey}
              tabCount={config.tabCount}
              customLabels={customLabels}
              forceMobile={true}
            />
          </div>
        ) : (
          <EcosystemPresentationComponent
            key={stableKey}
            tabCount={config.tabCount}
            customLabels={customLabels}
            forceMobile={false}
          />
        )}
      </div>

      {/* Config panel */}
      <ConfigPanel
        config={config}
        onChange={handleChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        open={panelOpen}
        onToggle={() => setPanelOpen((v) => !v)}
      />
    </div>
  );
}
