"use client";

import { bottomInY, rightLeft, rightLeftContainer } from "@/utils/variants";
import { Footer, Image } from "@/types/cms";
import ImageKit from "./ImageKit";
import clsx from "clsx";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";

export default function Footer({
  bottomTitle,
  contact,
  socialMediaLinks,
}: Footer) {
  const { text, title, image, contactButton } = contact;

  return (
    <LazyMotion features={domAnimation}>
      <footer
        data-theme="dark"
        className="w-full bg-black flex items-center justify-center pt-16 pb-24"
      >
        <div className="container">
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
                {title}
              </m.h2>
              <m.p
                variants={bottomInY()}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="max-w-md text-lg mb-6"
              >
                {text}
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
              <a
                href={contactButton.link}
                target={contactButton.newTab ? "_blank" : "_self"}
              >
                <button
                  className={clsx(
                    "w-full rounded-full text-lg font-medium py-6 border-2 border-white/90",
                    "hover:border-white transition-all"
                  )}
                >
                  {contactButton.label}
                </button>
              </a>
            </m.div>
          </div>

          {/* bottom */}
          <div className="flex flex-col w-full text-white">
            <m.ul
              variants={rightLeftContainer(0, 0.1, "50px")}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col mb-4"
            >
              {socialMediaLinks?.map(({ label, url, newTab, hide }, i) => {
                return (
                  !hide && (
                    <m.li key={i} variants={rightLeft(0, "50px")}>
                      <Link
                        href={url}
                        target={newTab ? "_blank" : "_self"}
                        className={clsx(
                          "text-lg text-white/90 tracking-[-0.48px] leading-none",
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
            <m.div
              variants={bottomInY()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <m.h3 className="w-full text-center text-[54px] sm:text-9xl lg:text-[160px]">
                {bottomTitle}
              </m.h3>
            </m.div>
          </div>
        </div>
      </footer>
    </LazyMotion>
  );
}
