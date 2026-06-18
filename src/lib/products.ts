import earringRuby from "@/assets/earring-ruby.png.asset.json";
import earringPearl from "@/assets/earring-pearl.png.asset.json";
import earringShell from "@/assets/earring-shell.png.asset.json";
import earringWave from "@/assets/earring-wave.png.asset.json";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "ruby-pebble",
    name: "Ruby Pebble Studs",
    description: "Organic pebble-shaped studs in deep ruby enamel, framed by a soft gold edge.",
    price: 64,
    image: earringRuby.url,
  },
  {
    id: "baroque-pearl",
    name: "Baroque Pearl Studs",
    description: "Lustrous baroque pearls cradled in hand-shaped gold — no two alike.",
    price: 88,
    image: earringPearl.url,
  },
  {
    id: "shell-stud",
    name: "Golden Shell Studs",
    description: "Sculpted gold shells inspired by quiet mornings by the sea.",
    price: 72,
    image: earringShell.url,
  },
  {
    id: "molten-wave",
    name: "Molten Wave Studs",
    description: "Polished, fluid gold studs that catch the light like a ripple of water.",
    price: 78,
    image: earringWave.url,
  },
];