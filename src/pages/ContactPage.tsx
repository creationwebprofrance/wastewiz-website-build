import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "07123 456 789", href: "tel:+447123456789" },
  { icon: MessageCircle, label: "WhatsApp", value: "07123 456 789", href: "https://wa.me/447123456789" },
  { icon: Mail, label: "Email", value: "info@wastewiz.co.uk", href: "mailto:info@wastewiz.co.uk" },
  { icon: MapPin, label: "Location", value: "Manchester, Greater Manchester, UK", href: null },
  { icon: Clock, label: "Hours", value: "Mon - Sat: 7am - 7pm", href: null },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Quote Request Received!",
      description: "We'll get back to you within 2 hours during business hours.",
    });
    
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3">
              Get Your Free Quote
            </h1>
            <p className="text-xl text-muted-foreground mt-6">
              Ready to clear your space? Contact us for a free, no-obligation quote. 
              We typically respond within 2 hours during business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Request a Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name *</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="07XXX XXX XXX"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="service">Service Required</Label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a service</option>
                    <option value="rubbish-removal">Rubbish Removal</option>
                    <option value="house-clearance">House Clearance</option>
                    <option value="garden-clearance">Garden Clearance</option>
                    <option value="office-clearance">Office Clearance</option>
                    <option value="regular-collection">Regular Collection</option>
                    <option value="bulky-items">Bulky Items Removal</option>
                    <option value="deep-cleaning">Deep Cleaning</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your waste *</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Please describe what needs clearing, approximate quantities, and your preferred dates..."
                  />
                </div>
                
                <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Sending..." : "Request Free Quote"}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Prefer to speak to someone directly? Give us a call or send a WhatsApp message 
                for an instant response.
              </p>
              
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="font-semibold hover:text-primary transition-colors"
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
                <h3 className="font-heading font-bold text-lg mb-2">Quick Response Guarantee</h3>
                <p className="text-muted-foreground text-sm">
                  We aim to respond to all enquiries within 2 hours during business hours. 
                  For urgent jobs, call us directly for same-day service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 bg-muted flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Serving all of Greater Manchester</p>
        </div>
      </section>
    </>
  );
}
