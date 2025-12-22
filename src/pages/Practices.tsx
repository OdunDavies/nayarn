import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, Leaf, Users, Recycle, Hand, Sparkles } from "lucide-react";

const practices = [
  {
    icon: Hand,
    title: "Handcrafted Excellence",
    description: "Every NaYarn piece is crafted entirely by hand, stitch by stitch. We never use machines for our crochet work, ensuring each piece is truly unique with the subtle variations that make handmade items special.",
    details: [
      "20-60 hours of skilled work per garment",
      "Traditional crochet techniques passed down through generations",
      "Each piece inspected for quality before shipping"
    ]
  },
  {
    icon: Users,
    title: "Supporting Artisans",
    description: "We work directly with talented crochet artisans, primarily women, providing fair wages and flexible working conditions that allow them to work from home while caring for their families.",
    details: [
      "Fair, above-market compensation for all artisans",
      "Flexible, family-friendly work arrangements",
      "Skills training and development programs"
    ]
  },
  {
    icon: Leaf,
    title: "Conscious Materials",
    description: "We carefully select our materials for quality, durability, and environmental impact. Our 100% acrylic yarn is chosen for its longevity, easy care, and accessibility.",
    details: [
      "High-quality, durable yarn that lasts for years",
      "Easy-care properties reduce water and energy use",
      "Exploring recycled yarn options for future collections"
    ]
  },
  {
    icon: Recycle,
    title: "Minimal Waste Production",
    description: "Our made-to-order model means we only create what's needed, eliminating the excess inventory that plagues fast fashion. Yarn scraps are repurposed into accessories and small items.",
    details: [
      "Zero overproduction through made-to-order system",
      "Yarn remnants upcycled into new products",
      "Minimal packaging waste"
    ]
  }
];

const Practices = () => {
  return (
    <>
      <Helmet>
        <title>Our Practices | NaYarn</title>
        <meta name="description" content="Learn about NaYarn's commitment to ethical production, skilled artisans, and sustainable fashion practices." />
      </Helmet>

      <Header />

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="luxury-container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="luxury-heading text-4xl md:text-5xl mb-6">Our Practices</h1>
            <p className="text-muted-foreground text-lg">
              Fashion that honors both the maker and the wearer. Every decision we make 
              is guided by our commitment to craftsmanship, community, and consciousness.
            </p>
          </motion.div>
        </section>

        {/* Mission Statement */}
        <section className="luxury-container mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12 text-center"
          >
            <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="luxury-heading text-2xl md:text-3xl mb-4">Made with Intention</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              In a world of mass production, we choose the slower path. Every NaYarn piece 
              represents hours of dedicated craftsmanship, fair compensation for skilled artisans, 
              and a commitment to creating fashion that lasts.
            </p>
          </motion.div>
        </section>

        {/* Practices Grid */}
        <section className="luxury-container mb-20">
          <div className="space-y-16">
            {practices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.05 }}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <practice.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="luxury-heading text-2xl">{practice.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">{practice.description}</p>
                  <ul className="space-y-3">
                    {practice.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`bg-muted/20 rounded-lg aspect-square flex items-center justify-center ${
                  index % 2 === 1 ? "md:col-start-1" : ""
                }`}>
                  <practice.icon className="w-24 h-24 text-primary/20" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Packaging Section */}
        <section className="luxury-container mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div className="bg-foreground text-background rounded-lg p-8 md:p-12">
              <Sparkles className="w-10 h-10 mb-6" />
              <h2 className="font-display text-2xl mb-4">Thoughtful Packaging</h2>
              <p className="text-background/80 mb-6">
                Your NaYarn piece arrives in packaging designed to protect your garment 
                while minimizing environmental impact.
              </p>
              <ul className="space-y-3 text-background/70">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-background/40" />
                  Recycled and recyclable materials
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-background/40" />
                  Tissue paper from sustainable sources
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-background/40" />
                  Reusable cotton dust bag included
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-background/40" />
                  No single-use plastics
                </li>
              </ul>
            </div>

            <div>
              <h2 className="luxury-heading text-2xl mb-6">Our Ongoing Commitments</h2>
              <p className="text-muted-foreground mb-6">
                We're always looking for ways to improve. Here's what we're working toward:
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Recycled Yarn Collection",
                    status: "In Development",
                    description: "Exploring partnerships for recycled acrylic yarn"
                  },
                  {
                    title: "Carbon Neutral Shipping",
                    status: "Coming 2025",
                    description: "Offsetting emissions from all deliveries"
                  },
                  {
                    title: "Artisan Cooperative",
                    status: "Planning Phase",
                    description: "Helping artisans gain ownership stake in the brand"
                  }
                ].map((commitment, index) => (
                  <div key={index} className="border border-border rounded-lg p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">{commitment.title}</h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {commitment.status}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm">{commitment.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Join Us CTA */}
        <section className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-muted/30 rounded-lg p-8 text-center"
          >
            <h2 className="luxury-heading text-xl mb-4">Join the Movement</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              When you choose NaYarn, you're choosing slow fashion, supporting artisans, 
              and investing in a garment that will last. Thank you for being part of our story.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Practices;
