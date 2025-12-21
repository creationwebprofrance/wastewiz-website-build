interface SectionDividerProps {
  from?: "white" | "green" | "muted" | "dark";
  to?: "white" | "green" | "muted" | "dark";
  height?: "sm" | "md" | "lg";
  className?: string;
}

const colorMap = {
  white: "#ffffff",
  green: "#2E6932",
  muted: "#f5f7f5",
  dark: "#00532B",
};

const heightMap = {
  sm: "h-16 md:h-24",
  md: "h-24 md:h-32",
  lg: "h-32 md:h-48",
};

export default function SectionDivider({ 
  from = "white", 
  to = "green",
  height = "md",
  className = "" 
}: SectionDividerProps) {
  return (
    <div 
      className={`${heightMap[height]} w-full ${className}`}
      style={{
        background: `linear-gradient(to bottom, ${colorMap[from]}, ${colorMap[to]})`,
      }}
    />
  );
}
