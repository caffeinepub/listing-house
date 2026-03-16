import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { type Property, T } from "../backend";
import LeadModal from "../components/LeadModal";
import PropertyCard, { PropertyCardSkeleton } from "../components/PropertyCard";
import { useGetPropertiesByCategory } from "../hooks/useQueries";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

export default function Properties() {
  const [filter, setFilter] = useState<"all" | "plot" | "house">("all");
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Plots for Sale in Gorakhpur | Residential Houses | Listing House";
  }, []);

  const { data: plots, isLoading: loadingPlots } = useGetPropertiesByCategory(
    T.residential_plot,
  );
  const { data: houses, isLoading: loadingHouses } = useGetPropertiesByCategory(
    T.house,
  );

  const isLoading = loadingPlots || loadingHouses;

  const allProperties: Property[] = [...(plots ?? []), ...(houses ?? [])];

  const filtered =
    filter === "all"
      ? allProperties
      : filter === "plot"
        ? (plots ?? [])
        : (houses ?? []);

  return (
    <div>
      {/* Header */}
      <section className="bg-navy py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block bg-gold/20 text-gold border border-gold/40 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Residential
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Residential Properties in Gorakhpur
            </h1>
            <p className="text-white/70 max-w-xl">
              Explore our curated selection of plots and houses across
              Gorakhpur's prime localities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Properties */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <Tabs
              value={filter}
              onValueChange={(v) => setFilter(v as typeof filter)}
            >
              <TabsList>
                <TabsTrigger value="all" data-ocid="properties.all.tab">
                  All
                </TabsTrigger>
                <TabsTrigger value="plot" data-ocid="properties.plots.tab">
                  Plots
                </TabsTrigger>
                <TabsTrigger value="house" data-ocid="properties.houses.tab">
                  Houses
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <span className="text-muted-foreground text-sm">
              {isLoading ? "Loading..." : `${filtered.length} properties found`}
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKELETON_KEYS.map((k) => (
                <PropertyCardSkeleton key={k} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property, i) => (
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
              className="text-center py-20 text-muted-foreground"
            >
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="mb-4">No properties listed in this category yet.</p>
              <Button
                onClick={() => setSiteVisitOpen(true)}
                className="bg-navy text-white"
              >
                Inquire About Available Properties
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Lead Banner */}
      <section className="py-14 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white/70 mb-6">
            Tell us your requirements and we'll find the perfect property for
            you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setSiteVisitOpen(true)}
              className="bg-gold text-navy hover:bg-gold/90 font-semibold"
            >
              Schedule Site Visit
            </Button>
            <a href="tel:+919876543210">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-navy gap-2"
              >
                <Phone className="h-4 w-4" /> Call Now
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
