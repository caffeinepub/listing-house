import { useMutation, useQuery } from "@tanstack/react-query";
import { type Property, T, T__1 } from "../backend";
import { useActor } from "./useActor";

export function useGetFeaturedProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ["featured-properties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProperties();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetPropertiesByCategory(category: T) {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ["properties-by-category", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPropertiesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllProperties() {
  const { actor, isFetching } = useActor();
  return useQuery<Property[]>({
    queryKey: ["all-properties"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProperties();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitLead() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (args: {
      name: string;
      phone: string;
      email: string;
      message: string;
      leadType: T__1;
      propertyId: bigint | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitLead(
        args.name,
        args.phone,
        args.email,
        args.message,
        args.leadType,
        args.propertyId,
      );
    },
  });
}

export function useSubmitSellRequest() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (args: {
      ownerName: string;
      phone: string;
      email: string;
      propertyType: T;
      location: string;
      area: number;
      expectedPrice: bigint;
      description: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitSellPropertyRequest(
        args.ownerName,
        args.phone,
        args.email,
        args.propertyType,
        args.location,
        args.area,
        args.expectedPrice,
        args.description,
      );
    },
  });
}

export { T, T__1 };
