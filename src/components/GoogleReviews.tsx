import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import GoogleLogo from "@/components/icons/GoogleLogo";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/place/Waste+Whiz/@53.4723193,-2.3058626,21473m/data=!3m1!1e3!4m8!3m7!1s0xdac0c70e888dc1d:0x4dc7dbd4bc1f86f6!8m2!3d53.4722454!4d-2.2234628!9m1!1b1!16s%2Fg%2F11njdy_1t0?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D";

// Replace this ID with the one Elfsight gives you after creating the free
// Google Reviews widget on https://elfsight.com/google-reviews-widget/
// (Widget code looks like: <div class="elfsight-app-XXXXXXXX-XXXX-...">)
const ELFSIGHT_WIDGET_ID = "elfsight-app-949ccced-b2fe-420b-b846-ec84655fca88";

interface GoogleReviewsProps {
  variant?: "light" | "dark";
}

export default function GoogleReviews({ variant = "light" }: GoogleReviewsProps) {
  useEffect(() => {
    const SRC = "https://elfsightcdn.com/platform.js";
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SRC;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const isDark = variant === "dark";

  return (
    <section
      className={`py-20 ${isDark ? "bg-gradient-dark text-white" : "bg-background"}`}
      aria-labelledby="google-reviews-heading"
    >
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
            Google Reviews
          </span>
          <h2
            id="google-reviews-heading"
            className="text-3xl md:text-4xl font-heading font-bold mt-3"
          >
            What Our Customers Say
          </h2>
        </div>

        {/* Elfsight Google Reviews widget (free tier) */}
        <div className={ELFSIGHT_WIDGET_ID} data-elfsight-app-lazy />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button variant="hero" size="lg" asChild>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Leave a Google review for WasteWiz (opens in a new tab)"
            >
              <GoogleLogo className="mr-2 h-5 w-5" />
              Leave a Google Review
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
