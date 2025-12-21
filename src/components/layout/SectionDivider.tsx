interface SectionDividerProps {
  from?: "white" | "green" | "muted" | "dark";
  to?: "white" | "green" | "muted" | "dark";
  className?: string;
}

const colorMap = {
  white: "hsl(0 0% 100%)",
  green: "hsl(123 37% 30%)",
  muted: "hsl(120 10% 96%)",
  dark: "hsl(152 100% 16%)",
};

export default function SectionDivider({ 
  from = "white", 
  to = "green",
  className = "" 
}: SectionDividerProps) {
  return (
    <div 
      className={`h-32 md:h-48 w-full relative ${className}`}
      style={{
        background: `linear-gradient(180deg, ${colorMap[from]} 0%, ${colorMap[to]} 100%)`,
      }}
    >
      {/* Smooth wave overlay for extra polish */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={colorMap[to]}
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
}
