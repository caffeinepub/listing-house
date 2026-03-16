# Listing House Real Estate Website

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full real estate website for Listing House, Betiahata, Gorakhpur, UP, India
- 7 pages: Home, About Us, Properties, Commercial Properties, Warehouse Properties, Sell Property, Contact
- Lead generation forms with CTA buttons: Schedule Site Visit, Get Property Details, Call Now
- Backend: store and retrieve property inquiries/leads submitted via forms
- SEO meta tags for target keywords

### Modify
- N/A

### Remove
- N/A

## Implementation Plan

### Backend
- `submitLead(name, phone, email, message, leadType)` -> stores lead inquiry
- `getLeads()` -> admin retrieval (protected)
- Property listings stored as static seed data: residential plots, houses, commercial land, warehouses
- `getProperties(category)` -> returns filtered property list

### Frontend Pages
1. **Home** - Hero with tagline, services overview, featured properties, testimonials, lead CTA section
2. **About Us** - Company story, 15+ years experience, team, trust signals
3. **Properties** - Residential plots and houses grid with Get Property Details / Schedule Site Visit per card
4. **Commercial Properties** - Commercial land and franchise/bank/outlet deals grid
5. **Warehouse Properties** - Warehouse listings grid
6. **Sell Property** - Form to submit property for sale
7. **Contact** - Contact info (Betiahata, Gorakhpur), map embed placeholder, inquiry form

### Lead Generation
- Schedule Site Visit modal form (name, phone, preferred date)
- Get Property Details modal form (name, phone, email)
- Call Now button with tel: link to company number
- All forms submit to backend submitLead

### SEO
- Meta title/description per page targeting: property dealer in Gorakhpur, plots for sale in Gorakhpur, commercial land in Gorakhpur, warehouse property in Gorakhpur
- Structured heading hierarchy with keywords
