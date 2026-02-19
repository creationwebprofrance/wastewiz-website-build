import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactMethods = [
  { icon: Phone, label: "Phone", value: "07340 123486", href: "tel:+447340123486" },
  { icon: Phone, label: "Phone", value: "07585 071979", href: "tel:+447585071979" },
  { icon: Phone, label: "Landline", value: "01618 204999", href: "tel:+4401618204999" },
  { icon: MessageCircle, label: "WhatsApp", value: "07340 123486", href: "https://wa.me/447340123486" },
  { icon: Mail, label: "Email", value: "wastewhiz@rubbishclearanceltd.com", href: "mailto:wastewhiz@rubbishclearanceltd.com" },
  { icon: Facebook, label: "Facebook", value: "WasteWiz", href: "https://www.facebook.com/people/Rubbish-and-House-Clearance/100090455190354/" },
  { icon: Instagram, label: "Instagram", value: "@waste_whiz", href: "https://www.instagram.com/waste_whiz" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    const mailtoLink = `mailto:wastewhiz@rubbishclearanceltd.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-muted relative">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Contact Us</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground mt-6">
              Have a question or need our services? We'd love to hear from you. 
              Reach out and we'll respond as soon as possible.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
      </section>

      {/* Location & Hours Banner */}
      <section className="py-12 bg-muted relative">
        <div className="container">
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            <div className="flex items-start gap-4 p-5 bg-background rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">Manchester, Greater Manchester, UK</p>
                <p className="text-sm text-muted-foreground mt-1">Serving all of Greater Manchester</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-background rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Opening Hours</p>
                <p className="font-semibold">Mon – Fri: 9am – 6pm</p>
                <p className="font-semibold">Sat: 10am – 4pm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Send Us a Message</h2>
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
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
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
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="How can we help you?"
                  />
                </div>
                
                <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                  Send Message
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Prefer to speak to someone directly? Give us a call or send a WhatsApp message.
              </p>
              
              <div className="space-y-4">
                {contactMethods.map((item) => (
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
