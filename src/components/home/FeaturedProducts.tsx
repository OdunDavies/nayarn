import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";

const featuredProducts = products.slice(0, 4);

const FeaturedProducts = () => {
  return (
    <section className="py-20 lg:py-28 bg-cream-dark">
      <div className="luxury-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-14"
        >
          <div>
            <p className="luxury-subheading mb-3">New Arrivals</p>
            <h2 className="luxury-heading text-3xl lg:text-4xl">Featured Pieces</h2>
          </div>
          <Button variant="luxury-outline" asChild>
            <Link to="/shop">View All</Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/shop/product/${product.id}`} className="block">
                <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-foreground text-background text-[10px] tracking-widest uppercase px-3 py-1">
                      New
                    </span>
                  )}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <Button variant="luxury" className="w-full" size="sm">
                      Quick Add
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground tracking-widest uppercase mb-1">
                    {product.category.replace("-", " ")}
                  </p>
                  <h3 className="font-serif text-lg mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground">${product.price}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
