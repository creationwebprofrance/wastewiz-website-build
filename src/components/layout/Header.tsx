import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
   { name: "Get a Quote", href: "/quote" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={logo} 
            alt="WasteWiz - Waste Removal Services Greater Manchester" 
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.href 
                  ? "text-primary" 
                  : "text-foreground/80"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
             <a href="tel:+447340123486" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </Button>
          <Button variant="hero" size="sm" asChild>
             <Link to="/quote">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="container py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2 text-base font-medium ${
                  location.pathname === item.href 
                    ? "text-primary" 
                    : "text-foreground/80"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <Button variant="outline" asChild>
                 <a href="tel:+447340123486" className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button variant="hero" asChild>
                 <Link to="/quote" onClick={() => setMobileMenuOpen(false)}>
                   Get a Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
