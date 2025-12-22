import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-crochet.jpg";

const BrandStory = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="luxury-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={heroImage}
                alt="Artisan crafting crochet"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-border -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="luxury-subheading mb-4">Our Philosophy</p>
            <h2 className="luxury-heading text-3xl lg:text-4xl xl:text-5xl mb-6">
              Art to Wear
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                At NaYarn, we believe that fashion should be as unique as you are. 
                Each piece in our collection is meticulously handcrafted, taking 
                anywhere from 20 to 80 hours to complete.
              </p>
              <p>
                Using only premium 100% acrylic yarn, our artisans pour their 
                expertise and passion into every stitch, creating garments that 
                are not just clothing, but wearable art.
              </p>
              <p>
                We celebrate slow fashion, individuality, and the timeless beauty 
                of crochet craftsmanship. Every piece is made to order, ensuring 
                a perfect fit tailored to your measurements.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              <div>
                <p className="font-serif text-3xl lg:text-4xl text-primary mb-1">20+</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                  Hours per piece
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl text-primary mb-1">100%</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                  Handmade
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl lg:text-4xl text-primary mb-1">Made</p>
                <p className="text-xs tracking-widest uppercase text-muted-foreground">
                  To order
                </p>
              </div>
            </div>

            <Button variant="luxury-outline" size="lg" asChild>
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
