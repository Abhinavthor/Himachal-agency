import { useState, useMemo, Suspense, lazy } from "react";
import { LOCATIONS, CATEGORIES, type Category } from "@/data/locations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WeatherWidget } from "@/components/WeatherWidget";
import { ContactForm } from "@/components/ContactForm";

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
        <div className="absolute inset-0 z-0 bg-black/40" />
        <img 
          src="https://th.bing.com/th/id/OIP.uqbJO_Wb6F1X9xKCo9kn-AHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
          alt="Himachal Mountains" 
          className="absolute inset-0 z-[-1] object-cover w-full h-full"
        />
        <div className="z-10 text-center px-4 max-w-3xl space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-md">
            Discover Himachal
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
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
      </section>

      {/* Contact Section */}
      <section className="bg-muted py-16">
        <div className="container space-y-8 text-center">
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
