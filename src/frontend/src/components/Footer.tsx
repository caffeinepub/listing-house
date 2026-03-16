import { Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-navy-dark text-white">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src="/assets/generated/listing-house-logo-transparent.dim_400x120.png"
              alt="Listing House"
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Gorakhpur's most trusted property dealer with 15+ years of
              experience in residential, commercial, and warehouse properties.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-gold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/" as const, label: "Home" },
                { href: "/properties" as const, label: "Properties" },
                { href: "/commercial" as const, label: "Commercial" },
                { href: "/warehouse" as const, label: "Warehouse" },
                { href: "/about" as const, label: "About Us" },
                { href: "/sell" as const, label: "Sell Property" },
                { href: "/contact" as const, label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-semibold text-gold mb-4">
              Services
            </h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>Residential Plots</li>
              <li>House Sales</li>
              <li>Commercial Land</li>
              <li>Warehouse Deals</li>
              <li>Investment Consulting</li>
              <li>Franchise & Outlet Deals</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-gold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>Betiahata, Gorakhpur, Uttar Pradesh 273001</span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex gap-3 text-sm text-white/70 hover:text-gold transition-colors"
                >
                  <Phone className="h-4 w-4 text-gold shrink-0" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@listinghouse.in"
                  className="flex gap-3 text-sm text-white/70 hover:text-gold transition-colors"
                >
                  <Mail className="h-4 w-4 text-gold shrink-0" />
                  <span>info@listinghouse.in</span>
                </a>
              </li>
              <li className="flex gap-3 text-sm text-white/70">
                <Clock className="h-4 w-4 text-gold shrink-0" />
                <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            &copy; {year} Listing House. All rights reserved. | Property Dealer
            in Gorakhpur
          </p>
          <p className="text-white/50 text-sm">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
