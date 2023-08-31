"use client";

import { AnimatedLine } from "@/components/AnimatedLine";
import { Project } from "@/types/cms";
import slateToHtml from "@/utils/slateToHtml";
import {
  bottomIn,
  rightLeft,
  rightLeftContainer,
  sectionVariants,
} from "@/utils/variants";
import { domAnimation, LazyMotion, m } from "framer-motion";
import Link from "next/link";

export default function ProjectDescription({ project }: { project: Project }) {
  const { clientName, shortDescription, projectYear, scope, credits } = project;

  return (
    <LazyMotion features={domAnimation}>
      <div className="grid gap-14 md:gap-20 md:pb-12">
        {(clientName || shortDescription || projectYear) && (
          <m.div
            className="grid grid-cols-12"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="col-span-3 lg:col-span-2">
              {clientName && <h6>Client: {clientName}</h6>}
            </div>
            <div className="col-span-8 lg:col-span-9">
              {shortDescription && (
                <h6 className="whitespace-pre-line">{shortDescription}</h6>
              )}
            </div>
            <div className="col-span-1">
              {projectYear && <h6 className="text-right">{projectYear}</h6>}
            </div>
          </m.div>
        )}

        <div className="grid gap-6 pb-8 lg:grid-cols-2">
          <m.h2
            className="mb-6"
            variants={bottomIn(0.4)}
            initial="hidden"
            animate="visible"
          >
            {project.title}
          </m.h2>
          <div>
            <m.div variants={rightLeft(0.8)} initial="hidden" animate="visible">
              <div
                dangerouslySetInnerHTML={slateToHtml(
                  project.mainDescription,
                  true
                )}
                className="grid gap-3 whitespace-pre-line"
              />
              {(project?.links ?? []).length > 0 && (
                <div className="flex gap-6 pt-5">
                  {(project?.links ?? []).map(({ label, url }) => (
                    <Link
                      key={url}
                      className="rounded-full border border-black py-1 px-4 text-[13px]"
                      href={url}
                      target="_blank"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </m.div>
            {(scope || credits) && (
              <div className="mt-6">
                <AnimatedLine />
                <div className="mt-6 grid items-start gap-8 sm:grid-cols-2">
                  {scope && (
                    <m.div
                      className="grid gap-2"
                      variants={rightLeftContainer(0, 0.05)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <m.h5 variants={rightLeft()}>Scope</m.h5>
                      {scope.split(/\r?\n/).map((item) => (
                        <m.h5 key={item} variants={rightLeft()}>
                          {item}
                        </m.h5>
                      ))}
                    </m.div>
                  )}
                  {credits && (
                    <m.div
                      className="grid gap-2"
                      variants={rightLeftContainer(0, 0.05)}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <m.h5 variants={rightLeft()}>Credits</m.h5>
                      {credits.split(/\r?\n/).map((item) => (
                        <m.h5 key={item} variants={rightLeft()}>
                          {item}
                        </m.h5>
                      ))}
                    </m.div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
