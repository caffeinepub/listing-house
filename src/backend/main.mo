import Time "mo:core/Time";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  module LeadType {
    public type T = {
      #site_visit;
      #property_details;
      #sell_property;
      #contact;
      #general;
    };
  };

  module PropertyCategory {
    public type T = {
      #residential_plot;
      #house;
      #commercial_land;
      #warehouse;
      #franchise_outlet;
    };
  };

  module PropertyStatus {
    public type T = {
      #available;
      #sold;
      #under_negotiation;
    };
  };

  type Lead = {
    id : Nat;
    name : Text;
    phone : Text;
    email : Text;
    message : Text;
    leadType : LeadType.T;
    propertyId : ?Nat;
    timestamp : Time.Time;
  };

  module Lead {
    public func compare(a : Lead, b : Lead) : Order.Order {
      if (a.timestamp > b.timestamp) {
        #less;
      } else if (a.timestamp < b.timestamp) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  type Property = {
    id : Nat;
    title : Text;
    description : Text;
    location : Text;
    price : Nat;
    priceUnit : Text;
    area : Float;
    areaUnit : Text;
    category : PropertyCategory.T;
    status : PropertyStatus.T;
    bedrooms : ?Nat;
    featured : Bool;
  };

  type SellPropertyRequest = {
    id : Nat;
    ownerName : Text;
    phone : Text;
    email : Text;
    propertyType : PropertyCategory.T;
    location : Text;
    area : Float;
    expectedPrice : Nat;
    description : Text;
    timestamp : Time.Time;
  };

  let leads = Map.empty<Nat, Lead>();
  let properties = Map.empty<Nat, Property>();
  let sellRequests = Map.empty<Nat, SellPropertyRequest>();

  var nextLeadId = 1;
  var nextSellRequestId = 1;

  public shared ({ caller }) func submitLead(name : Text, phone : Text, email : Text, message : Text, leadType : LeadType.T, propertyId : ?Nat) : async () {
    let lead : Lead = {
      id = nextLeadId;
      name;
      phone;
      email;
      message;
      leadType;
      propertyId;
      timestamp = Time.now();
    };

    leads.add(nextLeadId, lead);
    nextLeadId += 1;
  };

  public query ({ caller }) func getAllLeads() : async [Lead] {
    leads.values().toArray().sort();
  };

  public query ({ caller }) func getFeaturedProperties() : async [Property] {
    properties.values().toArray().filter(func(p) { p.featured });
  };

  public query ({ caller }) func getPropertiesByCategory(category : PropertyCategory.T) : async [Property] {
    properties.values().toArray().filter(func(p) { p.category == category });
  };

  public query ({ caller }) func getProperty(id : Nat) : async Property {
    switch (properties.get(id)) {
      case (null) { Runtime.trap("Property not found") };
      case (?property) { property };
    };
  };

  public query ({ caller }) func getAllProperties() : async [Property] {
    properties.values().toArray();
  };

  public shared ({ caller }) func submitSellPropertyRequest(ownerName : Text, phone : Text, email : Text, propertyType : PropertyCategory.T, location : Text, area : Float, expectedPrice : Nat, description : Text) : async () {
    let request : SellPropertyRequest = {
      id = nextSellRequestId;
      ownerName;
      phone;
      email;
      propertyType;
      location;
      area;
      expectedPrice;
      description;
      timestamp = Time.now();
    };

    sellRequests.add(nextSellRequestId, request);
    nextSellRequestId += 1;
  };

  public query ({ caller }) func getAllSellRequests() : async [SellPropertyRequest] {
    sellRequests.values().toArray();
  };

  let sampleProperties : [Property] = [
    {
      id = 1;
      title = "Residential Plot in Civil Lines";
      description = "Prime location, 2000 sq ft residential plot in Civil Lines, Gorakhpur.";
      location = "Civil Lines, Gorakhpur";
      price = 5000000;
      priceUnit = "total";
      area = 2000.0;
      areaUnit = "sq ft";
      category = #residential_plot;
      status = #available;
      bedrooms = null;
      featured = true;
    },
    {
      id = 2;
      title = "3 BHK House in Rajendra Nagar";
      description = "Spacious 3 bedroom house with modern amenities in Rajendra Nagar.";
      location = "Rajendra Nagar, Gorakhpur";
      price = 7500000;
      priceUnit = "total";
      area = 1800.0;
      areaUnit = "sq ft";
      category = #house;
      status = #available;
      bedrooms = ?3;
      featured = true;
    },
    {
      id = 3;
      title = "Commercial Land on Gorakhpur-Varanasi Road";
      description = "5000 sq ft commercial land with main road access.";
      location = "Gorakhpur-Varanasi Road";
      price = 15000000;
      priceUnit = "total";
      area = 5000.0;
      areaUnit = "sq ft";
      category = #commercial_land;
      status = #available;
      bedrooms = null;
      featured = false;
    },
    {
      id = 4;
      title = "Warehouse in Industrial Area";
      description = "10000 sq ft warehouse with loading dock and office space.";
      location = "Industrial Area, Gorakhpur";
      price = 20000000;
      priceUnit = "total";
      area = 10000.0;
      areaUnit = "sq ft";
      category = #warehouse;
      status = #available;
      bedrooms = null;
      featured = false;
    },
    {
      id = 5;
      title = "Franchise Outlet Opportunity";
      description = "Prime location for franchise outlet - high foot traffic area.";
      location = "City Center, Gorakhpur";
      price = 3000000;
      priceUnit = "total";
      area = 800.0;
      areaUnit = "sq ft";
      category = #franchise_outlet;
      status = #available;
      bedrooms = null;
      featured = true;
    },
    {
      id = 6;
      title = "Residential Plot in Basharatpur";
      description = "1500 sq ft plot in popular residential area.";
      location = "Basharatpur, Gorakhpur";
      price = 3500000;
      priceUnit = "total";
      area = 1500.0;
      areaUnit = "sq ft";
      category = #residential_plot;
      status = #available;
      bedrooms = null;
      featured = false;
    },
    {
      id = 7;
      title = "4 BHK House in Medical Road";
      description = "Luxury 4 bedroom house near medical college.";
      location = "Medical Road, Gorakhpur";
      price = 12000000;
      priceUnit = "total";
      area = 2500.0;
      areaUnit = "sq ft";
      category = #house;
      status = #available;
      bedrooms = ?4;
      featured = true;
    },
    {
      id = 8;
      title = "Commercial Land near Airport";
      description = "7500 sq ft commercial plot - ideal for hotel or showroom.";
      location = "Near Airport, Gorakhpur";
      price = 25000000;
      priceUnit = "total";
      area = 7500.0;
      areaUnit = "sq ft";
      category = #commercial_land;
      status = #available;
      bedrooms = null;
      featured = false;
    },
    {
      id = 9;
      title = "Warehouse in Transport Nagar";
      description = "8000 sq ft warehouse with excellent logistics facilities.";
      location = "Transport Nagar, Gorakhpur";
      price = 16000000;
      priceUnit = "total";
      area = 8000.0;
      areaUnit = "sq ft";
      category = #warehouse;
      status = #available;
      bedrooms = null;
      featured = false;
    },
    {
      id = 10;
      title = "Franchise Outlet - Food Court";
      description = "Ready-to-move food court location with high visibility.";
      location = "Mall Road, Gorakhpur";
      price = 4000000;
      priceUnit = "total";
      area = 1000.0;
      areaUnit = "sq ft";
      category = #franchise_outlet;
      status = #available;
      bedrooms = null;
      featured = true;
    },
    {
      id = 11;
      title = "Residential Plot in Ramgarh";
      description = "2500 sq ft plot with clear title and all amenities.";
      location = "Ramgarh, Gorakhpur";
      price = 6000000;
      priceUnit = "total";
      area = 2500.0;
      areaUnit = "sq ft";
      category = #residential_plot;
      status = #available;
      bedrooms = null;
      featured = false;
    },
    {
      id = 12;
      title = "2 BHK House in Gulriha";
      description = "Affordable 2 bedroom house in fast-growing area.";
      location = "Gulriha, Gorakhpur";
      price = 4000000;
      priceUnit = "total";
      area = 1000.0;
      areaUnit = "sq ft";
      category = #house;
      status = #available;
      bedrooms = ?2;
      featured = true;
    },
  ];

  for (property in sampleProperties.values()) {
    properties.add(property.id, property);
  };
};
