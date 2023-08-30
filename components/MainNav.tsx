"use client";

import { Contact, Navigation, Setting } from "@/types/cms";
import slateToHtml from "@/utils/slateToHtml";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface MainNavProps {
  siteBranding: Setting["siteBranding"];
  navItems: Navigation["topNavigation"];
  contactLink: Navigation["contactLink"];
  contact: Contact;
  altBrandingColour?: boolean;
  fullWidth?: boolean;
}

const CloseIcon = () => (
  <svg
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 5L5 1M1 1L5 5"
      stroke="#030303"
      strokeWidth="0.5"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);

const MenuIcon = () => (
  <div className="grid grid-cols-2 gap-[3px]">
    <div className="h-[2px] w-[2px] rounded-full bg-black" />
    <div className="h-[2px] w-[2px] rounded-full bg-black" />
    <div className="h-[2px] w-[2px] rounded-full bg-black" />
    <div className="h-[2px] w-[2px] rounded-full bg-black" />
  </div>
);

const modalVariants = {
  hidden: {
    y: "-50px",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: "easeInOut",
    },
  },
  exit: {
    y: "50px",
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const navLinkStyles =
  "text-medium grid h-9 place-content-center rounded-full border border-[#E1E1E1] bg-white/50 backdrop-blur-md px-4 hover:border-gray-400";

export default function MainNav({
  siteBranding,
  navItems,
  contactLink,
  contact,
  altBrandingColour,
  fullWidth = false,
}: MainNavProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={clsx(
        "!fixed left-0 top-0 inset-x-0 z-10 mx-auto flex justify-between gap-8 py-4 sm:py-7",
        fullWidth ? "cont-fluid max-w-full" : "cont"
      )}
    >
      <Link
        href="/"
        className={`grid place-content-center text-lg font-semibold tracking-tighter ${
          altBrandingColour ? "text-white" : ""
        }`}
      >
        {siteBranding}
      </Link>
      <nav className="flex gap-2">
        {(navItems ?? []).map((item) => (
          <Link
            key={item.id}
            href={item.url}
            target={item.newTab ? "_blank" : ""}
            className={clsx(navLinkStyles, {
              hidden: item.hide,
              "!bg-transparent text-white !border-none shadow-[0_0_0_1px_white] hover:shadow-[0_0_0_1px_#9ca3af] transition-all":
                altBrandingColour,
            })}
          >
            {item.label}
          </Link>
        ))}
        {/* <Link
          className={clsx(navLinkStyles, "w-9 cursor-pointer !px-0")}
          href="/"
        >
          <MenuIcon />
        </Link> */}
        {!contactLink.hide && (
          <div
            className={clsx("cursor-pointer", navLinkStyles, {
              "!bg-transparent text-white !border-none shadow-[0_0_0_1px_white] hover:shadow-[0_0_0_1px_#9ca3af] transition-all":
                altBrandingColour,
            })}
            onClick={() =>
              modalOpen ? setModalOpen(false) : setModalOpen(true)
            }
          >
            {contactLink.label}
          </div>
        )}
      </nav>

      <AnimatePresence initial={false} mode="wait">
        {modalOpen && (
          <motion.div
            className="absolute right-5 top-20 w-[155px] rounded-2xl border border-[#E1E1E1] bg-white/50 p-4 backdrop-blur-md"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="absolute right-2 top-2 grid h-5 w-5 cursor-pointer place-content-center rounded-full bg-white"
              onClick={() => setModalOpen(false)}
            >
              <CloseIcon />
            </div>
            {/* <h5 className="my-1 text-base">{contact.heading}</h5> */}
            <div
              className="mb-3 pr-2 [&_p]:text-smaller [&_p]:leading-tightest [&_p]:tracking-tight"
              dangerouslySetInnerHTML={slateToHtml(contact.description)}
            />
            <nav className="">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
