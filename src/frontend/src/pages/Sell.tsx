import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, IndianRupee, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { T, useSubmitSellRequest } from "../hooks/useQueries";

const propertyTypeLabels: Record<T, string> = {
  [T.residential_plot]: "Residential Plot",
  [T.house]: "House",
  [T.commercial_land]: "Commercial Land",
  [T.warehouse]: "Warehouse",
  [T.franchise_outlet]: "Franchise / Outlet",
};

const steps = [
  {
    num: "01",
    title: "Share Details",
    desc: "Fill the form with your property information.",
  },
  {
    num: "02",
    title: "Site Evaluation",
    desc: "Our expert visits and values your property.",
  },
  {
    num: "03",
    title: "Listing & Marketing",
    desc: "We market your property to our buyer network.",
  },
  {
    num: "04",
    title: "Close the Deal",
    desc: "We handle negotiations and documentation.",
  },
];

export default function Sell() {
  const [form, setForm] = useState({
    ownerName: "",
    phone: "",
    email: "",
    propertyType: "" as T | "",
    location: "",
    area: "",
    areaUnit: "sq_ft",
    expectedPrice: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const submitSell = useSubmitSellRequest();

  useEffect(() => {
    document.title = "Sell Your Property in Gorakhpur | Listing House";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.ownerName ||
      !form.phone ||
      !form.propertyType ||
      !form.location ||
      !form.area ||
      !form.expectedPrice
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitSell.mutateAsync({
        ownerName: form.ownerName,
        phone: form.phone,
        email: form.email,
        propertyType: form.propertyType as T,
        location: form.location,
        area: Number.parseFloat(form.area),
        expectedPrice: BigInt(
          Math.round(Number.parseFloat(form.expectedPrice)),
        ),
        description: form.description,
      });
      setSubmitted(true);
      toast.success("Your sell request has been submitted!");
    } catch {
      toast.error("Failed to submit. Please try again.");
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
              Sell Property
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Sell Your Property in Gorakhpur
            </h1>
            <p className="text-white/70 max-w-xl">
              Get the best price for your property with Gorakhpur's most
              connected real estate team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-3xl font-display font-bold text-gold mb-1">
                  {step.num}
                </div>
                <h3 className="font-semibold text-navy mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
                data-ocid="sell.success_state"
              >
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
                <h2 className="font-display text-3xl font-bold text-navy mb-4">
                  Request Received!
                </h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Our team will review your property details and contact you
                  within 24 hours to schedule a free valuation.
                </p>
              </motion.div>
            ) : (
              <Card className="shadow-card-hover">
                <CardContent className="p-8">
                  <h2 className="font-display text-2xl font-bold text-navy mb-6">
                    Property Details
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="owner-name">Owner Name *</Label>
                        <Input
                          id="owner-name"
                          value={form.ownerName}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              ownerName: e.target.value,
                            }))
                          }
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, phone: e.target.value }))
                          }
                          placeholder="+91 XXXXX XXXXX"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label>Property Type *</Label>
                      <Select
                        value={form.propertyType}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, propertyType: v as T }))
                        }
                      >
                        <SelectTrigger data-ocid="sell.select">
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(propertyTypeLabels).map(
                            ([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="location">Location in Gorakhpur *</Label>
                      <Input
                        id="location"
                        value={form.location}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, location: e.target.value }))
                        }
                        placeholder="e.g. Rapti Nagar, Civil Lines, Betiahata"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="area">Area *</Label>
                        <Input
                          id="area"
                          type="number"
                          value={form.area}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, area: e.target.value }))
                          }
                          placeholder="e.g. 2400"
                          required
                          min="1"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>Area Unit</Label>
                        <Select
                          value={form.areaUnit}
                          onValueChange={(v) =>
                            setForm((p) => ({ ...p, areaUnit: v }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sq_ft">Sq. Feet</SelectItem>
                            <SelectItem value="sq_yards">Sq. Yards</SelectItem>
                            <SelectItem value="acres">Acres</SelectItem>
                            <SelectItem value="bigha">Bigha</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="price">Expected Price (₹) *</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="price"
                          type="number"
                          value={form.expectedPrice}
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              expectedPrice: e.target.value,
                            }))
                          }
                          placeholder="e.g. 5000000"
                          className="pl-9"
                          required
                          min="1"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={form.description}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Describe your property — construction, amenities, road access, etc."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      data-ocid="sell.submit_button"
                      disabled={submitSell.isPending}
                      className="w-full bg-navy text-white hover:bg-navy/90 font-semibold py-6"
                    >
                      {submitSell.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Property for Sale"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
