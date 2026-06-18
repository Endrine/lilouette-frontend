import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import type { Product } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Lilouette" },
      { name: "description", content: "Browse Lilouette's collection of delicate handcrafted necklaces, earrings, rings and bracelets." },
      { property: "og:title", content: "Products — Lilouette" },
      { property: "og:description", content: "Delicate, romantic, handmade jewelry pieces." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-accent mb-4">The collection</p>
        <h1 className="font-display text-5xl md:text-6xl">Made to be loved</h1>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Every piece is handmade in small batches. Quietly beautiful, made to be layered and worn every single day.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to your bag`);
    openCart();
  };
  return (
    <article className="group flex flex-col">
      <div className="overflow-hidden rounded-2xl bg-secondary aspect-square mb-5">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="font-display text-2xl">{product.name}</h2>
        <span className="text-sm tracking-wide text-foreground">${product.price}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>
      <button
        onClick={handleAdd}
        className="mt-auto inline-flex items-center justify-center rounded-full border border-foreground/80 px-5 py-2.5 text-xs tracking-[0.2em] uppercase text-foreground transition-all hover:bg-foreground hover:text-background"
      >
        Add to bag
      </button>
    </article>
  );
}