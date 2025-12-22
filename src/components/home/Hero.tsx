import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-crochet.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury handmade crochet dress"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative luxury-container py-20">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="luxury-subheading mb-4"
          >
            Winter 25 Collection
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="luxury-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6"
          >
            Crafted with Care,
            <br />
            <span className="italic">For You</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg mb-10 max-w-md"
          >
            Every stitch tells a story. Discover our collection of handmade 
            crochet pieces, crafted with hours of dedication and love.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="luxury" size="xl" asChild>
              <Link to="/shop">Explore Collection</Link>
            </Button>
            <Button variant="luxury-outline" size="xl" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase text-muted-foreground">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-foreground/30"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
