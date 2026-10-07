import type { ReactNode } from "react";

const NAVY = "#0b1f3a";
const WARM = "#5c5346";
const RED = "#cd2727";

export type SketchSlug =
  | "dscr"
  | "bridge"
  | "fix-and-flip"
  | "ground-up"
  | "mid-construction"
  | "commercial-dscr";

const ground = <path d="M6 138 C60 137.2 120 138.6 180 137.6 S 262 138.4 274 138" />;

/** Front elevations drawn by hand: hand-placed points, no fills, one red dashed accent at most. */
const drawings: Record<SketchSlug, ReactNode> = {
  dscr: (
    <>
      <path d="M58 77 L140.3 35 L222.4 77.3" />
      <path d="M70 71 L70.4 137.6 M210 71 L209.6 137.6" />
      <path d="M62 92.4 L218.3 91.8" />
      <path d="M78 92 L78.2 137.5 M116 92 L116 137.5 M164 92 L164.3 137.5 M202 92 L202 137.5" stroke={WARM} strokeWidth="1.2" />
      <path d="M70 118.2 L116 117.8 M164 117.9 L210 118.3" stroke={WARM} strokeWidth="1.1" />
      <path d="M86 118 L86 137 M94 118 L94 137 M102 118 L102 137 M172 118 L172 137 M180 118 L180 137 M188 118 L188 137 M196 118 L196 137" stroke={WARM} strokeWidth=".9" />
      <rect x="128" y="100" width="24" height="37.5" rx="1" />
      <circle cx="147.5" cy="119" r="1.3" fill={NAVY} stroke="none" />
      <rect x="84" y="99" width="24" height="15" rx="1" />
      <rect x="172" y="99" width="24" height="15" rx="1" />
      <path d="M96 99 L96 114 M184 99 L184 114" stroke={WARM} strokeWidth="1" />
      <path d="M131 64.5 L140.2 56 L149.5 64.8 Z" stroke={WARM} strokeWidth="1.1" />
      <path d="M122 137.6 L122.2 131.2 L158 131 L158.2 137.6" stroke={WARM} strokeWidth="1.1" />
    </>
  ),
  bridge: (
    <>
      <path d="M16 84 L61.4 50 L106.5 84.4" />
      <path d="M24 78.5 L24.3 137.6 M99 78 L98.8 137.6" />
      <rect x="52" y="108" width="19" height="29.5" rx="1" />
      <rect x="33" y="94" width="14" height="13" rx="1" />
      <rect x="77" y="94" width="14" height="13" rx="1" />
      <path d="M24 98 L30 98 M92 98 L99 98" stroke={WARM} strokeWidth=".9" />
      <path d="M170 70 L219.3 33 L268.4 70.2" />
      <path d="M178 64 L178.2 137.6 M261 63.6 L260.8 137.6" />
      <path d="M178 100.5 L261 100.2" stroke={WARM} strokeWidth="1.1" />
      <rect x="190" y="76" width="16" height="16" rx="1" />
      <rect x="232" y="76" width="16" height="16" rx="1" />
      <rect x="190" y="110" width="16" height="16" rx="1" />
      <rect x="230" y="108" width="20" height="29.5" rx="1" />
      <path d="M198 76 L198 92 M240 76 L240 92 M198 110 L198 126" stroke={WARM} strokeWidth="1" />
      <path d="M106 98 C124 70.5 154 67 172 84.6" stroke={RED} strokeWidth="1.3" strokeDasharray="3 4" />
      <path d="M163.5 82.2 L172.4 85 L170.6 76" stroke={RED} strokeWidth="1.3" />
    </>
  ),
  "fix-and-flip": (
    <>
      <path d="M24 70 L140.5 17.5 L257 70.4" />
      <path d="M34 66 L34.4 137.5 M137 21 L137.4 137.5" />
      <path d="M52 58 L52 137 M70 50 L70.3 137 M88 42 L88 137 M106 34 L106.2 137 M122 27 L122 137" stroke={WARM} strokeWidth="1.2" />
      <path d="M34 98 L137 97.4 M34 66.5 L137 66" strokeWidth="1.3" />
      <path d="M40 66 L56 58 M58 66 L74 50 M76 66 L92 42 M94 66 L110 34 M112 66 L126 27" stroke={WARM} strokeWidth="1" />
      <path d="M144 22.5 L247 66 L247.3 137.5 L144 137.6 Z" />
      <path d="M150 78 L241 78 M150 88 L241 88 M150 98 L241 98 M150 108 L196 108 M150 118 L196 118 M150 128 L196 128" stroke={WARM} strokeWidth=".9" />
      <rect x="203" y="102" width="26" height="35.5" rx="1" />
      <circle cx="223.5" cy="120" r="1.4" fill={NAVY} stroke="none" />
      <rect x="160" y="42" width="34" height="26" rx="1" />
      <path d="M177 42 L177 68 M160 55 L194 55" strokeWidth="1.1" />
      <path d="M140.5 12 L140.5 144" stroke={RED} strokeWidth="1.2" strokeDasharray="3 4" />
    </>
  ),
  "ground-up": (
    <>
      <path d="M40 125.8 L240.3 125.4 L240.6 137.6 M39.7 125.8 L39.5 137.8" />
      <path d="M52 131.5 L60 131.4 M84 131.6 L95 131.5 M128 131.4 L136 131.5 M170 131.6 L181 131.4 M212 131.5 L222 131.6" stroke={WARM} strokeWidth=".9" />
      <path d="M30 94 L30.4 140 M250 93.6 L249.7 140 M140 106 L140.2 125.6" />
      <path d="M27.5 97 L30 92 L32.6 97 M247.4 96.6 L249.9 91.6 L252.5 96.7" strokeWidth="1.2" />
      <path d="M20 104.4 L41 104 M239 104.2 L260 104.5" stroke={WARM} strokeWidth="1.2" />
      <path d="M92 125.6 L92.2 114 M98 125.6 L97.8 118.4 M176 125.4 L176.2 112.6 L183 112.4" stroke={WARM} strokeWidth="1.1" />
      <path d="M30 100 C90 101.4 190 100.8 250 99.6" stroke={RED} strokeWidth="1.2" strokeDasharray="3 4" />
    </>
  ),
  "mid-construction": (
    <>
      <path d="M36 74.4 L136.4 30 L236.6 74" />
      <path d="M40 74.2 L232.4 73.8 M40 128.2 L232 127.8" />
      <path d="M40 74 L40.3 137.6 M232 74 L231.8 137.6" />
      <path d="M64 74 L64 128 M88 74 L88.2 128 M160 74 L160 128 M184 74 L184.2 128 M208 74 L208 128" stroke={WARM} strokeWidth="1.2" />
      <path d="M100 74 L100 88 M124 74 L124 88 M148 74 L148 88 M100 110 L100 128 M124 110 L124 128 M148 110 L148.2 128" stroke={WARM} strokeWidth="1.2" />
      <path d="M96 88.2 L152 88 M96 110.2 L152.2 110" strokeWidth="1.3" />
      <path d="M66 74 L86 61 M106 74 L116 52 M136.2 74 L136.4 30 M166 74 L156 52 M206 74 L186 61" stroke={WARM} strokeWidth="1" />
      <path d="M244 138 L226.4 64 M256.4 138 L238.6 64" strokeWidth="1.3" />
      <path d="M242.4 128 L254 128 M240 118 L251.6 118 M237.6 108 L249.2 108 M235.2 98 L246.8 98 M232.8 88 L244.4 88 M230.4 78 L242 78" stroke={WARM} strokeWidth="1.1" />
    </>
  ),
  "commercial-dscr": (
    <>
      <path d="M44 23.8 L236.2 23.4 L236.4 30.2 L43.8 30.4 Z" />
      <path d="M50 30.2 L49.8 137.6 M230 30 L230.3 137.6" />
      <path d="M50 78 L230 77.6" stroke={WARM} strokeWidth="1.1" />
      <rect x="66" y="40" width="34" height="28" rx="1" />
      <rect x="123" y="40" width="34" height="28" rx="1" />
      <rect x="180" y="40" width="34" height="28" rx="1" />
      <path d="M83 40 L83 68 M140 40 L140 68 M197 40 L197 68" stroke={WARM} strokeWidth="1" />
      <path d="M56 84.2 L224.2 83.8 L232.6 100.2 L47.6 100.4 Z" />
      <path d="M72 84 L66 100 M92 84 L88 100 M112 84 L109 100 M132 84 L130.5 100 M152 84 L152 100 M172 84 L173.5 100 M192 84 L195 100 M212 84 L216.5 100" stroke={WARM} strokeWidth=".9" />
      <rect x="60" y="106" width="68" height="31.5" rx="1" />
      <rect x="140" y="104" width="26" height="33.5" rx="1" />
      <rect x="176" y="106" width="44" height="31.5" rx="1" />
      <path d="M94 106 L94 137.5 M198 106 L198 137.5" stroke={WARM} strokeWidth="1" />
      <circle cx="160.5" cy="121" r="1.3" fill={NAVY} stroke="none" />
    </>
  ),
};

function Svg({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke={NAVY}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`block h-auto w-full ${className ?? ""}`}
    >
      {children}
    </svg>
  );
}

export function PropertySketch({ slug, className }: { slug: SketchSlug; className?: string }) {
  return (
    <Svg viewBox="0 0 280 150" className={className}>
      {ground}
      {drawings[slug]}
    </Svg>
  );
}
