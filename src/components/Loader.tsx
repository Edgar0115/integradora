// src/components/Loader.tsx
import React from "react";
import { motion } from "framer-motion";
import { BsTree } from "react-icons/bs";
import "./Loader.css";

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const itemVariants = {
  initial: { scale: 0.6, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const Loader: React.FC = () => {
  return (
    <div className="loader-container" role="alert" aria-busy="true" aria-live="polite">
      <div className="loader-wrapper">
        <motion.div
          className="loader-scene"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="pino"
              variants={itemVariants}
            >
              <BsTree size={50} color="#2e5339" />
            </motion.div>
          ))}
        </motion.div>
        <p className="loader-text">Cargando...</p>
      </div>
    </div>
  );
};

export default Loader;
