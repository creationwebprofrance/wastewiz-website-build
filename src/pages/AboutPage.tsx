import { Link } from "react-router-dom";
import { CheckCircle, Users, Leaf, Award, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

import truckImage from "@/assets/truck-3.jpg";
import teamWorkImage from "@/assets/team-work.png";

const values = [
  { icon: Users, title: "Customer First", description: "Your satisfaction is our top priority. We go above and beyond to deliver exceptional service." },
  { icon: Leaf, title: "Eco-Conscious", description: "We recycle up to 90% of all waste collected, minimizing environmental impact." },
  { icon: Award, title: "Professional Team", description: "Fully trained, uniformed staff who treat your property with respect." },
  { icon: Truck, title: "Reliable Service", description: "We arrive on time, every time. Count on us when you need us most." },
];

const stats = [
  { value: "500+", label: "Happy Customers" },
  { value: "90%", label: "Waste Recycled" },
  { value: "Same Day", label: "Service Available" },
  { value: "5★", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted relative">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">About Us</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3">
              Manchester's Trusted Waste Removal Experts
            </h1>
            <p className="text-xl text-muted-foreground mt-6">
              WasteWiz is a family-run waste removal company serving Greater Manchester. 
              We're committed to providing fast, reliable, and eco-friendly clearance services 
              for homes and businesses.
            </p>
          </div>
        </div>
        {/* Smooth fade to white */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={teamWorkImage}
                alt="WasteWiz team at work"
                className="rounded-2xl shadow-strong w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                Founded in Manchester, WasteWiz started with a simple mission: to provide 
                reliable, affordable waste removal services that don't harm the environment.
              </p>
              <p className="text-muted-foreground">
                We began as a small local operation and have grown into one of Manchester's most 
                trusted clearance companies. We've helped hundreds of homeowners, landlords, 
                and businesses clear their spaces efficiently and responsibly.
              </p>
              <p className="text-muted-foreground">
                Our values remain the same: great customer service, care for the environment, 
                and a strong commitment to our community. Every job gets our full attention, 
                no matter the size.
              </p>
              <ul className="space-y-3">
                {["Fully licensed waste carriers", "Environmentally responsible disposal", "Transparent, upfront pricing", "Friendly, professional team"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-dark text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-heading font-bold text-secondary">
                  {stat.value}
                </p>
                <p className="text-white/80 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Our Values</h2>
            <p className="text-muted-foreground mt-4">
              These principles guide everything we do at WasteWiz.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div 
                key={value.title}
                className="p-6 bg-background border border-border rounded-xl text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transition to muted CTA */}
      <div className="h-24 bg-gradient-to-b from-background to-muted" />

      {/* CTA */}
      <section className="py-20 bg-muted">
        <div className="container text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Experience the WasteWiz difference. Get your free quote today.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Get Free Quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
