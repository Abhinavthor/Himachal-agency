export type Category = "All" | "Treks" | "Temples" | "Hill Stations" | "Valleys";

export interface Location {
  id: string;
  name: string;
  category: Category;
  image: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const CATEGORIES: Category[] = ["All", "Treks", "Temples", "Hill Stations", "Valleys"];

export const LOCATIONS: Location[] = [
  {
    id: "shimla",
    name: "Shimla",
    category: "Hill Stations",
    image: "https://images.unsplash.com/photo-1596783060593-c454794e5eef?auto=format&fit=crop&q=80&w=1200",
    description: "The Queen of Hills with its colonial architecture and bustling Ridge.",
    coordinates: { lat: 31.1048, lng: 77.1734 },
  },
  {
    id: "kheerganga",
    name: "Kheerganga Trek",
    category: "Treks",
    image: "https://images.unsplash.com/photo-1616788509376-79ba5af85ae2?auto=format&fit=crop&q=80&w=1200",
    description: "A beautiful trek through Parvati Valley terminating at natural hot springs.",
    coordinates: { lat: 31.9933, lng: 77.4439 },
  },
  {
    id: "hadimba",
    name: "Hadimba Temple",
    category: "Temples",
    image: "https://images.unsplash.com/photo-1600705030275-5fefdd4f2f09?auto=format&fit=crop&q=80&w=1200",
    description: "Ancient cave temple dedicated to Hidimbi Devi, surrounded by a cedar forest in Manali.",
    coordinates: { lat: 32.2464, lng: 77.1824 },
  },
  {
    id: "spiti",
    name: "Spiti Valley",
    category: "Valleys",
    image: "https://images.unsplash.com/photo-1626082929543-6902f2befcf6?auto=format&fit=crop&q=80&w=1200",
    description: "A cold desert mountain valley located high in the Himalayas.",
    coordinates: { lat: 32.2461, lng: 78.0349 },
  },
  {
    id: "manali",
    name: "Manali",
    category: "Hill Stations",
    image: "https://images.unsplash.com/photo-1605649487212-4d4b1a457c3d?auto=format&fit=crop&q=80&w=1200",
    description: "A high-altitude Himalayan resort town known for backpacking and honeymoons.",
    coordinates: { lat: 32.2396, lng: 77.1887 },
  },
  {
    id: "triund",
    name: "Triund Trek",
    category: "Treks",
    image: "https://images.unsplash.com/photo-1542456424-ab550f757db2?auto=format&fit=crop&q=80&w=1200",
    description: "One of the most popular treks in Dharamshala offering majestic views of the Dhauladhar range.",
    coordinates: { lat: 32.2618, lng: 76.3533 },
  },
];
