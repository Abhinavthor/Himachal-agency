import { MountainSnow } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-primary/10 to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <MountainSnow className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">Himachal</span>
            <span className="text-xs text-muted-foreground">Explore</span>
          </div>
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
