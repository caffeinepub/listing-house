import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import {
  Award,
  Briefcase,
  Building2,
  ChevronRight,
  Home as HomeIcon,
  MapPin,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
  Warehouse,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import LeadModal from "../components/LeadModal";
import PropertyCard, { PropertyCardSkeleton } from "../components/PropertyCard";
import { useGetFeaturedProperties } from "../hooks/useQueries";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

const services = [
  {
    icon: MapPin,
    title: "Residential Plots",
    desc: "Prime residential plots in Gorakhpur's best localities for your dream home.",
  },
  {
    icon: HomeIcon,
    title: "Houses for Sale",
    desc: "Ready-to-move and under-construction houses across Gorakhpur.",
  },
  {
    icon: Building2,
    title: "Commercial Land",
    desc: "Strategic commercial plots ideal for businesses, showrooms, and offices.",
  },
  {
    icon: Warehouse,
    title: "Warehouse Properties",
    desc: "Industrial and warehouse spaces for storage and logistics operations.",
  },
  {
    icon: TrendingUp,
    title: "Investment Consulting",
    desc: "Expert guidance to maximize your real estate returns in Gorakhpur.",
  },
  {
    icon: Briefcase,
    title: "Franchise & Outlet Deals",
    desc: "Bank branches, franchise outlets, and retail property solutions.",
  },
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Properties Sold" },
  { value: "1000+", label: "Happy Clients" },
  { value: "#1", label: "Dealer in Gorakhpur" },
];

const whyUs = [
  {
    icon: Award,
    title: "15+ Years Experience",
    desc: "Deep roots in the Gorakhpur market with unmatched local expertise.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    desc: "We know every locality, colony, and investment opportunity in Gorakhpur.",
  },
  {
    icon: Shield,
    title: "Transparent Deals",
    desc: "No hidden charges. Honest valuations. Legal documentation support.",
  },
  {
    icon: Users,
    title: "End-to-End Support",
    desc: "From search to registration, we guide you through every step.",
  },
];

const testimonials = [
  {
    name: "Rajesh Kumar Gupta",
    location: "Gorakhpur",
    text: "Listing House helped me find the perfect residential plot in Rapti Nagar. The team was professional and transparent throughout the process. Highly recommended!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    location: "Gorakhpur",
    text: "I sold my house through Listing House and got the best price in the market. Their local knowledge and negotiation skills are exceptional.",
    rating: 5,
  },
  {
    name: "Amit Singh",
    location: "Gorakhpur",
    text: "For commercial land near the bypass, Listing House was the best choice. Closed the deal in just 2 weeks. Excellent service!",
    rating: 5,
  },
];

const STAR_KEYS = ["s1", "s2", "s3", "s4", "s5"];

export default function Home() {
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const { data: featuredProperties, isLoading } = useGetFeaturedProperties();

  useEffect(() => {
    document.title =
      "Property Dealer in Gorakhpur | Listing House | Plots, Houses, Commercial Land";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Listing House – Gorakhpur's most trusted property dealer. Buy residential plots, houses, commercial land and warehouses in Gorakhpur with 15+ years of expertise.",
      );
    }
  }, []);

  const displayProperties = featuredProperties?.slice(0, 6) ?? [];

  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-background.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-navy-dark/75" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-gold/20 text-gold border border-gold/40 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Betiahata, Gorakhpur • 15+ Years of Trust
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Your Trusted Property
              <span className="block text-gold">Dealer in Gorakhpur</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              From residential plots to commercial land and warehouses — we
              bring 15+ years of expertise to every property deal in Gorakhpur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/properties">
                <Button
                  size="lg"
                  data-ocid="hero.properties.secondary_button"
                  className="bg-white text-navy hover:bg-white/90 font-semibold text-base gap-2 px-8"
                >
                  Browse Properties <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                data-ocid="hero.site_visit.primary_button"
                onClick={() => setSiteVisitOpen(true)}
                className="bg-gold text-navy hover:bg-gold/90 font-semibold text-base gap-2 px-8 shadow-gold"
              >
                Schedule Site Visit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-gold mb-1">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              Our Real Estate Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive property solutions for buyers, sellers, and
              investors in Gorakhpur.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-card-hover transition-shadow duration-300 border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-navy/8 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-display font-semibold text-lg text-navy mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-3">
                Featured Properties
              </h2>
              <p className="text-muted-foreground">
                Handpicked properties in Gorakhpur's prime locations.
              </p>
            </div>
            <Link
              to="/properties"
              className="hidden md:flex items-center gap-1 text-navy font-medium hover:text-gold transition-colors"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKELETON_KEYS.map((k) => (
                <PropertyCardSkeleton key={k} />
              ))}
            </div>
          ) : displayProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProperties.map((property, i) => (
                <PropertyCard
                  key={String(property.id)}
                  property={property}
                  index={i + 1}
                />
              ))}
            </div>
          ) : (
            <div
              data-ocid="properties.empty_state"
              className="text-center py-16 text-muted-foreground"
            >
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>
                Featured properties coming soon.{" "}
                <Link
                  to="/contact"
                  className="text-navy font-medium hover:text-gold"
                >
                  Contact us
                </Link>{" "}
                for current listings.
              </p>
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/properties">
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white gap-2"
              >
                View All Properties <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
              Why Choose Listing House?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Gorakhpur's most trusted name in real estate for over 15 years.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              What Our Clients Say
            </h2>
            <p className="text-white/60">
              Real experiences from real clients in Gorakhpur.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-0.5 mb-4">
                      {STAR_KEYS.slice(0, t.rating).map((k) => (
                        <Star key={k} className="h-4 w-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed mb-4 italic">
                      "{t.text}"
                    </p>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {t.name}
                      </p>
                      <p className="text-white/50 text-xs">{t.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Get in touch with Gorakhpur's most experienced property dealer
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setSiteVisitOpen(true)}
              className="bg-navy text-white hover:bg-navy/90 font-semibold gap-2"
            >
              Schedule Site Visit
            </Button>
            <a href="tel:+919876543210">
              <Button
                size="lg"
                className="bg-gold text-navy hover:bg-gold/90 font-semibold gap-2 shadow-gold"
              >
                <Phone className="h-4 w-4" /> Call Now: +91 98765 43210
              </Button>
            </a>
          </div>
        </div>
      </section>

      <LeadModal
        open={siteVisitOpen}
        onClose={() => setSiteVisitOpen(false)}
        mode="site_visit"
      />
    </div>
  );
}
