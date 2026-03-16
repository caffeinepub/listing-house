import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, IndianRupee, MapPin, Maximize2 } from "lucide-react";
import { useState } from "react";
import type { Property } from "../backend";
import { T, T__2 } from "../backend";
import LeadModal from "./LeadModal";

const categoryLabels: Record<T, string> = {
  [T.residential_plot]: "Residential Plot",
  [T.house]: "House",
  [T.commercial_land]: "Commercial Land",
  [T.warehouse]: "Warehouse",
  [T.franchise_outlet]: "Franchise/Outlet",
};

const categoryGradients: Record<T, string> = {
  [T.residential_plot]: "from-emerald-600 to-teal-700",
  [T.house]: "from-blue-600 to-indigo-700",
  [T.commercial_land]: "from-orange-600 to-amber-700",
  [T.warehouse]: "from-slate-600 to-zinc-700",
  [T.franchise_outlet]: "from-purple-600 to-violet-700",
};

const statusLabels: Record<T__2, string> = {
  [T__2.available]: "Available",
  [T__2.sold]: "Sold",
  [T__2.under_negotiation]: "Under Negotiation",
};

const statusColors: Record<T__2, string> = {
  [T__2.available]: "bg-green-100 text-green-800",
  [T__2.sold]: "bg-red-100 text-red-800",
  [T__2.under_negotiation]: "bg-amber-100 text-amber-800",
};

function formatPrice(price: bigint, unit: string): string {
  const num = Number(price);
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
  if (num >= 1000) return `₹${(num / 1000).toFixed(0)}K`;
  return `₹${num.toLocaleString("en-IN")} ${unit}`;
}

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export default function PropertyCard({
  property,
  index = 1,
}: PropertyCardProps) {
  const [modalMode, setModalMode] = useState<
    "site_visit" | "property_details" | null
  >(null);

  return (
    <>
      <Card
        data-ocid={`property.item.${index}`}
        className="group overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300"
      >
        {/* Image / Gradient placeholder */}
        <div
          className={`h-48 bg-gradient-to-br ${categoryGradients[property.category]} relative overflow-hidden`}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Building2 className="h-20 w-20 text-white" />
          </div>
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="text-xs bg-white/90 text-navy font-medium">
              {categoryLabels[property.category]}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[property.status]}`}
            >
              {statusLabels[property.status]}
            </span>
          </div>
          {property.featured && (
            <div className="absolute bottom-3 left-3">
              <Badge className="bg-gold text-navy text-xs font-semibold">
                ⭐ Featured
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          <h3 className="font-display font-semibold text-lg text-navy leading-tight mb-2 line-clamp-2">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-navy font-semibold text-lg">
              <IndianRupee className="h-4 w-4" />
              <span>{formatPrice(property.price, property.priceUnit)}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Maximize2 className="h-3.5 w-3.5" />
              <span>
                {property.area} {property.areaUnit}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              data-ocid="property.get_details.button"
              onClick={() => setModalMode("property_details")}
              className="flex-1 text-xs border-navy text-navy hover:bg-navy hover:text-white transition-colors"
            >
              Get Details
            </Button>
            <Button
              size="sm"
              data-ocid="property.schedule_visit.button"
              onClick={() => setModalMode("site_visit")}
              className="flex-1 text-xs bg-gold text-navy hover:bg-gold/90 font-medium"
            >
              Schedule Visit
            </Button>
          </div>
        </CardContent>
      </Card>

      {modalMode && (
        <LeadModal
          open={true}
          onClose={() => setModalMode(null)}
          mode={modalMode}
          propertyId={property.id}
          propertyTitle={property.title}
        />
      )}
    </>
  );
}

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <div className="flex gap-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardContent>
    </Card>
  );
}
