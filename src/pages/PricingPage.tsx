import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingTiers = [
  {
    name: "Single Item",
    price: "From £30",
    description: "Perfect for individual bulky items",
    features: [
      "One large item (sofa, fridge, etc.)",
      "Same-day collection available",
      "Responsible disposal",
      "No hidden fees",
    ],
  },
  {
    name: "Partial Load",
    price: "From £80",
    description: "Ideal for small clearances",
    features: [
      "Up to 1/4 van load",
      "Multiple items accepted",
      "Great for decluttering",
      "Free loading included",
    ],
  },
  {
    name: "Half Load",
    price: "From £140",
    description: "Our most popular option",
    features: [
      "Up to 1/2 van load",
      "Perfect for room clearances",
      "Furniture & general waste",
      "All labour included",
    ],
    popular: true,
  },
  {
    name: "Full Load",
    price: "From £220",
    description: "Complete clearance solution",
    features: [
      "Full van capacity",
      "Whole property clearances",
      "Multiple trips if needed",
      "Best value for large jobs",
    ],
  },
];

const faqs = [
  {
    question: "How do you calculate the price?",
    answer: "Our prices are based on the volume of waste, not the time taken. This means you get transparent, upfront pricing with no surprises.",
  },
  {
    question: "Do you charge for loading?",
    answer: "No! All labour is included in our prices. Our team will do all the heavy lifting while you sit back and relax.",
  },
  {
    question: "What happens to my waste?",
    answer: "We take environmental responsibility seriously. Up to 90% of waste is recycled or donated to charity where possible.",
  },
  {
    question: "Can I get an exact quote?",
    answer: "Absolutely! Contact us with details of your waste and we'll provide a precise, no-obligation quote.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted relative">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Pricing</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3">
              Transparent, Volume-Based Pricing
            </h1>
            <p className="text-xl text-muted-foreground mt-6">
              We charge based on how much space your waste takes in our van - not by the hour. 
              Simple, fair, and no surprises.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Van Illustration */}
      <section className="py-12 border-b border-border bg-background">
        <div className="container">
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <Truck className="h-8 w-8 text-primary" />
            <p className="text-lg">Prices based on van space used - not time!</p>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name}
                className={`relative p-6 rounded-xl border ${
                  tier.popular 
                    ? "border-primary bg-primary/5 shadow-medium" 
                    : "border-border bg-background"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-heading font-bold text-xl">{tier.name}</h3>
                <p className="text-3xl font-heading font-bold text-primary mt-2">{tier.price}</p>
                <p className="text-muted-foreground text-sm mt-1">{tier.description}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={tier.popular ? "hero" : "outline"} 
                  className="w-full mt-6"
                  asChild
                >
                  <Link to="/contact">Get Quote</Link>
                </Button>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground mt-8">
            Prices are indicative. Contact us for an accurate quote based on your specific needs.
          </p>
        </div>
      </section>

      {/* Transition to muted FAQs */}
      <div className="h-24 bg-gradient-to-b from-background to-muted" />

      {/* FAQs */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-heading font-bold">Pricing FAQs</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.question} className="p-6 bg-background rounded-xl">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition to green CTA */}
      <div className="h-32 md:h-40 section-fade-white-to-green" />

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Get Your Exact Quote Today
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Tell us about your waste and we'll provide a precise, no-obligation quote within hours.
          </p>
          <Button variant="white" size="lg" asChild>
            <Link to="/contact">
              Request Free Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
