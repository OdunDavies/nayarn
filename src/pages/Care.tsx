import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Droplets, Wind, Archive, Scissors, ThermometerSun, Heart } from "lucide-react";

const careSteps = [
  {
    icon: Droplets,
    title: "Hand Wash Only",
    description: "Gently hand wash in cool water (30°C/86°F or below) with a mild detergent. Avoid rubbing or wringing the fabric.",
    tips: [
      "Use a gentle, pH-neutral detergent",
      "Soak for no more than 15 minutes",
      "Gently squeeze water through the fabric",
      "Never twist or wring the garment"
    ]
  },
  {
    icon: Wind,
    title: "Drying",
    description: "Lay flat on a clean, dry towel and reshape while damp. Never hang or tumble dry crochet pieces.",
    tips: [
      "Roll in a towel to remove excess water",
      "Lay flat on a mesh drying rack or towel",
      "Reshape to original dimensions while damp",
      "Dry away from direct sunlight and heat"
    ]
  },
  {
    icon: Archive,
    title: "Storage",
    description: "Store folded in a cool, dry place. Avoid hanging to prevent stretching and distortion.",
    tips: [
      "Fold neatly, don't hang on hangers",
      "Store in breathable cotton bags",
      "Use lavender sachets to deter moths",
      "Keep away from direct sunlight"
    ]
  },
  {
    icon: ThermometerSun,
    title: "Ironing & Steaming",
    description: "Use a steamer or iron on low heat with a pressing cloth. Never apply direct heat to the yarn.",
    tips: [
      "Use lowest heat setting if ironing",
      "Always use a pressing cloth between iron and garment",
      "Steaming is preferred and safer",
      "Work in sections, don't press too hard"
    ]
  }
];

const Care = () => {
  return (
    <>
      <Helmet>
        <title>Care Instructions | NaYarn</title>
        <meta name="description" content="Learn how to care for your handcrafted NaYarn crochet pieces to ensure they last for years to come." />
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
            <h1 className="luxury-heading text-4xl md:text-5xl mb-6">Care Instructions</h1>
            <p className="text-muted-foreground text-lg">
              Your NaYarn piece was crafted with love and care. With proper maintenance, 
              it will remain beautiful for years to come.
            </p>
          </motion.div>
        </section>

        {/* Care Love Note */}
        <section className="luxury-container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center"
          >
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="luxury-heading text-2xl mb-3">Made with Love, Care with Love</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each stitch in your garment represents hours of dedicated craftsmanship. 
              Taking a few extra minutes for proper care ensures your piece maintains its beauty 
              and the artisan's work is honored for years to come.
            </p>
          </motion.div>
        </section>

        {/* Care Steps */}
        <section className="luxury-container mb-20">
          <div className="space-y-12">
            {careSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.05 }}
                className="grid md:grid-cols-[1fr,2fr] gap-8 items-start"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="luxury-heading text-xl">{step.title}</h2>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                <div className="bg-muted/20 rounded-lg p-6">
                  <h3 className="font-medium mb-4 text-sm uppercase tracking-wider">Tips</h3>
                  <ul className="space-y-3">
                    {step.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pilling Section */}
        <section className="luxury-container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid md:grid-cols-2 gap-12"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Scissors className="w-6 h-6 text-primary" />
                <h2 className="luxury-heading text-2xl">Handling Pilling</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Some pilling is natural with yarn garments, especially in areas of friction. 
                Here's how to keep your piece looking fresh:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Use a fabric shaver or sweater stone gently
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Remove pills after washing when fabric is dry
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Avoid rough surfaces that cause friction
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Never pull pills off – always cut or shave them
                </li>
              </ul>
            </div>

            <div className="bg-foreground text-background rounded-lg p-8">
              <h3 className="font-display text-xl mb-4">What to Avoid</h3>
              <ul className="space-y-4">
                {[
                  "Machine washing or drying",
                  "Bleach or harsh chemicals",
                  "Hanging wet garments",
                  "Direct sunlight when drying",
                  "Wringing or twisting",
                  "High heat ironing"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-background/80">
                    <span className="w-5 h-5 rounded-full border border-background/40 flex items-center justify-center text-xs">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Quick Reference */}
        <section className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-muted/30 rounded-lg p-8"
          >
            <h2 className="luxury-heading text-xl mb-6">Quick Reference Symbols</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { symbol: "🧺", label: "Hand Wash Only" },
                { symbol: "❄️", label: "Cold Water" },
                { symbol: "↔️", label: "Lay Flat to Dry" },
                { symbol: "🔥", label: "No Tumble Dry" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <span className="text-3xl mb-2 block">{item.symbol}</span>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Care;
