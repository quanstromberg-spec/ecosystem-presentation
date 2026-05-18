import React, { useState, useRef } from "react";
import { SegmentControlComponent } from "./segment-control.component";

const COLOR_GREY600 = "#3D3D3C";
const SLIDE_DURATION = 320; // duration-t2

// ── Desktop styles ──────────────────────────────────────────────────────────

const titleStyle: React.CSSProperties = {
  fontFamily: "'Husqvarna Gothic', sans-serif",
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: "32px",
  letterSpacing: "-0.2px",
  color: COLOR_GREY600,
  margin: 0,
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 350,
  fontSize: "18px",
  lineHeight: "28px",
  letterSpacing: "0.4px",
  color: COLOR_GREY600,
  margin: 0,
  fontVariationSettings: "'wdth' 100",
};

// ── Mobile styles ───────────────────────────────────────────────────────────

const mobileTitleStyle: React.CSSProperties = {
  fontFamily: "'Husqvarna Gothic', sans-serif",
  fontWeight: 700,
  fontSize: "24px",
  lineHeight: "28px",
  color: COLOR_GREY600,
  margin: 0,
};

const mobileSubtitleStyle: React.CSSProperties = {
  fontFamily: "'Husqvarna Gothic', sans-serif",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "20px",
  color: COLOR_GREY600,
  margin: 0,
};

const mobileBodyStyle: React.CSSProperties = {
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 350,
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.4px",
  color: COLOR_GREY600,
  margin: 0,
  opacity: 0.8,
  fontVariationSettings: "'wdth' 100",
};

const mobileReadMoreStyle: React.CSSProperties = {
  fontFamily: "'Roboto', sans-serif",
  fontWeight: 350,
  fontSize: "14px",
  lineHeight: "20px",
  letterSpacing: "0.4px",
  color: COLOR_GREY600,
  textDecoration: "underline",
  cursor: "pointer",
  fontVariationSettings: "'wdth' 100",
};

// ── Tab data ────────────────────────────────────────────────────────────────

const CONTAINER_WIDTH = 800;
const PADDING = 8;
const GAP = 8;

type TabItem = {
  label: string;
  mobileLabel: string;
  image: string;
  body: string;
  mobileBody: string;
};

const TABS: TabItem[] = [
  {
    label: "REMOTE MANAGEMENT",
    mobileLabel: "REMOTE MANAGEMENT",
    image:
      "https://www-static-nw.husqvarna.com/-/images/aprimo/husqvarna/robotic-mowers/photos/action/o/op/op-110112.webp?v=d8e09db8427f33c&format=WEBP_LANDSCAPE_COVER_XXL",
    body: "Husqvarna robotic mowers are part of a comprehensive system – guided via satellite signals. With Husqvarna EPOS® (Exact Positioning Operating System) technology, the working area is defined with virtual boundaries. You then control your mowers with Husqvarna Fleet Services, available both as an app and on desktop. You easily monitor status, edit mowing areas or change cutting patterns or mowing height. Efficient, flexible installations, remote control and minimal hassle – all easily adaptable to any type of area or application.",
    mobileBody:
      "Husqvarna robotic mowers are part of a comprehensive system – guided via satellite signals. With Husqvarna EPOS® (Exact Positioning Operating System) technology, the working area is defined with virtual boundaries.",
  },
  {
    label: "AI VISION CAPABILITIES",
    mobileLabel: "AI VISION CAPABILITIES",
    image:
      "https://www-static-nw.husqvarna.com/-/images/aprimo/husqvarna/robotic-mowers/photos/action/i/is/is-749660.webp?v=e71689f68427f33c&format=WEBP_LANDSCAPE_COVER_XXL",
    body: "Husqvarna has always been at the forefront of robotic lawn care — and with the introduction of AI Vision technology, the Automower takes another leap forward. Under the AI Vision platform, Husqvarna's robotic mowers use cameras and AI algorithms to recognise the lawn in real time, avoid obstacles, and create precise cutting patterns — no boundary wires needed. The technology allows the mowers to recognise objects in real time and continue working even where the satellite signal is weak.",
    mobileBody:
      "Husqvarna has always been at the forefront of robotic lawn care — and with the introduction of AI Vision technology, the Automower takes another leap forward. Husqvarna's robotic mowers use cameras and AI algorithms to recognise the lawn in real time, avoid obstacles, and create precise cutting patterns — no boundary wires needed.",
  },
  {
    label: "FLEXIBLE INSTALLATION",
    mobileLabel: "FLEXIBLE INSTALLATION",
    image:
      "https://www-static-nw.husqvarna.com/-/images/aprimo/husqvarna/robotic-mower-installation-materials/photos/action/mx-143532.webp?v=33fd4ee5f9be1f8&format=WEBP_LANDSCAPE_COVER_XXXL",
    body: "Husqvarna Automower offers different installation paths depending on your garden, connectivity, and model — from traditional boundary wires to fully virtual, satellite-based setups. A physical wire is laid around the lawn's perimeter to define the mowing area. It's a reliable, offline solution that doesn't depend on internet or satellite signals. Some EPOS-capable mowers can even use a boundary wire as a backup in specific zones — a feature called Support by Wire — for areas where satellite coverage is weak.",
    mobileBody:
      "Husqvarna Automower offers different installation paths depending on your garden, connectivity, and model — from traditional boundary wires to fully virtual, satellite-based setups. A physical wire is laid around the lawn's perimeter to define the mowing area.",
  },
  {
    label: "SERVICE PLUS",
    mobileLabel: "SERVICE PLUS",
    image:
      "https://www-static-nw.husqvarna.com/-/images/aprimo/husqvarna/robotic-mowers/photos/action/o/op/op-110112.webp?v=d8e09db8427f33c&format=WEBP_LANDSCAPE_COVER_XXL",
    body: "Husqvarna Service Plus keeps your fleet performing at its best all season long. With scheduled maintenance, genuine parts, and trained technicians, you minimise downtime and maximise productivity. Service agreements are tailored to your operation — covering everything from software updates and blade changes to full mechanical inspections.",
    mobileBody:
      "Husqvarna Service Plus keeps your fleet performing at its best all season long. With scheduled maintenance, genuine parts, and trained technicians, you minimise downtime and maximise productivity.",
  },
];

// ── Slide keyframes (injected once as a <style> tag) ────────────────────────

const KEYFRAMES = `
  @keyframes eco-slide-in-right  { from { transform: translateX(100%); } to { transform: translateX(0); } }
  @keyframes eco-slide-out-left  { from { transform: translateX(0); }    to { transform: translateX(-100%); } }
  @keyframes eco-slide-in-left   { from { transform: translateX(-100%); } to { transform: translateX(0); } }
  @keyframes eco-slide-out-right { from { transform: translateX(0); }    to { transform: translateX(100%); } }
  @keyframes eco-fade-in         { from { opacity: 0; } to { opacity: 1; } }
`;

// ── Component ───────────────────────────────────────────────────────────────

export type EcosystemPresentationProps = {
  defaultActiveIndex?: number;
  tabCount?: number;
  customLabels?: string[];
  forceMobile?: boolean;
};

export const EcosystemPresentationComponent = ({
  defaultActiveIndex = 0,
  tabCount,
  customLabels,
  forceMobile,
}: EcosystemPresentationProps) => {
  const isMobile = forceMobile !== undefined ? forceMobile : window.innerWidth < 768;

  // Apply tabCount slice and optional label overrides
  const activeTabs = TABS.slice(0, tabCount ?? TABS.length).map((tab, i) => ({
    ...tab,
    label: customLabels?.[i] || tab.label,
    mobileLabel: customLabels?.[i] || tab.mobileLabel,
  }));

  const clampedDefault = Math.min(defaultActiveIndex, activeTabs.length - 1);
  const [activeIndex, setActiveIndex] = useState(clampedDefault);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [slideDir, setSlideDir] = useState<"right" | "left">("right");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when tabCount changes (activeTabs.length changes)
  const prevLengthRef = useRef(activeTabs.length);
  if (prevLengthRef.current !== activeTabs.length) {
    prevLengthRef.current = activeTabs.length;
    const clamped = Math.min(activeIndex, activeTabs.length - 1);
    if (clamped !== activeIndex) setActiveIndex(clamped);
    if (prevIndex !== null) setPrevIndex(null);
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }

  const handleTabChange = (newIndex: number) => {
    if (newIndex === activeIndex) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setSlideDir(newIndex > activeIndex ? "right" : "left");
    setPrevIndex(activeIndex);
    setActiveIndex(newIndex);
    timerRef.current = setTimeout(() => setPrevIndex(null), SLIDE_DURATION);
  };

  const tab = activeTabs[activeIndex];
  const buttonWidth = (CONTAINER_WIDTH - 2 * PADDING - (activeTabs.length - 1) * GAP) / activeTabs.length;
  const imageHeight = isMobile ? 278 : 425;
  const imageRadius = isMobile ? 20 : 16;

  const inAnim = slideDir === "right" ? "eco-slide-in-right" : "eco-slide-in-left";
  const outAnim = slideDir === "right" ? "eco-slide-out-left" : "eco-slide-out-right";
  const animCss = (name: string): React.CSSProperties => ({
    animation: `${name} ${SLIDE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
  });

  // Shared image block with slide transition
  const imageBlock = (
    <div
      style={{
        position: "relative",
        height: imageHeight,
        borderRadius: imageRadius,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* Outgoing image */}
      {prevIndex !== null && (
        <img
          key={`out-${prevIndex}`}
          src={activeTabs[prevIndex]?.image}
          alt={activeTabs[prevIndex]?.label}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            ...animCss(outAnim),
          }}
        />
      )}
      {/* Incoming image */}
      <img
        key={`in-${activeIndex}`}
        src={tab.image}
        alt={tab.label}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          ...(prevIndex !== null ? animCss(inAnim) : {}),
        }}
      />
    </div>
  );

  // ── Mobile layout ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <style>{KEYFRAMES}</style>
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            paddingTop: "32px",
            paddingBottom: "48px",
            paddingLeft: "24px",
            paddingRight: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          {/* Title + intro */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={mobileTitleStyle}>Your crafted eco-system</p>
            <p style={mobileBodyStyle}>
              Husqvarna products are powerful on their own — but their true potential is unlocked
              when they work as one system. By combining machines from the Husqvarna range with our
              Fleet Services and professional servicing, you gain better control, greater efficiency,
              and more uptime across your entire operation.
            </p>
          </div>

          {/* Segment control + content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
            <p style={mobileSubtitleStyle}>Three dimensions of Husqvarna's eco-system</p>

            <SegmentControlComponent
              key={`${clampedDefault}-${activeTabs.length}`}
              items={activeTabs.map((t) => ({ label: t.label }))}
              defaultActiveIndex={clampedDefault}
              onActiveChange={handleTabChange}
              isMobile={true}
              buttonHug={true}
              backgroundColor="grey"
              activeStyle="default"
            />

            {imageBlock}

            {/* Body + read more — fade on change */}
            <div
              key={`mobile-body-${activeIndex}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                animation: prevIndex !== null
                  ? `eco-fade-in ${SLIDE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                  : "none",
              }}
            >
              <p style={mobileBodyStyle}>{tab.mobileBody}</p>
              <span style={mobileReadMoreStyle}>→ Read more</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Desktop layout ────────────────────────────────────────────────────────
  return (
    <>
      <style>{KEYFRAMES}</style>
      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          paddingTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          width: `${CONTAINER_WIDTH}px`,
          boxSizing: "border-box",
        }}
      >
        {/* Title + intro */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <p style={titleStyle}>A system for professionals</p>
          <p style={bodyStyle}>
            Husqvarna products are powerful on their own — but their true potential is unlocked when
            they work as one system. By combining machines from the Husqvarna range with our Fleet
            Services and professional servicing, you gain better control, greater efficiency, and
            more uptime across your entire operation.
          </p>
        </div>

        {/* Segment control + content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <SegmentControlComponent
            key={`${clampedDefault}-${activeTabs.length}`}
            items={activeTabs.map((t) => ({ label: t.label }))}
            defaultActiveIndex={clampedDefault}
            onActiveChange={handleTabChange}
            buttonWidth={buttonWidth}
            backgroundColor="grey"
            activeStyle="default"
            isMobile={false}
          />

          {imageBlock}

          {/* Body + read more — fade on change */}
          <div
            key={`desktop-body-${activeIndex}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              animation: prevIndex !== null
                ? `eco-fade-in ${SLIDE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`
                : "none",
            }}
          >
            <p style={bodyStyle}>{tab.body}</p>
            <span style={{ ...bodyStyle, textDecoration: "underline", cursor: "pointer" }}>
              → Read more
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
