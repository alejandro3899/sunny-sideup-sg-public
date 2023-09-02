import { delay } from "framer-motion";

export const baseTransition = { duration: 0.9, type: "spring", bounce: 0 };

export const sectionVariants = {
  hidden: { opacity: 0, y: "100px" },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const bottomInY = (delay?: number) => ({
  hidden: { opacity: 0, y: "80px", scale: 1.1 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...baseTransition,
      delay: delay ?? 0,
    },
  },
});

export const bottomIn = (delay?: number) => ({
  hidden: { opacity: 0, x: "80px", y: "80px", scale: 1.1 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      ...baseTransition,
      delay: delay ?? 0,
    },
  },
});

export const fadeIn = (delay?: number) => {
  const args = delay ? { delay: delay } : {};
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...baseTransition,
        ...args,
      },
    },
  };
};

export const rightLeftContainer = (
  delay?: number,
  stagger?: number,
  xOffset = "100px"
) => ({
  hidden: { opacity: 0, x: xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: stagger ?? 0.1,
      delayChildren: delay ?? 0,
    },
  },
});

export const rightLeft = (delay?: number, xOffset = "100px") => {
  const args = delay ? { delay: delay } : {};
  return {
    hidden: { opacity: 0, x: xOffset },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ...baseTransition,
        ...args,
      },
    },
  };
};
