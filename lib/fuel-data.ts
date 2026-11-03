// Per-city petrol and diesel price data for programmatic SEO pages.
// Prices in ₹/litre. Updated: November 2026.
// Fuel prices in India are revised by oil companies (IOC/BPCL/HPCL) and
// vary by state VAT and local levies. These are representative rates.

export type FuelCity = {
  slug: string;
  name: string;
  state: string;
  petrol: number;  // ₹/litre
  diesel: number;  // ₹/litre
  lastUpdated: string; // "YYYY-MM-DD"
};

export const FUEL_CITIES: FuelCity[] = [
  { slug: "delhi",              name: "Delhi",              state: "Delhi",           petrol: 94.72,  diesel: 87.62,  lastUpdated: "2026-11-01" },
  { slug: "mumbai",             name: "Mumbai",             state: "Maharashtra",     petrol: 103.44, diesel: 89.97,  lastUpdated: "2026-11-01" },
  { slug: "chennai",            name: "Chennai",            state: "Tamil Nadu",      petrol: 100.85, diesel: 92.44,  lastUpdated: "2026-11-01" },
  { slug: "kolkata",            name: "Kolkata",            state: "West Bengal",     petrol: 103.94, diesel: 90.76,  lastUpdated: "2026-11-01" },
  { slug: "bangalore",          name: "Bangalore",          state: "Karnataka",       petrol: 102.86, diesel: 88.94,  lastUpdated: "2026-11-01" },
  { slug: "hyderabad",          name: "Hyderabad",          state: "Telangana",       petrol: 107.41, diesel: 95.65,  lastUpdated: "2026-11-01" },
  { slug: "pune",               name: "Pune",               state: "Maharashtra",     petrol: 103.57, diesel: 90.03,  lastUpdated: "2026-11-01" },
  { slug: "ahmedabad",          name: "Ahmedabad",          state: "Gujarat",         petrol: 96.63,  diesel: 89.87,  lastUpdated: "2026-11-01" },
  { slug: "jaipur",             name: "Jaipur",             state: "Rajasthan",       petrol: 104.88, diesel: 90.36,  lastUpdated: "2026-11-01" },
  { slug: "lucknow",            name: "Lucknow",            state: "Uttar Pradesh",   petrol: 95.28,  diesel: 88.14,  lastUpdated: "2026-11-01" },
  { slug: "chandigarh",         name: "Chandigarh",         state: "Punjab",          petrol: 94.24,  diesel: 82.49,  lastUpdated: "2026-11-01" },
  { slug: "bhopal",             name: "Bhopal",             state: "Madhya Pradesh",  petrol: 107.23, diesel: 92.25,  lastUpdated: "2026-11-01" },
  { slug: "surat",              name: "Surat",              state: "Gujarat",         petrol: 96.62,  diesel: 89.85,  lastUpdated: "2026-11-01" },
  { slug: "nagpur",             name: "Nagpur",             state: "Maharashtra",     petrol: 103.85, diesel: 90.17,  lastUpdated: "2026-11-01" },
  { slug: "kochi",              name: "Kochi",              state: "Kerala",          petrol: 104.07, diesel: 91.73,  lastUpdated: "2026-11-01" },
  { slug: "patna",              name: "Patna",              state: "Bihar",           petrol: 107.49, diesel: 94.32,  lastUpdated: "2026-11-01" },
  { slug: "indore",             name: "Indore",             state: "Madhya Pradesh",  petrol: 107.13, diesel: 92.11,  lastUpdated: "2026-11-01" },
  { slug: "visakhapatnam",      name: "Visakhapatnam",      state: "Andhra Pradesh",  petrol: 109.65, diesel: 97.31,  lastUpdated: "2026-11-01" },
  { slug: "coimbatore",         name: "Coimbatore",         state: "Tamil Nadu",      petrol: 100.79, diesel: 92.38,  lastUpdated: "2026-11-01" },
  { slug: "vadodara",           name: "Vadodara",           state: "Gujarat",         petrol: 96.61,  diesel: 89.83,  lastUpdated: "2026-11-01" },
];

export const FUEL_CITY_SLUGS = FUEL_CITIES.map((c) => c.slug);

export function getFuelCity(slug: string): FuelCity | undefined {
  return FUEL_CITIES.find((c) => c.slug === slug);
}
