import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import productDress from "@/assets/product-dress.jpg";
import productSweater from "@/assets/product-sweater.jpg";
import productBeach from "@/assets/product-beach.jpg";
import productAccessories from "@/assets/product-accessories.jpg";

const categories = [
  {
    name: "Dresses",
    description: "Elegant silhouettes",
    image: productDress,
    href: "/shop/dresses",
  },
  {
    name: "Sweaters",
    description: "Cozy essentials",
    image: productSweater,
    href: "/shop/sweaters",
  },
  {
    name: "Beach Wear",
    description: "Sun-kissed pieces",
    image: productBeach,
    href: "/shop/beach-wear",
  },
  {
    name: "Accessories",
    description: "Finishing touches",
    image: productAccessories,
    href: "/shop/accessories",
  },
];

const Categories = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="luxury-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="luxury-subheading mb-3">Explore</p>
          <h2 className="luxury-heading text-3xl lg:text-4xl">Shop by Category</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={category.href}
                className="group block relative overflow-hidden aspect-[3/4]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <p className="text-background/80 text-xs tracking-widest uppercase mb-1">
                    {category.description}
                  </p>
                  <h3 className="text-background font-serif text-2xl">
                    {category.name}
                  </h3>
                </div>
                <div className="absolute inset-0 border border-background/0 group-hover:border-background/20 transition-all duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
