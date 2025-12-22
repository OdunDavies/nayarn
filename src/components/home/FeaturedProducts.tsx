import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import productDress from "@/assets/product-dress.jpg";
import productSweater from "@/assets/product-sweater.jpg";
import productBeach from "@/assets/product-beach.jpg";
import productAccessories from "@/assets/product-accessories.jpg";

const products = [
  {
    id: 1,
    name: "Ivory Lace Maxi Dress",
    price: 285,
    image: productDress,
    category: "Dresses",
    isNew: true,
  },
  {
    id: 2,
    name: "Terracotta Cable Sweater",
    price: 195,
    image: productSweater,
    category: "Sweaters",
    isNew: true,
  },
  {
    id: 3,
    name: "Coastal Cover-Up Set",
    price: 165,
    image: productBeach,
    category: "Beach Wear",
    isNew: false,
  },
  {
    id: 4,
    name: "Sage Macramé Bag",
    price: 125,
    image: productAccessories,
    category: "Accessories",
    isNew: false,
  },
];

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
          {products.map((product, index) => (
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
                    {product.category}
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
