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

export default function Commercial() {
  const [filter, setFilter] = useState<"all" | "land" | "franchise">("all");
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Commercial Land in Gorakhpur | Franchise & Outlet Properties | Listing House";
  }, []);

  const { data: commercialLand, isLoading: loadingLand } =
    useGetPropertiesByCategory(T.commercial_land);
  const { data: franchise, isLoading: loadingFranchise } =
    useGetPropertiesByCategory(T.franchise_outlet);

  const isLoading = loadingLand || loadingFranchise;
  const allProperties: Property[] = [
    ...(commercialLand ?? []),
    ...(franchise ?? []),
  ];

  const filtered =
    filter === "all"
      ? allProperties
      : filter === "land"
        ? (commercialLand ?? [])
        : (franchise ?? []);

  return (
    <div>
      <section className="bg-navy py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block bg-gold/20 text-gold border border-gold/40 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Commercial
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Commercial Properties in Gorakhpur
            </h1>
            <p className="text-white/70 max-w-xl">
              Strategic commercial land, franchise spaces, and outlet properties
              for growing businesses.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <Tabs
              value={filter}
              onValueChange={(v) => setFilter(v as typeof filter)}
            >
              <TabsList>
                <TabsTrigger value="all" data-ocid="commercial.all.tab">
                  All
                </TabsTrigger>
                <TabsTrigger value="land" data-ocid="commercial.land.tab">
                  Commercial Land
                </TabsTrigger>
                <TabsTrigger
                  value="franchise"
                  data-ocid="commercial.franchise.tab"
                >
                  Franchise & Outlets
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
              {filtered.map((p, i) => (
                <PropertyCard key={String(p.id)} property={p} index={i + 1} />
              ))}
            </div>
          ) : (
            <div
              data-ocid="properties.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="mb-4">No commercial properties listed yet.</p>
              <Button
                onClick={() => setSiteVisitOpen(true)}
                className="bg-navy text-white"
              >
                Inquire Now
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-14 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Looking for Commercial Land in Gorakhpur?
          </h2>
          <p className="text-white/70 mb-6">
            We have exclusive listings not on any portal. Call us today.
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
