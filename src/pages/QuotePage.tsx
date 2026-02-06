import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Upload, X, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
 
 export default function QuotePage() {
   const { toast } = useToast();
   const [formData, setFormData] = useState({
     firstName: "",
     lastName: "",
     phone: "",
     email: "",
     postcode: "",
     message: "",
   });
   const [photos, setPhotos] = useState<File[]>([]);
   const [isSubmitting, setIsSubmitting] = useState(false);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          type: "quote",
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          postcode: formData.postcode,
          message: formData.message || "No additional details provided.",
        },
      });

      if (error) throw error;

      toast({
        title: "Quote Request Sent!",
        description: "We'll contact you shortly with your personalised quote.",
      });
      
      setFormData({ firstName: "", lastName: "", phone: "", email: "", postcode: "", message: "" });
      setPhotos([]);
    } catch (error) {
      console.error("Error sending quote request:", error);
      toast({
        title: "Error",
        description: "Failed to send your request. Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
 
   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
   };
 
   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = e.target.files;
     if (files) {
       const newPhotos = Array.from(files).slice(0, 2 - photos.length);
       setPhotos(prev => [...prev, ...newPhotos].slice(0, 2));
     }
   };
 
   const removePhoto = (index: number) => {
     setPhotos(prev => prev.filter((_, i) => i !== index));
   };
 
   return (
     <>
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
 
                 {/* Photo Upload */}
                 <div className="space-y-2">
                   <Label>Photos (optional, max 2)</Label>
                   <p className="text-sm text-muted-foreground mb-2">
                     Upload photos of the area or items to help us provide an accurate quote.
                   </p>
                   
                   {photos.length < 2 && (
                     <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                       <input
                         type="file"
                         accept="image/*"
                         onChange={handlePhotoUpload}
                         className="hidden"
                         id="photo-upload"
                         multiple
                       />
                       <label htmlFor="photo-upload" className="cursor-pointer">
                         <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                         <p className="text-muted-foreground">Click to upload photos</p>
                         <p className="text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
                       </label>
                     </div>
                   )}
                   
                   {photos.length > 0 && (
                     <div className="flex gap-4 mt-4">
                       {photos.map((photo, index) => (
                         <div key={index} className="relative">
                           <img 
                             src={URL.createObjectURL(photo)} 
                             alt={`Upload ${index + 1}`}
                             className="w-24 h-24 object-cover rounded-lg"
                           />
                           <button
                             type="button"
                             onClick={() => removePhoto(index)}
                             className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                           >
                             <X className="h-4 w-4" />
                           </button>
                         </div>
                       ))}
                     </div>
                   )}
                 </div>
                 
                 <Button type="submit" variant="hero" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                   {isSubmitting ? "Sending..." : "Request Quote"}
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