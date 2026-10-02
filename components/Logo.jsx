export default function Logo({ className = "", warna = "currentColor" }) {
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label="Logo BEM UI 2026">
      <circle cx="100" cy="100" r="96" fill="none" stroke={warna} strokeWidth="3" />
      <path d="M100 4 V60 M100 140 V196" stroke={warna} strokeWidth="3" />
      <text x="100" y="98" textAnchor="middle" fill={warna} fontFamily="Archivo, sans-serif" fontWeight="900" fontSize="44" style={{ fontStretch: "75%" }}>
        BEM UI
      </text>
      <text x="100" y="126" textAnchor="middle" fill={warna} fontFamily="Archivo, sans-serif" fontWeight="500" fontSize="16" letterSpacing="2">
        2026
      </text>
    </svg>
  );
}
