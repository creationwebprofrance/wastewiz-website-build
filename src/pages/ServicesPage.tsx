import { Link } from "react-router-dom";
import { ArrowRight, Trash2, Home, TreePine, Building, Calendar, Sofa, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";


const services = [
  {
    icon: Trash2,
    name: "Rubbish Removal",
    description: "General household and commercial waste removal. We handle everything from small loads to full clearances.",
    href: "/services/rubbish-removal",
  },
  {
    icon: Home,
    name: "House Clearance",
    description: "Complete property clearance for homeowners, landlords, and estate agents. Sensitive and respectful service.",
    href: "/services/house-clearance",
  },
  {
    icon: TreePine,
    name: "Garden Clearance",
    description: "Garden waste, green debris, soil, and outdoor furniture removal. Transform your outdoor space.",
    href: "/services/garden-clearance",
  },
  {
    icon: Building,
    name: "Office Clearance",
    description: "Commercial clearances including furniture, equipment, and general office waste disposal.",
    href: "/services/office-clearance",
  },
  {
    icon: Calendar,
    name: "Regular Collection",
    description: "Scheduled waste collection services for businesses and properties with ongoing disposal needs.",
    href: "/services/regular-collection",
  },
  {
    icon: Sofa,
    name: "Bulky Items Removal",
    description: "Removal of large furniture, appliances, mattresses, and other oversized items.",
    href: "/services/bulky-items",
  },
  {
    icon: Sparkles,
    name: "Deep Cleaning",
    description: "Professional before and after deep cleaning services following clearances.",
    href: "/services/deep-cleaning",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted relative">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3">
              Complete Waste Removal Solutions
            </h1>
            <p className="text-xl text-muted-foreground mt-6">
              From single items to full property clearances, we provide professional, 
              eco-friendly waste removal services across Greater Manchester.
            </p>
          </div>
        </div>
        {/* Smooth fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div 
                key={service.name}
                className="group p-8 bg-background border border-border rounded-xl hover:border-primary hover:shadow-medium transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-3">{service.name}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Link 
                  to={service.href}
                  className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-dark-reverse text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Every job is different. Contact us to discuss your specific requirements 
            and get a tailored quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="white" size="lg" asChild>
              <Link to="/contact">Get Free Quote</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-foreground" asChild>
              <a href="tel:+447123456789">Call: 07123 456 789</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
