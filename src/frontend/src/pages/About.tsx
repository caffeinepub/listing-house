import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Award, CheckCircle, MapPin, Phone, Shield, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Properties Sold" },
  { value: "1000+", label: "Happy Clients" },
  { value: "#1", label: "Dealer in Gorakhpur" },
];

const services = [
  "Residential plots and land in prime Gorakhpur localities",
  "Houses — independent, duplex, and apartment",
  "Commercial land for businesses, showrooms, and offices",
  "Warehouse and industrial property deals",
  "Property investment consulting and portfolio planning",
  "Franchise, bank branch, and outlet property solutions",
];

const values = [
  {
    icon: Shield,
    title: "Transparency",
    desc: "Every transaction is conducted with complete openness. No hidden charges, no surprises.",
  },
  {
    icon: Award,
    title: "Trust",
    desc: "15+ years of trust built on delivering genuine value to every client.",
  },
  {
    icon: MapPin,
    title: "Local Knowledge",
    desc: "Unparalleled insight into every locality, colony, and micro-market in Gorakhpur.",
  },
  {
    icon: Users,
    title: "Client First",
    desc: "Your goals drive every recommendation we make. Always.",
  },
];

export default function About() {
  useEffect(() => {
    document.title =
      "About Listing House | 15+ Years Property Dealer in Gorakhpur";
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-gold/20 text-gold border border-gold/40 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Gorakhpur's Trusted Real Estate Partner
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto">
              Building dreams and growing wealth through trusted property
              dealings since 2009.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in Betiahata, Gorakhpur, Listing House began with a
                  simple but powerful mission: to make real estate transactions
                  in Gorakhpur transparent, trustworthy, and hassle-free.
                </p>
                <p>
                  Over 15+ years, we have grown from a local property
                  consultancy to Gorakhpur's most recognized real estate brand.
                  From residential plots in Rapti Nagar and Civil Lines to
                  commercial properties along the bypass and NH-28 corridor — we
                  know this city like no one else.
                </p>
                <p>
                  Today, Listing House serves hundreds of clients every year —
                  homebuyers, investors, businesses, and property owners — with
                  the same dedication and personal attention that defined our
                  very first deal.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-navy rounded-2xl p-6 text-center"
                >
                  <div className="text-3xl font-display font-bold text-gold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-navy mb-8 text-center">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {services.map((service) => (
                <div key={service} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-foreground">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-navy text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center p-2">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-gold" />
                    </div>
                    <h3 className="font-display font-semibold text-navy mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-white/70 mb-8">
            Reach out today and experience the Listing House difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-gold text-navy hover:bg-gold/90 font-semibold gap-2"
              >
                Contact Us
              </Button>
            </Link>
            <a href="tel:+919876543210">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-navy gap-2"
              >
                <Phone className="h-4 w-4" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
