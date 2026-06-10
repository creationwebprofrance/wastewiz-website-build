import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const serviceDetails: Record<string, {
  title: string;
  description: string;
  features: string[];
  process: string[];
}> = {
  "rubbish-removal": {
    title: "Rubbish Removal",
    description: "Professional rubbish removal services for homes and businesses across Greater Manchester. We handle all types of general waste, from household items to commercial refuse.",
    features: [
      "Same-day collection available",
      "All types of general waste accepted",
      "Responsible disposal and recycling",
      "Competitive volume-based pricing",
      "Fully licensed waste carriers",
    ],
    process: [
      "Contact us for a free quote",
      "We'll arrange a convenient collection time",
      "Our team arrives and loads everything",
      "Waste is sorted, recycled, and disposed responsibly",
    ],
  },
  "house-clearance": {
    title: "House Clearance",
    description: "Complete house clearance services for homeowners, landlords, and estate agents. We handle full property clearances with sensitivity and efficiency.",
    features: [
      "Full property clearances",
      "Bereavement clearance specialists",
      "Furniture, appliances & personal items",
      "End of tenancy clearances",
      "Sensitive and respectful approach",
    ],
    process: [
      "Free on-site assessment",
      "Receive your no-obligation quote",
      "Schedule your clearance date",
      "We clear, clean, and leave your property spotless",
    ],
  },
  "garden-clearance": {
    title: "Garden Clearance",
    description: "Transform your outdoor space with our professional garden clearance service. We remove all types of garden waste, from hedge trimmings to large tree branches.",
    features: [
      "Green waste and vegetation removal",
      "Soil, turf, and rubble clearance",
      "Garden furniture disposal",
      "Shed and outbuilding dismantling",
      "All waste recycled where possible",
    ],
    process: [
      "Tell us about your garden waste",
      "Receive your competitive quote",
      "We arrive with all necessary equipment",
      "Garden cleared and waste responsibly disposed",
    ],
  },
  "office-clearance": {
    title: "Office Clearance",
    description: "Commercial clearance services for offices, warehouses, and business premises. We work around your schedule to minimise disruption.",
    features: [
      "Office furniture removal",
      "IT equipment disposal",
      "Confidential document destruction",
      "Flexible scheduling options",
      "Minimal business disruption",
    ],
    process: [
      "On-site assessment at your convenience",
      "Detailed quote with no hidden costs",
      "Clearance scheduled around your business",
      "Certificate of disposal provided",
    ],
  },
  "regular-collection": {
    title: "Regular Waste Collection",
    description: "Scheduled waste collection services for businesses and properties with ongoing disposal needs. Reliable, regular service you can count on.",
    features: [
      "Weekly or fortnightly collections",
      "Flexible scheduling",
      "Consistent, reliable service",
      "Cost-effective waste management",
      "Dedicated account manager",
    ],
    process: [
      "Discuss your regular collection needs",
      "We create a tailored schedule",
      "Regular collections begin on agreed dates",
      "Ongoing support and flexibility",
    ],
  },
  "bulky-items": {
    title: "Bulky Items Removal",
    description: "Removal of large furniture, appliances, and other oversized items. We do the heavy lifting so you don't have to.",
    features: [
      "Sofas, beds, and mattresses",
      "White goods and appliances",
      "Large furniture items",
      "No item too heavy",
      "Careful handling guaranteed",
    ],
    process: [
      "Tell us what needs removing",
      "Get your instant quote",
      "We arrive and do all the heavy lifting",
      "Items disposed of or recycled",
    ],
  },
  "deep-cleaning": {
    title: "Deep Cleaning",
    description: "Professional deep cleaning services to complement your clearance. Leave your property spotless and ready for its next chapter.",
    features: [
      "Post-clearance cleaning",
      "End of tenancy deep cleans",
      "Kitchen and bathroom specialists",
      "Carpet and upholstery cleaning",
      "Commercial cleaning available",
    ],
    process: [
      "Book alongside your clearance or separately",
      "Receive your cleaning quote",
      "Our cleaning team transforms your space",
      "Final inspection and handover",
    ],
  },
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceDetails[slug] : null;

  if (!service) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Service not found</h1>
        <Button asChild className="mt-4">
          <Link to="/services">View All Services</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted">
        <div className="container">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-bold">
            {service.title}
          </h1>
          <p className="text-xl text-muted-foreground mt-6 max-w-3xl">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">What's Included</h2>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">How It Works</h2>
              <div className="space-y-6">
                {service.process.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="pt-2">
                      <p className="text-lg">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            Get your free, no-obligation quote today. We're ready to help with your {service.title.toLowerCase()}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="white" size="lg" asChild>
               <Link to="/quote">
                 Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
               <a href="tel:+447340123486">Call: 07340 123486</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
