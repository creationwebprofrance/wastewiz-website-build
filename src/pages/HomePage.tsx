import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Star, Truck, Leaf, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import truckImage from "@/assets/truck-1.jpg";
import beforeImage from "@/assets/before-1.jpg";
import afterImage from "@/assets/after-1.jpg";

const features = [
  { icon: Clock, title: "Same-Day Service", description: "Quick response when you need it most" },
  { icon: Truck, title: "Fully Licensed", description: "Licensed waste carriers you can trust" },
  { icon: Leaf, title: "Eco-Friendly", description: "90% of waste recycled responsibly" },
];

const services = [
  { name: "Rubbish Removal", description: "General household and commercial waste", href: "/services/rubbish-removal" },
  { name: "House Clearance", description: "Complete property clearance solutions", href: "/services/house-clearance" },
  { name: "Garden Clearance", description: "Garden waste and green debris removal", href: "/services/garden-clearance" },
  { name: "Office Clearance", description: "Commercial and office furniture disposal", href: "/services/office-clearance" },
  { name: "Regular Collection", description: "Scheduled waste collection services", href: "/services/regular-collection" },
  { name: "Bulky Items", description: "Large furniture and appliance removal", href: "/services/bulky-items" },
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Didsbury",
    rating: 5,
    text: "Absolutely fantastic service! They cleared our entire house in just one day. Professional, friendly, and reasonably priced.",
  },
  {
    name: "James T.",
    location: "Sale",
    rating: 5,
    text: "Used WasteWiz for a garden clearance. The team was punctual and worked incredibly hard. Highly recommend!",
  },
  {
    name: "Emma K.",
    location: "Stockport",
    rating: 5,
    text: "Quick response, fair pricing, and excellent communication throughout. Will definitely use again.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container relative z-10 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground space-y-8 animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm border border-background/20">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm font-medium">Manchester's Trusted Waste Removal</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
                Fast & Reliable Waste Removal Services
              </h1>
              
              <p className="text-xl text-primary-foreground/80 max-w-lg">
                Professional clearance solutions for homes and businesses across Greater Manchester. 
                Same-day service available.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="white" size="lg" asChild>
                   <Link to="/quote">
                     Get a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                   <a href="tel:+447340123486">
                     Call: 07340 123486
                  </a>
                </Button>
              </div>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Licensed Carrier</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Same-Day Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <span className="text-sm">Free Quotes</span>
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-strong">
                <img 
                  src={truckImage}
                  alt="WasteWiz waste removal truck in Manchester"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-6 shadow-strong animate-float">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Star className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-2xl text-primary">500+</p>
                    <p className="text-sm text-muted-foreground">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Smooth fade to muted section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-primary/20 to-muted" />
      </section>

      {/* Features */}
      <section className="py-16 bg-muted relative">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="flex items-center gap-4 p-6 bg-background rounded-xl shadow-soft"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Smooth fade to white section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Services */}
      <section className="py-20 bg-background relative">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3">
              Complete Waste Removal Solutions
            </h2>
            <p className="text-muted-foreground mt-4">
              From single items to full property clearances, we handle all types of waste 
              removal with professionalism and care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.name}
                to={service.href}
                className="group p-6 bg-background border border-border rounded-xl hover:border-primary hover:shadow-medium transition-all duration-300"
              >
                <h3 className="font-heading font-bold text-xl group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground mt-2">{service.description}</p>
                <div className="flex items-center gap-2 mt-4 text-primary font-semibold">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button variant="hero" size="lg" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Transition to green section */}
      <div className="h-32 md:h-40 section-fade-white-to-green" />

      {/* Before/After Preview */}
      <section className="py-20 bg-primary text-primary-foreground relative">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-secondary font-semibold uppercase tracking-wider text-sm">See The Results</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Transforming Spaces Across Manchester
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Our team takes pride in delivering exceptional results. See the dramatic 
                transformations we achieve for our customers every day.
              </p>
              <ul className="space-y-3">
                {["Complete property clearances", "Garden transformations", "Office and commercial spaces", "Same-day turnaround available"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="white" size="lg" asChild>
                <Link to="/gallery">
                  View Full Gallery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src={beforeImage}
                    alt="Property before waste removal in Manchester"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <p className="text-center text-sm font-semibold text-secondary">BEFORE</p>
              </div>
              <div className="space-y-2">
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src={afterImage}
                    alt="Property after waste removal in Manchester"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <p className="text-center text-sm font-semibold text-secondary">AFTER</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transition from green to white */}
      <div className="h-32 md:h-40 section-fade-green-to-white" />

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3">
              What Our Customers Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 bg-background border border-border rounded-xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}, Manchester</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition to CTA */}
      <div className="h-32 md:h-40 section-fade-white-to-green" />

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Ready to Clear Your Space?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation quote today. Same-day service available across Greater Manchester.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="white" size="lg" asChild>
               <Link to="/quote">
                 Get a Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
               <a href="tel:+447340123486">
                 Call Now: 07340 123486
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
