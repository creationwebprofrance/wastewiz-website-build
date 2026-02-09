interface WaveDividerProps {
  from?: "white" | "green" | "muted";
  to?: "white" | "green" | "muted";
  flip?: boolean;
  className?: string;
}

const colorMap = {
  white: "hsl(0, 0%, 100%)",
  green: "hsl(123, 37%, 30%)",
  muted: "hsl(120, 10%, 96%)",
};

export default function WaveDivider({
  from = "white",
  to = "green",
  flip = false,
  className = "",
}: WaveDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${className}`}
      style={{ backgroundColor: colorMap[to] }}
    >
      <svg
        className="relative block w-full h-[60px] md:h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ transform: flip ? "rotate(180deg)" : undefined }}
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill={colorMap[from]}
          opacity="1"
        />
      </svg>
    </div>
  );
}
