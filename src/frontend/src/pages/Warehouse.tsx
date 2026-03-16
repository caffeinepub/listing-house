import { Button } from "@/components/ui/button";
import { Phone, Warehouse as WarehouseIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { T } from "../backend";
import LeadModal from "../components/LeadModal";
import PropertyCard, { PropertyCardSkeleton } from "../components/PropertyCard";
import { useGetPropertiesByCategory } from "../hooks/useQueries";

const SKELETON_KEYS = ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"];

export default function Warehouse() {
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);

  useEffect(() => {
    document.title =
      "Warehouse Property in Gorakhpur | Industrial Land | Listing House";
  }, []);

  const { data: warehouses, isLoading } = useGetPropertiesByCategory(
    T.warehouse,
  );

  return (
    <div>
      <section className="bg-navy py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block bg-gold/20 text-gold border border-gold/40 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Warehouse & Industrial
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
              Warehouse Properties in Gorakhpur
            </h1>
            <p className="text-white/70 max-w-xl">
              Industrial warehouses, storage facilities, and logistics spaces in
              Gorakhpur's key commercial zones.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKELETON_KEYS.map((k) => (
                <PropertyCardSkeleton key={k} />
              ))}
            </div>
          ) : (warehouses?.length ?? 0) > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                {warehouses!.length} properties found
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {warehouses!.map((p, i) => (
                  <PropertyCard key={String(p.id)} property={p} index={i + 1} />
                ))}
              </div>
            </>
          ) : (
            <div
              data-ocid="properties.empty_state"
              className="text-center py-20 text-muted-foreground"
            >
              <WarehouseIcon className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="mb-4">
                No warehouse listings currently. Contact us for off-market
                opportunities.
              </p>
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
            Need a Warehouse in Gorakhpur?
          </h2>
          <p className="text-white/70 mb-6">
            We handle exclusive warehouse and industrial property transactions
            across Gorakhpur district.
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
