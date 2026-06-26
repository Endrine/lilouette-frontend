import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { products, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import heroImage from "@/assets/hero-portrait.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lilouette — Statement Earrings" },
      { name: "description", content: "Lilouette is a small jewelry studio offering sculptural gold and pearl earrings, curated in small batches." },
      { property: "og:title", content: "Lilouette — Statement Earrings" },
      { property: "og:description", content: "Sculptural, romantic earrings made to be worn every day." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products;
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <p className="text-xs tracking-[0.3em] uppercase text-accent">Earrings · Curated in small batches</p>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground">
              Sculpted gold,<br/>
              <em className="italic text-accent">worn with love.</em>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              Lilouette is a tiny studio offering statement earrings — golden, pearl and enamel pieces made to be treasured.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-7 py-3 text-sm tracking-wide text-background transition-all hover:bg-accent hover:shadow-[var(--shadow-soft)]"
              >
                Shop now
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                Say hello
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-[var(--blush)]/40 blur-2xl" aria-hidden />
            <img
              src={heroImage.url}
              alt="Lilouette gold square earring worn in a black and white portrait"
              width={1200}
              height={1500}
              className="relative rounded-[1.5rem] shadow-[var(--shadow-soft)] object-cover aspect-[4/5] w-full"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-accent mb-3">Newly added</p>
            <h2 className="font-display text-4xl md:text-5xl">A few favorites</h2>
          </div>
          <Link to="/products" className="hidden md:inline text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
            View all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featured.map((p) => (
            <FeaturedCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="bg-secondary/40 mt-10">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center space-y-5">
          <p className="text-xs tracking-[0.3em] uppercase text-accent">Our story</p>
          <h2 className="font-display text-3xl md:text-4xl leading-snug">
            Thoughtfully curated pieces, chosen the way we love to wear them.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Soft, simple, and yours to keep close — jewelry made to layer with every day.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}

function FeaturedCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();
  return (
    <article className="group">
      <div className="overflow-hidden rounded-2xl bg-secondary aspect-square">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="pt-4 flex items-baseline justify-between">
        <h3 className="font-display text-xl">{product.name}</h3>
        <span className="text-sm text-muted-foreground">${product.price}</span>
      </div>
      <button
        onClick={() => {
          addItem(product);
          toast.success(`${product.name} added to your bag`);
          openCart();
        }}
        className="mt-3 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
      >
        Add to bag
      </button>
    </article>
  );
}
