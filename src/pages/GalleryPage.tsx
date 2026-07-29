import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gallery-admin`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

import beforeImage1 from "@/assets/before-1.jpg";
import afterImage1 from "@/assets/after-1.jpg";
import beforeImage2 from "@/assets/before-2.jpg";
import afterImage2 from "@/assets/after-2.jpg";
import beforeImage3 from "@/assets/before-3.jpg";
import afterImage3 from "@/assets/after-3.jpg";
import beforeImage4 from "@/assets/before-4.jpg";
import afterImage4 from "@/assets/after-4.jpg";
import beforeImage5 from "@/assets/before-5.jpg";
import afterImage5 from "@/assets/after-5.jpg";
import beforeImage6 from "@/assets/before-6.jpg";
import afterImage6 from "@/assets/after-6.jpg";
import beforeImage7 from "@/assets/before-7.jpg";
import afterImage7 from "@/assets/after-7.jpg";

const galleryItems = [
  {
    id: 1,
    title: "House Clearance - Didsbury",
    category: "House Clearance",
    before: beforeImage1,
    after: afterImage1,
    beforeAlt: "Property before house clearance waste removal Greater Manchester",
    afterAlt: "Property after house clearance waste removal Greater Manchester",
  },
  {
    id: 2,
    title: "Garden Waste - Sale",
    category: "Garden Clearance",
    before: beforeImage2,
    after: afterImage2,
    beforeAlt: "Garden before waste removal service Greater Manchester",
    afterAlt: "Garden after waste removal service Greater Manchester",
  },
  {
    id: 3,
    title: "Front Garden Clearance - Greater Manchester",
    category: "House Clearance",
    before: beforeImage3,
    after: afterImage3,
    beforeAlt: "Front garden full of rubbish before clearance Greater Manchester",
    afterAlt: "Clean front garden after waste clearance Greater Manchester",
  },
  {
    id: 4,
    title: "Back Garden Clearance - Stockport",
    category: "Garden Clearance",
    before: beforeImage4,
    after: afterImage4,
    beforeAlt: "Back garden with wood and debris before clearance Greater Manchester",
    afterAlt: "Tidy back garden after waste removal Greater Manchester",
  },
  {
    id: 5,
    title: "Appliance & Junk Removal - Salford",
    category: "House Clearance",
    before: beforeImage5,
    after: afterImage5,
    beforeAlt: "Old appliances and junk before removal Greater Manchester",
    afterAlt: "Clean yard after appliance and junk removal Greater Manchester",
  },
  {
    id: 6,
    title: "Garage Clearance - Greater Manchester",
    category: "House Clearance",
    before: beforeImage6,
    after: afterImage6,
    beforeAlt: "Garage full of mattresses tyres and furniture before clearance Greater Manchester",
    afterAlt: "Empty clean garage after waste clearance Greater Manchester",
  },
  {
    id: 7,
    title: "Office Clearance - Manchester City Centre",
    category: "Office Clearance",
    before: beforeImage7,
    after: afterImage7,
    beforeAlt: "Cluttered office full of old furniture and equipment before clearance Greater Manchester",
    afterAlt: "Clean empty office space after professional clearance Greater Manchester",
  },
];

const categories = ["All", "House Clearance", "Garden Clearance", "Office Clearance"];


export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [remoteItems, setRemoteItems] = useState<typeof galleryItems>([]);

  useEffect(() => {
    fetch(`${FN_URL}?action=list`, {
      headers: { apikey: ANON, Authorization: `Bearer ${ANON}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const mapped = (data.items ?? []).map((i: any) => ({
          id: i.id,
          title: i.title,
          category: i.category,
          before: i.before_url,
          after: i.after_url,
          beforeAlt: i.before_alt || i.title,
          afterAlt: i.after_alt || i.title,
        }));
        setRemoteItems(mapped);
      })
      .catch(() => {});
  }, []);

  const allItems = [...remoteItems, ...galleryItems];
  const allCategories = Array.from(
    new Set(["All", ...categories.slice(1), ...allItems.map((i) => i.category)]),
  );

  const filteredItems = activeCategory === "All"
    ? allItems
    : allItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <SEO
        title="Gallery | Waste Removal Manchester – Before & After | WasteWiz"
        description="See real before & after photos of waste removal and clearance jobs across Manchester & Greater Manchester. Real results from the WasteWiz team."
        canonical="/gallery"
        keywords="waste removal Manchester gallery, before after clearance Greater Manchester, house clearance photos Manchester"
      />
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
            {allCategories.map((category) => (
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
      <section className="py-20 bg-background" aria-labelledby="projects-heading">
        <div className="container">
          <h2 id="projects-heading" className="text-3xl md:text-4xl font-heading font-bold mb-10">
            Recent Waste Clearance Projects
          </h2>
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

      {/* CTA */}
      <section className="py-20 bg-gradient-dark-reverse text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Want Results Like These?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
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
