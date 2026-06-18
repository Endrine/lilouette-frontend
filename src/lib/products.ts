import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "pearl-drop-necklace",
    name: "Pearl Drop Necklace",
    description: "A single freshwater pearl suspended from a delicate gold chain. Quietly luminous.",
    price: 68,
    image: product1,
  },
  {
    id: "petite-hoops",
    name: "Petite Crystal Hoops",
    description: "Tiny gold hoops kissed with a single crystal. Made to be worn every day.",
    price: 42,
    image: product2,
  },
  {
    id: "stacking-rings",
    name: "Whisper Stacking Rings",
    description: "A set of three featherlight gold rings with hand-set stones.",
    price: 94,
    image: product3,
  },
  {
    id: "heart-bracelet",
    name: "Tiny Heart Bracelet",
    description: "A barely-there chain bracelet with a polished gold heart at the center.",
    price: 54,
    image: product4,
  },
  {
    id: "layered-charms",
    name: "Layered Charm Necklace",
    description: "Four gold chains, four little charms — layered and ready to wear.",
    price: 86,
    image: product5,
  },
  {
    id: "bloom-studs",
    name: "Bloom Stud Earrings",
    description: "Tiny flower studs in polished gold. A soft note for any occasion.",
    price: 38,
    image: product6,
  },
];