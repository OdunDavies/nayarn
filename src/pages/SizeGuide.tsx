import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Ruler, Sparkles } from "lucide-react";

const womensSizes = [
  { size: "XS", bust: "32-33", waist: "24-25", hips: "34-35" },
  { size: "S", bust: "34-35", waist: "26-27", hips: "36-37" },
  { size: "M", bust: "36-37", waist: "28-29", hips: "38-39" },
  { size: "L", bust: "38-40", waist: "30-32", hips: "40-42" },
  { size: "XL", bust: "41-43", waist: "33-35", hips: "43-45" },
  { size: "XXL", bust: "44-46", waist: "36-38", hips: "46-48" },
];

const mensSizes = [
  { size: "S", chest: "34-36", waist: "28-30", hips: "34-36" },
  { size: "M", chest: "38-40", waist: "32-34", hips: "38-40" },
  { size: "L", chest: "42-44", waist: "36-38", hips: "42-44" },
  { size: "XL", chest: "46-48", waist: "40-42", hips: "46-48" },
  { size: "XXL", chest: "50-52", waist: "44-46", hips: "50-52" },
];

const measurementGuide = [
  {
    name: "Bust/Chest",
    instruction: "Measure around the fullest part of your bust/chest, keeping the tape parallel to the floor."
  },
  {
    name: "Waist",
    instruction: "Measure around your natural waistline, which is the narrowest part of your torso."
  },
  {
    name: "Hips",
    instruction: "Measure around the fullest part of your hips, about 8 inches below your waist."
  },
  {
    name: "Length",
    instruction: "For tops, measure from the highest point of your shoulder to your desired length. For bottoms, measure from your waist to your desired length."
  }
];

const SizeGuide = () => {
  return (
    <>
      <Helmet>
        <title>Size Guide | NaYarn</title>
        <meta name="description" content="Find your perfect fit with NaYarn's comprehensive size guide. Custom measurements available for all handcrafted pieces." />
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
            <h1 className="luxury-heading text-4xl md:text-5xl mb-6">Size Guide</h1>
            <p className="text-muted-foreground text-lg">
              Our pieces are designed for a relaxed, comfortable fit. Use this guide to find your perfect size, 
              or opt for custom measurements for a truly personalized piece.
            </p>
          </motion.div>
        </section>

        {/* Custom Measurements CTA */}
        <section className="luxury-container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center"
          >
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="luxury-heading text-2xl mb-3">Custom Measurements Available</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every NaYarn piece is made to order. For the perfect fit, select "Custom Size" at checkout 
              and provide your exact measurements. Our artisans will craft your piece to your specifications.
            </p>
          </motion.div>
        </section>

        {/* How to Measure */}
        <section className="luxury-container mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Ruler className="w-6 h-6 text-primary" />
              <h2 className="luxury-heading text-2xl">How to Measure</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {measurementGuide.map((item, index) => (
                <div key={index} className="bg-muted/20 rounded-lg p-6">
                  <h3 className="font-display text-lg mb-2">{item.name}</h3>
                  <p className="text-muted-foreground text-sm">{item.instruction}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 border border-border rounded-lg">
              <h3 className="font-medium mb-3">Tips for Accurate Measurements</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Use a soft measuring tape, not a metal one
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Measure over your undergarments for the most accurate fit
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Keep the tape snug but not tight
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  Ask a friend to help for the most precise measurements
                </li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Women's Size Chart */}
        <section className="luxury-container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="luxury-heading text-2xl mb-8">Women's Sizes</h2>
            <p className="text-muted-foreground mb-6">All measurements in inches</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-medium">Size</th>
                    <th className="text-left py-4 px-4 font-medium">Bust</th>
                    <th className="text-left py-4 px-4 font-medium">Waist</th>
                    <th className="text-left py-4 px-4 font-medium">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  {womensSizes.map((row, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{row.size}</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.bust}"</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.waist}"</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.hips}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* Men's Size Chart */}
        <section className="luxury-container mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <h2 className="luxury-heading text-2xl mb-8">Men's Sizes</h2>
            <p className="text-muted-foreground mb-6">All measurements in inches</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-medium">Size</th>
                    <th className="text-left py-4 px-4 font-medium">Chest</th>
                    <th className="text-left py-4 px-4 font-medium">Waist</th>
                    <th className="text-left py-4 px-4 font-medium">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  {mensSizes.map((row, index) => (
                    <tr key={index} className="border-b border-border/50">
                      <td className="py-4 px-4 font-medium">{row.size}</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.chest}"</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.waist}"</td>
                      <td className="py-4 px-4 text-muted-foreground">{row.hips}"</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>

        {/* Crochet Stretch Note */}
        <section className="luxury-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-muted/30 rounded-lg p-8"
          >
            <h2 className="luxury-heading text-xl mb-4">About Crochet Fit</h2>
            <p className="text-muted-foreground">
              Crochet fabric has natural stretch and flexibility. Our 100% acrylic yarn pieces offer 
              a comfortable, forgiving fit that moves with your body. If you're between sizes, we 
              recommend sizing down for a more fitted look or sizing up for an oversized, relaxed style. 
              For custom measurements, we add ease for comfort while maintaining the intended silhouette.
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SizeGuide;
