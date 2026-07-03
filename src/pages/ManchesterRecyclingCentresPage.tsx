import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, FileCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const centres = [
  {
    name: "Longley Lane Household Waste Recycling Centre",
    area: "Sharston, Manchester",
    hours: "Mon–Sun: 8am–6pm (Apr–Sep) · 8am–4:30pm (Oct–Mar)",
    notes: "Manchester residents only. Permit required for vans and trailers.",
  },
  {
    name: "Reliance Street Household Waste Recycling Centre",
    area: "Newton Heath, Manchester",
    hours: "Mon–Sun: 8am–6pm (Apr–Sep) · 8am–4:30pm (Oct–Mar)",
    notes: "Manchester residents only. Booking may be required at peak times.",
  },
  {
    name: "Salford Community Recycling Centre",
    area: "Liverpool Street, Salford",
    hours: "Mon–Sun: 8am–8pm (summer) · 8am–6pm (winter)",
    notes: "Free for Salford residents. Photo ID and proof of address required.",
  },
  {
    name: "Bredbury Household Waste Recycling Centre",
    area: "Stockport",
    hours: "Mon–Sun: 8am–6pm (summer) · 8am–4pm (winter)",
    notes: "Stockport residents. Van/trailer permit needed.",
  },
  {
    name: "Trafford Park Recycling Centre",
    area: "Barton Dock Road, Trafford",
    hours: "Mon–Sun: 8am–6pm (summer) · 8am–4:15pm (winter)",
    notes: "Trafford residents. Booking system in place.",
  },
];

export default function ManchesterRecyclingCentresPage() {
  return (
    <>
      <SEO
        title="Manchester Recycling Centres & Dumps: Complete Guide"
        description="Guide to Manchester recycling centres and dumps: locations, opening hours and permit rules. Or skip the queue with same-day WasteWiz collection."
        canonical="/manchester-recycling-centres"
        keywords="manchester dump, manchester recycling centre, greater manchester tip, household waste recycling centre Manchester"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Manchester Recycling Centres & Dumps: A Complete Guide",
          "author": { "@type": "Organization", "name": "WasteWiz" },
          "publisher": { "@type": "Organization", "name": "WasteWiz" },
          "mainEntityOfPage": "https://waste-wiz-green-growth.lovable.app/manchester-recycling-centres",
        }}
      />

      <section className="py-20 bg-muted relative">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Local Guide</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3">
              Manchester Recycling Centres & Dumps: A Complete Guide
            </h1>
            <p className="text-xl text-muted-foreground mt-6">
              Everything you need to know about the main tips and household waste recycling centres
              across Manchester and Greater Manchester — locations, opening hours and permit rules.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
      </section>

      <section className="py-16 bg-background" aria-labelledby="centres-heading">
        <div className="container">
          <h2 id="centres-heading" className="text-3xl font-heading font-bold mb-8">
            Main recycling centres in Greater Manchester
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {centres.map((c) => (
              <article key={c.name} className="p-6 border border-border rounded-xl bg-background">
                <h3 className="font-heading font-bold text-xl">{c.name}</h3>
                <p className="flex items-center gap-2 text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4 text-primary" /> {c.area}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Clock className="h-4 w-4 text-primary" /> {c.hours}
                </p>
                <p className="flex items-start gap-2 text-muted-foreground mt-1">
                  <FileCheck className="h-4 w-4 text-primary mt-1" /> {c.notes}
                </p>
              </article>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Opening hours and permit rules can change — always check the council website before you travel.
          </p>
        </div>
      </section>

      <section className="py-16 bg-muted" aria-labelledby="permits-heading">
        <div className="container max-w-3xl">
          <h2 id="permits-heading" className="text-3xl font-heading font-bold mb-6">
            Permits, vans and what you can bring
          </h2>
          <p className="text-muted-foreground mb-4">
            Most Greater Manchester tips are free for household waste from residents in the borough, but
            vans, pickups and trailers usually need a free permit booked in advance. Some sites also
            require online booking at weekends. Trade waste, tyres and hazardous items are typically not
            accepted.
          </p>
          <p className="text-muted-foreground">
            You'll normally need photo ID and a recent utility bill or council tax letter to prove you
            live in the borough.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background" aria-labelledby="alt-heading">
        <div className="container max-w-3xl">
          <h2 id="alt-heading" className="text-3xl font-heading font-bold mb-6">
            Prefer not to load the car? Let WasteWiz collect it
          </h2>
          <p className="text-muted-foreground mb-6">
            Trips to the tip mean loading, queueing, permits and mess. WasteWiz collects rubbish
            directly from your home, garden or office anywhere in Greater Manchester — often
            same-day. Licensed waste carriers, 90% recycled, transparent quotes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/quote">
                Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="tel:+447340123486" className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Call 07340 123486
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
