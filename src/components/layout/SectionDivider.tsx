interface SectionDividerProps {
  from?: "white" | "green" | "muted" | "dark";
  to?: "white" | "green" | "muted" | "dark";
  height?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const colorMap = {
  white: "#ffffff",
  green: "#2E6932",
  muted: "#f5f7f5",
  dark: "#00532B",
};

const heightMap = {
  sm: "h-32 md:h-48",
  md: "h-48 md:h-64",
  lg: "h-64 md:h-96",
  xl: "h-80 md:h-[28rem]",
};

export default function SectionDivider({ 
  from = "white", 
  to = "green",
  height = "lg",
  className = "" 
}: SectionDividerProps) {
  return (
    <div 
      className={`${heightMap[height]} w-full -my-px ${className}`}
      style={{
        background: `linear-gradient(180deg, ${colorMap[from]} 0%, ${colorMap[to]} 100%)`,
      }}
    />
  );
}
