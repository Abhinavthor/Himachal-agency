export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 bg-muted/20 mt-12 w-full">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with React, Vite & Tailwind CSS. Showcase application for Himachal Tourism.
        </p>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Himachal Explore.
        </p>
      </div>
    </footer>
  );
}
