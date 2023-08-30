import { m } from "framer-motion";

export const AnimatedLine = () => (
  <m.div
    className="h-[1px] bg-black"
    initial={{ width: "0%" }}
    whileInView={{ width: "100%" }}
    transition={{ duration: 1.2, type: "spring", bounce: 0 }}
    viewport={{ once: true }}
  />
);
