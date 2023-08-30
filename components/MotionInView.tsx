"use client";

import { motion } from "framer-motion";

interface MotionInViewProps {
  children: React.ReactNode;
  variant: any;
}

export default function MotionInView({
  children,
  variant,
  ...props
}: MotionInViewProps) {
  return (
    <motion.h1
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.h1>
  );
}
