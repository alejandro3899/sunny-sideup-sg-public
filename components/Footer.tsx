import { Footer, Image } from "@/types/cms";
import ImageKit from "./ImageKit";
import clsx from "clsx";
import Link from "next/link";

export default function Footer({
  bottomTitle,
  contact,
  socialMediaLinks,
}: Footer) {
  return (
    <footer
      data-theme="dark"
      className="w-full bg-black flex items-center justify-center pt-16 pb-24"
    >
      <div className="container">
        {/* top */}
        <div className="flex flex-col font-sans text-white mb-16">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-4xl sm:text-8xl mb-4">{contact.title}</h2>
            <p className="max-w-md text-lg mb-6">{contact.text}</p>
            <ImageKit
              image={contact.image as Image}
              alt={(contact.image as Image)?.altText ?? "Contact"}
              width={200}
              height={200}
              className="object-fit"
            />
          </div>
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
        </div>

        {/* bottom */}
        <div className="flex flex-col w-full text-white">
          <ul className="flex flex-col mb-4">
            {socialMediaLinks?.map(({ label, url, newTab, hide }) => {
              return (
                !hide && (
                  <li>
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
                  </li>
                )
              );
            })}
          </ul>
          <h3 className="w-full text-center text-[54px] sm:text-9xl lg:text-[160px]">
            {bottomTitle}
          </h3>
        </div>
      </div>
    </footer>
  );
}
