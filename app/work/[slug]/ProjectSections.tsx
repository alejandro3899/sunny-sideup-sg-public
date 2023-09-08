"use client";

import { Project, Image } from "@/types/cms";
import slateToHtml from "@/utils/slateToHtml";
import { sectionVariants } from "@/utils/variants";
import { domAnimation, LazyMotion, m } from "framer-motion";

export default function ProjectSections({ project }: { project: Project }) {
  const TextBlockSection = ({
    heading,
    content,
  }: {
    heading?: string;
    content?: {
      [k: string]: unknown;
    }[];
  }) => (
    <m.div
      className={
        !heading && !slateToHtml(content).__html ? "hidden md:block" : ""
      }
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h3 className="mb-2">{heading}</h3>
      <p dangerouslySetInnerHTML={slateToHtml(content)} />
    </m.div>
  );

  return (
    <LazyMotion features={domAnimation}>
      {(project?.sections ?? []).map((section: any) => {
        switch (section.blockType) {
          case "textBlock":
            return (
              <div
                key={section.id}
                className="grid gap-6 md:grid-cols-2 overflow-hidden"
              >
                <TextBlockSection
                  heading={section.leftColumn.heading}
                  content={section.leftColumn.content}
                />
                <TextBlockSection
                  heading={section.rightColumn.heading}
                  content={section.rightColumn.content}
                />
              </div>
            );
          case "imagesBlock":
            return (section?.images ?? []).map((image: any) => {
              const assetType = (image.image as Image).mimeType?.split("/")[0];
              return (
                <div  key={section.id! + image.id} className="overflow-hidden">
                  {assetType === "video" ? (
                    <m.video
                      src={(image.image as Image)?.imagekit?.url}
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      autoPlay
                      muted
                      loop
                    />
                  ) : (
                    <m.img
                      src={(image.image as Image)?.imagekit?.url}
                      alt={(image.image as Image).altText}
                      variants={sectionVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    />
                  )}
                </div>
              );
            });
          default:
            return null;
        }
      })}
    </LazyMotion>
  );
}
