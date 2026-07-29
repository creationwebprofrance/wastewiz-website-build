import { useState } from "react";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
  priority?: boolean;
}

export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  className = "h-80 md:h-96",
  priority = false,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl cursor-ew-resize select-none ${className}`}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <img
        src={after}
        alt={afterAlt}
        {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={before}
          alt={beforeAlt}
          {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-background shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background shadow-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
      <div className="absolute top-4 left-4 px-3 py-1 bg-foreground/70 text-background text-sm font-semibold rounded">
        BEFORE
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded">
        AFTER
      </div>
    </div>
  );
}
