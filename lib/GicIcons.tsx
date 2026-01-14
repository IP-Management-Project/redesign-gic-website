export const GicSatellite = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M20,70 A40,40 0 0,1 80,70 L50,70 Z" />
    <polygon points="40,80 60,80 50,70" />
  </svg>
);

export const GicMobile = ({ className }: { className?: string }) => (
  // <svg viewBox="0 0 100 100" className={className} fill="currentColor">
  //   <rect x="30" y="20" width="40" height="60" rx="5" />
  //   <rect x="45" y="25" width="10" height="2" rx="1" opacity="0.5" />
  // </svg>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <g fill="#627389">
    <rect x="49" y="0" width="21" height="26" rx="2"/>

    <rect x="0" y="39" width="70" height="127" rx="8"/>
  </g>
</svg>

);

export const GicDesktop = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <rect x="20" y="25" width="60" height="45" rx="3" />
    <rect x="45" y="70" width="10" height="5" />
    <rect x="35" y="75" width="30" height="3" rx="1" />
  </svg>
);

export const GicNetwork = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <circle cx="50" cy="50" r="12" />
    <circle cx="20" cy="30" r="8" />
    <circle cx="80" cy="30" r="10" />
    <circle cx="25" cy="80" r="7" />
    <circle cx="75" cy="80" r="13" />
    <line x1="50" y1="50" x2="20" y2="30" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="50" x2="80" y2="30" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="50" x2="25" y2="80" stroke="currentColor" strokeWidth="2" />
    <line x1="50" y1="50" x2="75" y2="80" stroke="currentColor" strokeWidth="2" />
  </svg>
);