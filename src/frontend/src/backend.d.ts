import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    id: bigint;
    leadType: T__1;
    name: string;
    propertyId?: bigint;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Property {
    id: bigint;
    status: T__2;
    title: string;
    featured: boolean;
    bedrooms?: bigint;
    area: number;
    description: string;
    areaUnit: string;
    category: T;
    priceUnit: string;
    price: bigint;
    location: string;
}
export type Time = bigint;
export interface SellPropertyRequest {
    id: bigint;
    ownerName: string;
    propertyType: T;
    area: number;
    description: string;
    email: string;
    timestamp: Time;
    phone: string;
    expectedPrice: bigint;
    location: string;
}
export enum T {
    commercial_land = "commercial_land",
    house = "house",
    residential_plot = "residential_plot",
    warehouse = "warehouse",
    franchise_outlet = "franchise_outlet"
}
export enum T__1 {
    contact = "contact",
    site_visit = "site_visit",
    property_details = "property_details",
    general = "general",
    sell_property = "sell_property"
}
export enum T__2 {
    sold = "sold",
    available = "available",
    under_negotiation = "under_negotiation"
}
export interface backendInterface {
    getAllLeads(): Promise<Array<Lead>>;
    getAllProperties(): Promise<Array<Property>>;
    getAllSellRequests(): Promise<Array<SellPropertyRequest>>;
    getFeaturedProperties(): Promise<Array<Property>>;
    getPropertiesByCategory(category: T): Promise<Array<Property>>;
    getProperty(id: bigint): Promise<Property>;
    submitLead(name: string, phone: string, email: string, message: string, leadType: T__1, propertyId: bigint | null): Promise<void>;
    submitSellPropertyRequest(ownerName: string, phone: string, email: string, propertyType: T, location: string, area: number, expectedPrice: bigint, description: string): Promise<void>;
}
