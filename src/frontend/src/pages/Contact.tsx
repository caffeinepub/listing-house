import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { T__1, useSubmitLead } from "../hooks/useQueries";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Betiahata, Gorakhpur, Uttar Pradesh 273001",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@listinghouse.in",
    href: "mailto:info@listinghouse.in",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Monday – Saturday: 9:00 AM to 7:00 PM",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitLead = useSubmitLead();

  useEffect(() => {
    document.title = "Contact Listing House | Property Dealer in Gorakhpur";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Name and phone are required.");
      return;
    }
    try {
      await submitLead.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
        leadType: T__1.contact,
        propertyId: null,
      });
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div>
      <section className="bg-navy py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block bg-gold/20 text-gold border border-gold/40 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Contact Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Get in Touch
            </h1>
            <p className="text-white/70 max-w-xl">
              Have a question about property in Gorakhpur? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-navy mb-6">
                Contact Information
              </h2>
              <div className="space-y-5 mb-8">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center shrink-0">
                      <info.icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium text-navy hover:text-gold transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium text-navy">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Call Now Prominent */}
              <a href="tel:+919876543210">
                <Button
                  size="lg"
                  className="bg-gold text-navy hover:bg-gold/90 font-bold text-base shadow-gold gap-2 w-full md:w-auto"
                >
                  <Phone className="h-5 w-5" />
                  Call Now: +91 98765 43210
                </Button>
              </a>

              {/* Map placeholder */}
              <div className="mt-8 h-48 rounded-xl overflow-hidden bg-muted flex items-center justify-center border border-border">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-navy/30" />
                  <p className="text-sm">Betiahata, Gorakhpur, UP</p>
                  <a
                    href="https://maps.google.com/?q=Betiahata,Gorakhpur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-navy hover:text-gold"
                  >
                    View on Google Maps ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div>
              <Card className="shadow-card-hover">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-navy mb-6">
                    Send an Inquiry
                  </h2>

                  {submitted ? (
                    <div
                      className="text-center py-10"
                      data-ocid="contact.success_state"
                    >
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <p className="font-medium text-navy">
                        Message sent successfully!
                      </p>
                      <p className="text-muted-foreground text-sm mt-1">
                        We'll respond within a few hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-name">Full Name *</Label>
                        <Input
                          id="contact-name"
                          data-ocid="contact.input"
                          value={form.name}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, name: e.target.value }))
                          }
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-phone">Phone Number *</Label>
                        <Input
                          id="contact-phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, phone: e.target.value }))
                          }
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-email">Email Address</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          placeholder="your@email.com"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-message">Message</Label>
                        <Textarea
                          id="contact-message"
                          data-ocid="contact.textarea"
                          value={form.message}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, message: e.target.value }))
                          }
                          placeholder="Tell us about the property you're looking for or any questions you have..."
                          rows={5}
                        />
                      </div>
                      <Button
                        type="submit"
                        data-ocid="contact.submit_button"
                        disabled={submitLead.isPending}
                        className="w-full bg-navy text-white hover:bg-navy/90 font-semibold"
                      >
                        {submitLead.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
