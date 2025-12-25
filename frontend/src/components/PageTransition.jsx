import React from 'react';
import { motion } from 'framer-motion';

// Define distinct animation variants
export const pageVariants = {
    fadeUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
        transition: { duration: 0.3, ease: "easeOut" }
    },
    slideRight: {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
        transition: { duration: 0.25, ease: "easeInOut" }
    },
    scaleUp: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 1.1 },
        transition: { duration: 0.25, ease: "easeOut" }
    },
    flip: {
        initial: { opacity: 0, rotateY: 90 },
        animate: { opacity: 1, rotateY: 0 },
        exit: { opacity: 0, rotateY: -90 },
        transition: { duration: 0.3 }
    }
};

const PageTransition = ({ children, variant = "fadeUp" }) => {
    const selectedVariant = pageVariants[variant] || pageVariants.fadeUp;

    return (
        <motion.div
            initial={selectedVariant.initial}
            animate={selectedVariant.animate}
            exit={selectedVariant.exit}
            transition={selectedVariant.transition}
            style={{ width: '100%', height: '100%' }} // Ensure full size
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
