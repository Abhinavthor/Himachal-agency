import { useState, useMemo, Suspense, lazy } from "react";
import { LOCATIONS, CATEGORIES, type Category } from "@/data/locations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WeatherWidget } from "@/components/WeatherWidget";
import { ContactForm } from "@/components/ContactForm";
import heroImage from "@/assets/hero.png";

// Lazy load the LocationCard to demonstrate performance optimizations
const LocationCard = lazy(() => import("@/components/LocationCard"));

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredLocations = useMemo(() => {
    return LOCATIONS.filter((loc) => {
      const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || loc.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black/30" />
        <img 
          src={heroImage}
          alt="Himachal Mountains" 
          className="absolute inset-0 z-[-1] object-cover w-full h-full"
        />
        <div className="z-10 text-center px-4 max-w-3xl space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
            Discover Himachal
          </h1>
          <p className="text-xl text-white/90 drop-shadow-lg">
            Experience the majestic Himalayas, pristine valleys, and ancient temples.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container py-12 space-y-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main List Section */}
          <div className="flex-1 space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Destinations</h2>
              <div className="w-full sm:w-72">
                <Input 
                  placeholder="Search destinations..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Suspense Wrapper for Lazy Loaded Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <Suspense fallback={
                <div className="col-span-full h-64 flex items-center justify-center text-muted-foreground">
                  Loading destinations...
                </div>
              }>
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <LocationCard key={loc.id} location={loc} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No destinations found matching your criteria.
                  </div>
                )}
              </Suspense>
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="w-full md:w-80 space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Feature Live Weather for Shimla (Capital) */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">Weather Updates</h3>
                <WeatherWidget lat={31.1048} lng={77.1734} name="Shimla" />
                <WeatherWidget lat={32.2396} lng={77.1887} name="Manali" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Destinations Section */}
        <div className="space-y-8 pt-12 border-t">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Featured Destinations</h2>
            <p className="text-muted-foreground">Explore our hand-picked highlights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOCATIONS.slice(0, 3).map((loc) => {
              const mapsLink = `https://www.google.com/maps/search/${encodeURIComponent(loc.name)}/@${loc.coordinates.lat},${loc.coordinates.lng},12z`;
              return (
                <a key={loc.id} href={mapsLink} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="relative aspect-video overflow-hidden rounded-xl hover:shadow-xl transition-all">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                      <h3 className="text-2xl font-bold group-hover:translate-x-1 transition-transform">{loc.name}</h3>
                      <p className="text-sm text-white/90 group-hover:translate-x-1 transition-transform">{loc.description}</p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black p-2 rounded-full">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage}
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background to-background/80" />
        <div className="relative container space-y-8 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Need Help Planning?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our experts can help you craft the perfect Himachal itinerary based on your preferences.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
