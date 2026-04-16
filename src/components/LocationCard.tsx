import type { Location } from "@/data/locations";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { MapPin } from "lucide-react";

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={location.image}
          alt={location.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
          {location.category}
        </div>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {location.name}
        </CardTitle>
        <CardDescription>{location.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
