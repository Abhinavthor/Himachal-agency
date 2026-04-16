import { MountainSnow } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <MountainSnow className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">Himachal Explore</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Destinations
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Weather
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
