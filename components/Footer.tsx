"use client";

import ImageKit from "./ImageKit";
import { bottomInY, rightLeft, rightLeftContainer } from "@/utils/variants";
import { Footer, Image } from "@/types/cms";
import clsx from "clsx";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Footer({
  bottomTitle,
  contact,
  socialMediaLinks,
}: Footer) {
  return (
    <LazyMotion features={domAnimation}>
      <footer
        data-theme="dark"
        className="w-full bg-black flex items-center justify-center pt-16 pb-24 overflow-hidden"
      >
        <div className="container overflow-hidden">
          {/* top */}
          <div className="flex flex-col font-sans text-white mb-16">
            <div className="flex flex-col items-center text-center">
              <m.h2
                variants={bottomInY()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-4xl sm:text-8xl mb-4"
              >
                {contact.title}
              </m.h2>
              <m.p
                variants={bottomInY()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-md text-lg mb-6"
              >
                {contact.text}
              </m.p>
              <m.div
                variants={bottomInY()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="w-full"
              >
                <ImageKit
                  image={contact.image as Image}
                  alt={(contact.image as Image)?.altText ?? "Contact"}
                  width={200}
                  height={200}
                  className="object-fit mx-auto"
                />
              </m.div>
            </div>
            <m.div
              variants={bottomInY()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link href="/">
                <button
                  className={clsx(
                    "w-full rounded-full text-lg font-medium py-6 border-2 border-white/90",
                    "hover:border-white transition-all"
                  )}
                >
                  {contact.contactButtonText}
                </button>
              </Link>
            </m.div>
          </div>

          {/* bottom */}
          <div className="flex flex-col w-full text-white">
            <m.ul
              variants={rightLeftContainer(0, 0.3, "50px")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col mb-4"
            >
              {socialMediaLinks?.map(({ label, url, newTab, hide }) => {
                return (
                  !hide && (
                    <m.li variants={rightLeft(0, "50px")}>
                      <Link
                        href={url}
                        target={newTab ? "_blank" : "_self"}
                        className={clsx(
                          "text-lg text-white/90",
                          "hover:text-white transition-all"
                        )}
                      >
                        {label}
                      </Link>
                    </m.li>
                  )
                );
              })}
            </m.ul>
            <m.h3
              variants={bottomInY()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full text-center text-[54px] sm:text-9xl lg:text-[160px]"
            >
              {bottomTitle}
            </m.h3>
          </div>
        </div>
      </footer>
    </LazyMotion>
  );
}
