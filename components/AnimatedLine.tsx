import clsx from "clsx";
import { m } from "framer-motion";

export const AnimatedLine = ({ className }: { className?: string }) => (
  <m.div
    className={clsx("h-[1px] bg-black", className)}
    initial={{ width: "0%" }}
    whileInView={{ width: "100%" }}
    transition={{ duration: 1.2, type: "spring", bounce: 0 }}
    viewport={{ once: true }}
  />
);
