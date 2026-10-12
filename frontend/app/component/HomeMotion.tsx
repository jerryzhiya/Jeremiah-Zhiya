'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type HomeMotionVariant = 'hero-copy' | 'profile-card' | 'resume-card';

type HomeMotionProps = {
  variant: HomeMotionVariant;
  className: string;
  children: ReactNode;
};

export default function HomeMotion({ variant, className, children }: HomeMotionProps) {
  if (variant === 'hero-copy') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  if (variant === 'profile-card') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
