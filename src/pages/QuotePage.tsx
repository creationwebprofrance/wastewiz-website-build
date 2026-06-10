import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEO from "@/components/SEO";
 
export default function QuotePage() {
    const [formData, setFormData] = useState({
     firstName: "",
     lastName: "",
     phone: "",
     email: "",
     postcode: "",
     message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const subject = `Quote Request from ${formData.firstName} ${formData.lastName}`;
      const body = `Name: ${formData.firstName} ${formData.lastName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nPostcode: ${formData.postcode}\n\nRequirements:\n${formData.message || "No additional details provided."}`;
      
      const mailtoLink = `mailto:wastewhiz@rubbishclearanceltd.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

   return (
     <>
       <SEO
         title="Free Quote | Waste Removal Manchester & Greater Manchester | WasteWiz"
         description="Get a free, no-obligation quote for waste removal anywhere in Manchester & Greater Manchester. Fast response, transparent pricing, same-day service available."
         canonical="/quote"
         keywords="waste removal quote Manchester, rubbish clearance quote Greater Manchester, free waste removal quote"
       />
       {/* Hero */}
       <section className="py-20 bg-muted relative">
         <div className="container">
           <Link 
             to="/" 
             className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
           >
             <ArrowLeft className="h-4 w-4" />
             Back to Home
           </Link>
           <div className="max-w-3xl">
             <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Get a Quote</span>
             <h1 className="text-4xl md:text-5xl font-heading font-bold mt-3">
               Request Your Free Quote
             </h1>
             <p className="text-xl text-muted-foreground mt-6">
               Tell us about your waste removal needs and we'll get back to you with a personalised quote. 
               Every job is different, so we provide tailored pricing for each customer.
             </p>
           </div>
         </div>
         <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background" />
       </section>
 
       {/* Quote Form Section */}
       <section className="py-20 bg-background">
         <div className="container">
           <div className="grid lg:grid-cols-2 gap-12">
             {/* Form */}
             <div>
               <h2 className="text-2xl font-heading font-bold mb-6">Fill in Your Details</h2>
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid sm:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="firstName">First Name *</Label>
                     <Input 
                       id="firstName"
                       name="firstName"
                       value={formData.firstName}
                       onChange={handleChange}
                       required
                       placeholder="John"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="lastName">Last Name *</Label>
                     <Input 
                       id="lastName"
                       name="lastName"
                       value={formData.lastName}
                       onChange={handleChange}
                       required
                       placeholder="Smith"
                     />
                   </div>
                 </div>
                 
                 <div className="grid sm:grid-cols-2 gap-4">
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
                   <div className="space-y-2">
                     <Label htmlFor="postcode">Postcode *</Label>
                     <Input 
                       id="postcode"
                       name="postcode"
                       value={formData.postcode}
                       onChange={handleChange}
                       required
                       placeholder="M1 1AA"
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
                   <Label htmlFor="message">Describe Your Requirements</Label>
                   <Textarea 
                     id="message"
                     name="message"
                     value={formData.message}
                     onChange={handleChange}
                     rows={4}
                     placeholder="Tell us about the waste you need removing..."
                   />
                 </div>
 
  {/* Photo Notice */}
                  <div className="p-4 bg-muted rounded-xl border border-border">
                    <p className="text-sm text-muted-foreground">
                      📷 <span className="font-semibold text-foreground">Photos:</span> Please attach 1 to 2 photos of the area to be cleared directly in the email that will open after submitting the form.
                    </p>
                  </div>
                 
                <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                    Request Quote
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
               </form>
             </div>
 
             {/* Contact Info */}
             <div>
               <h2 className="text-2xl font-heading font-bold mb-6">Prefer to Call?</h2>
               <p className="text-muted-foreground mb-8">
                 If you'd rather speak to someone directly, give us a call and we'll be happy to discuss your requirements.
               </p>
               
               <div className="space-y-4">
                 <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                     <Phone className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <p className="text-sm text-muted-foreground">Phone Numbers</p>
                     <a href="tel:+447340123486" className="block font-semibold hover:text-primary transition-colors">
                       07340 123486
                     </a>
                     <a href="tel:+447585071979" className="block font-semibold hover:text-primary transition-colors">
                       07585 071979
                     </a>
                     <a href="tel:+4401618204999" className="block font-semibold hover:text-primary transition-colors">
                       01618 204999
                     </a>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-4 p-4 bg-muted rounded-xl">
                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                     <Mail className="h-6 w-6 text-primary" />
                   </div>
                   <div>
                     <p className="text-sm text-muted-foreground">Email</p>
                     <a href="mailto:wastewhiz@rubbishclearanceltd.com" className="font-semibold hover:text-primary transition-colors">
                       wastewhiz@rubbishclearanceltd.com
                     </a>
                   </div>
                 </div>
               </div>
 
               <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/10">
                 <h3 className="font-heading font-bold text-lg mb-2">What Happens Next?</h3>
                 <ol className="space-y-2 text-muted-foreground">
                   <li className="flex items-start gap-2">
                     <span className="font-bold text-primary">1.</span>
                     We review your request
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="font-bold text-primary">2.</span>
                     We contact you by phone or email
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="font-bold text-primary">3.</span>
                     We provide a tailored quote
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="font-bold text-primary">4.</span>
                     We schedule your clearance
                   </li>
                 </ol>
               </div>
             </div>
           </div>
         </div>
       </section>
     </>
   );
 }