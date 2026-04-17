import { useState } from "react";
import type { Location } from "@/data/locations";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MapPin, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = location.images && location.images.length > 0 ? location.images : [location.image];
  const mapsLink = `https://www.google.com/maps/search/${encodeURIComponent(location.name)}/@${location.coordinates.lat},${location.coordinates.lng},12z`;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card className="group overflow-hidden transition-all hover:shadow-xl h-full cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={`${location.name} - ${currentImageIndex + 1}`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          
          {/* Category Badge */}
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
            {location.category}
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Navigation Arrows (only show if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white p-2 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white p-2 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* External Link Icon */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white p-2 rounded-full">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors">
            <MapPin className="w-5 h-5 text-primary" />
            {location.name}
          </CardTitle>
          <CardDescription>{location.description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  );
}
