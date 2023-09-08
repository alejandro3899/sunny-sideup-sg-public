"use client";

import { Project, Image } from "@/types/cms";
import Smooth from "@/components/Smooth";
import ProjectDescription from "./ProjectDescription";
import ProjectSections from "./ProjectSections";

export default function WorkPage({ project }: { project: Project }) {
  return (
    <>
      <style>
        {`
          body {
            background-color: white;
          }
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: rgb(235, 235, 235);
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgb(205, 205, 205);
            border-radius: 6px;
          }
          ::-webkit-scrollbar-thumb:hover {
            cursor: pointer;
            background-color: rgb(190, 190, 190);
          }
        `}
      </style>

      <Smooth data-scroller>
        <>
          <div
            className="h-[350px] bg-cover bg-center sm:h-[500px]"
            style={{
              backgroundImage: `url('${(project.heroImage as Image)?.imagekit
                ?.url}')`,
            }}
          />
          <div className="bg-white cont grid gap-14 pt-8 pb-20 md:gap-20">
            <ProjectDescription project={project} />
            <ProjectSections project={project} />
          </div>
        </>
      </Smooth>
    </>
  );
}
