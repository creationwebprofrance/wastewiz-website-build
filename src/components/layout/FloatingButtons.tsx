import { Phone, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
         href="https://wa.me/447340123486?text=Hi%20WasteWiz%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20waste%20removal."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-strong hover:scale-110 transition-transform animate-pulse-glow"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      
      {/* Phone Button */}
      <a
         href="tel:+447340123486"
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-strong hover:scale-110 transition-transform"
        aria-label="Call us now"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
}
