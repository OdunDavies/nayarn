import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useShopCollections } from "@/hooks/useShopData";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen } from "lucide-react";

// Fallback images for collections without images
import productDress from "@/assets/product-dress.jpg";
import productSweater from "@/assets/product-sweater.jpg";
import productBeach from "@/assets/product-beach.jpg";
import productAccessories from "@/assets/product-accessories.jpg";

const fallbackImages = [productDress, productSweater, productBeach, productAccessories];

const Categories = () => {
  const { data: collections, isLoading } = useShopCollections();

  // Show first 4 collections or fallback static categories if no collections
  const displayCollections = collections?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28">
        <div className="luxury-container">
          <div className="text-center mb-14">
            <p className="luxury-subheading mb-3">Explore</p>
            <h2 className="luxury-heading text-3xl lg:text-4xl">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If no collections in database, don't show the section
  if (displayCollections.length === 0) {
    return null;
  }

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
          {displayCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/shop/${collection.slug}`}
                className="group block relative overflow-hidden aspect-[3/4]"
              >
                {collection.image_url ? (
                  <img
                    src={collection.image_url}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <img
                      src={fallbackImages[index % fallbackImages.length]}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {collection.description && (
                    <p className="text-background/80 text-xs tracking-widest uppercase mb-1">
                      {collection.description}
                    </p>
                  )}
                  <h3 className="text-background font-serif text-2xl">
                    {collection.name}
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
