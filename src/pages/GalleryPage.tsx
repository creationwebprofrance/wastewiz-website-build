import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import beforeImage1 from "@/assets/before-1.jpg";
import afterImage1 from "@/assets/after-1.jpg";
import beforeImage2 from "@/assets/before-2.jpg";
import afterImage2 from "@/assets/after-2.jpg";

const galleryItems = [
  {
    id: 1,
    title: "House Clearance - Didsbury",
    category: "House Clearance",
    before: beforeImage1,
    after: afterImage1,
    beforeAlt: "Property before house clearance waste removal Manchester",
    afterAlt: "Property after house clearance waste removal Manchester",
  },
  {
    id: 2,
    title: "Garden Waste - Sale",
    category: "Garden Clearance",
    before: beforeImage2,
    after: afterImage2,
    beforeAlt: "Garden before waste removal service Manchester",
    afterAlt: "Garden after waste removal service Manchester",
  },
];

const categories = ["All", "House Clearance", "Garden Clearance", "Office Clearance"];

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}

function BeforeAfterSlider({ before, after, beforeAlt, afterAlt }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  return (
    <div 
      className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl cursor-ew-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* After Image (Background) */}
      <img 
        src={after}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={before}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      
      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-background shadow-lg"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background shadow-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-foreground/70 text-background text-sm font-semibold rounded">
        BEFORE
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-secondary text-secondary-foreground text-sm font-semibold rounded">
        AFTER
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted relative">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Gallery</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3">
              Before & After Transformations
            </h1>
            <p className="text-xl text-muted-foreground mt-6">
              See the dramatic results we achieve for our customers. Drag the slider 
              to compare before and after shots.
            </p>
          </div>
        </div>
        {/* Smooth fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Filter */}
      <section className="py-8 border-b border-border bg-background">
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="space-y-4">
                <BeforeAfterSlider 
                  before={item.before}
                  after={item.after}
                  beforeAlt={item.beforeAlt}
                  afterAlt={item.afterAlt}
                />
                <div>
                  <h3 className="font-heading font-bold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredItems.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No items found in this category.
            </p>
          )}
        </div>
      </section>

      {/* Transition to green CTA */}
      <div className="h-32 md:h-40 section-fade-white-to-green" />

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Want Results Like These?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Get your free quote today and let us transform your space.
          </p>
          <Button variant="white" size="lg" asChild>
            <Link to="/contact">Get Free Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
