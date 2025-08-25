import React from "react";
import { motion } from "framer-motion";
import HeroSection from "../components/features/home/HeroSection";
import EventSection from "../components/features/home/EventSection";
import TrainingSection from "../components/features/home/TrainingSection";
import NewsSection from "../components/features/home/NewsSection";
import CommunitySection from "../components/features/home/CommunitySection";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          <motion.div
            className="lg:col-span-2 h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <EventSection />
          </motion.div>
          <motion.div
            className="lg:col-span-2 h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <HeroSection />
          </motion.div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
          >
            <TrainingSection />
            <CommunitySection />
          </motion.div>
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <NewsSection />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
