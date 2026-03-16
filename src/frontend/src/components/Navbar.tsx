import { Button } from "@/components/ui/button";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", ocid: "nav.home.link" },
  { href: "/properties", label: "Properties", ocid: "nav.properties.link" },
  { href: "/commercial", label: "Commercial", ocid: "nav.commercial.link" },
  { href: "/warehouse", label: "Warehouse", ocid: "nav.warehouse.link" },
  { href: "/about", label: "About Us", ocid: "nav.about.link" },
  { href: "/sell", label: "Sell Property", ocid: "nav.sell.link" },
  { href: "/contact", label: "Contact", ocid: "nav.contact.link" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-lg">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/assets/generated/listing-house-logo-transparent.dim_400x120.png"
              alt="Listing House - Property Dealer in Gorakhpur"
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                data-ocid={link.ocid}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+919876543210">
              <Button
                data-ocid="nav.call_now.button"
                className="bg-gold text-navy font-semibold hover:bg-gold/90 shadow-gold gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Now
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-white/10">
            <div className="pt-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-ocid={link.ocid}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    pathname === link.href
                      ? "text-gold bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a href="tel:+919876543210" className="mt-3">
                <Button
                  data-ocid="nav.call_now.button"
                  className="w-full bg-gold text-navy font-semibold hover:bg-gold/90 gap-2"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
