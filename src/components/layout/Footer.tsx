import { Link } from "react-router-dom";
 import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Star } from "lucide-react";
import logo from "@/assets/logo.png";

const services = [
  { name: "Rubbish Removal", href: "/services/rubbish-removal" },
  { name: "House Clearance", href: "/services/house-clearance" },
  { name: "Garden Clearance", href: "/services/garden-clearance" },
  { name: "Office Clearance", href: "/services/office-clearance" },
  { name: "Regular Collection", href: "/services/regular-collection" },
  { name: "Bulky Items", href: "/services/bulky-items" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Before & After", href: "/gallery" },
   { name: "Get a Quote", href: "/quote" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-dark text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-6">
            <img 
              src={logo} 
              alt="WasteWiz" 
              className="h-14 w-auto brightness-0 invert"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Greater Manchester's trusted waste removal service. Fast, reliable, and eco-friendly 
              clearance solutions for homes and businesses.
            </p>
            <div className="flex gap-4">
              <a 
                 href="https://www.facebook.com/people/Rubbish-and-House-Clearance/100090455190354/" 
                 target="_blank"
                 rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                 href="https://www.instagram.com/waste_whiz" 
                 target="_blank"
                 rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.href}
                    className="text-white/70 hover:text-secondary transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-white/70 hover:text-secondary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                   <a href="tel:+447340123486" className="block text-white hover:text-secondary transition-colors">
                     07340 123486
                   </a>
                   <a href="tel:+447585071979" className="block text-white hover:text-secondary transition-colors">
                     07585 071979
                   </a>
                   <a href="tel:+4401618204999" className="block text-white/70 hover:text-secondary transition-colors text-sm">
                     01618 204999
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-secondary mt-0.5" />
                 <a href="mailto:wastewhiz@rubbishclearanceltd.com" className="text-white/70 hover:text-secondary transition-colors text-sm break-all">
                   wastewhiz@rubbishclearanceltd.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary mt-0.5" />
                <span className="text-white/70 text-sm">
                  Greater Manchester, Greater Manchester, UK
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-secondary mt-0.5" />
                 <div className="text-white/70 text-sm">
                   <p>Mon - Fri: 9am - 6pm</p>
                   <p>Sat: 10am - 4pm</p>
                 </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} WasteWiz. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
