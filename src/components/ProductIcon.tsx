import {
  Bridge,
  Building2,
  HardHat,
  House,
  PaintRoller,
  Shovel,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  dscr: House,
  bridge: Bridge,
  "fix-and-flip": PaintRoller,
  "ground-up": Shovel,
  "mid-construction": HardHat,
  "commercial-dscr": Building2,
};

export function ProductIcon({ slug, ...props }: { slug: string } & LucideProps) {
  const Icon = icons[slug] ?? House;
  return <Icon aria-hidden="true" {...props} />;
}
