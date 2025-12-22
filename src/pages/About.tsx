import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-crochet.jpg";
import productDress from "@/assets/product-dress.jpg";

const About = () => {
  return (
    <>
      <Helmet>
        <title>Our Story | NaYarn - Luxury Handmade Crochet Fashion</title>
        <meta
          name="description"
          content="Discover the story behind NaYarn. Learn about our dedication to handmade craftsmanship, sustainable practices, and the art of crochet fashion."
        />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-32 lg:py-48">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="NaYarn craftsmanship"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/50" />
          </div>
          <div className="relative luxury-container text-center text-background">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs tracking-widest uppercase mb-4 text-background/80"
            >
              Our Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl lg:text-6xl tracking-tight"
            >
              Art to Wear
            </motion.h1>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 lg:py-28">
          <div className="luxury-container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg lg:text-xl text-muted-foreground leading-relaxed"
              >
                NaYarn was born from a passion for handmade craftsmanship and a desire to 
                celebrate the art of crochet. In a world of fast fashion, we believe in 
                slowing down, in the beauty of imperfection, and in creating pieces that 
                are as unique as the individuals who wear them.
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={productDress}
                    alt="Crochet craftsmanship detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="luxury-heading text-3xl lg:text-4xl mb-6">
                  Every Stitch Tells a Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Each NaYarn piece begins as a vision and transforms through 
                    countless hours of meticulous handwork. Our artisans bring 
                    decades of experience and genuine passion to every creation.
                  </p>
                  <p>
                    We use only premium 100% acrylic yarn, carefully selected for 
                    its softness, durability, and beautiful drape. The result is 
                    garments that feel as luxurious as they look.
                  </p>
                  <p>
                    From the first loop to the final stitch, every piece takes 
                    between 20 to 80 hours to complete. This dedication to craft 
                    ensures that each garment is not just clothing, but wearable art.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-28 bg-cream-dark">
          <div className="luxury-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="luxury-subheading mb-3">Our Values</p>
              <h2 className="luxury-heading text-3xl lg:text-4xl">What We Stand For</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Handmade Excellence",
                  description:
                    "Every piece is crafted by hand, ensuring the highest quality and attention to detail. No two pieces are exactly alike.",
                },
                {
                  title: "Slow Fashion",
                  description:
                    "We reject the disposable culture of fast fashion. Our pieces are made to last, both in style and construction.",
                },
                {
                  title: "Individual Expression",
                  description:
                    "We celebrate uniqueness. Our made-to-order approach means each piece is tailored to your measurements.",
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 border border-foreground/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="font-serif text-2xl">{index + 1}</span>
                  </div>
                  <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28">
          <div className="luxury-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto"
            >
              <h2 className="luxury-heading text-3xl lg:text-4xl mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="text-muted-foreground mb-10">
                Explore our collection of handmade crochet pieces and find something 
                as unique as you are.
              </p>
              <Button variant="luxury" size="xl" asChild>
                <Link to="/shop">Explore Collection</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
