"use client";

import Lens from "@/components/Lens";
import MainNav from "@/components/MainNav";
import { Contact, Homepage, Navigation, Setting } from "@/types/cms";
import HomeHero from "./HomeHero";
import PeelButton from "@/components/PeelButton";
import HomeSpotlight from "./HomeSpotlight";
import { Preload, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HomeQuote from "./HomeQuote";
import HomeShowcase from "./HomeShowcase";

type Props = {
  home: Homepage;
  siteBranding: Setting["siteBranding"];
  navItems: Navigation["topNavigation"];
  contactLink: Navigation["contactLink"];
  contact: Contact;
};

export default function HomePage({
  home,
  siteBranding,
  navItems,
  contactLink,
  contact,
}: Props) {
  return (
    <>
      {/* nav */}
      {/* <MainNav
        siteBranding={siteBranding}
        navItems={navItems}
        contactLink={contactLink}
        contact={contact}
        altBrandingColour={true}
      /> */}
      {/* <div className="absolute min-h-screen top-0 left-0 w-auto min-w-max flex items-center z-20">
        <div className="absolute min-w-max top-[100vh-24px] flex items-center">
          <PeelButton className="text-xs mr-6">BOOK AN INTRO CALL</PeelButton>
          <PeelButton className="text-xs">VIEW WORK</PeelButton>
        </div>
      </div> */}

      <Canvas
        flat
        resize={{ scroll: false }}
        camera={{ position: [0, 0, 20], fov: 15 }}
        className="z-10"
      >
        <ScrollControls damping={0.2} pages={5} distance={0.5}>
          <Lens>
            <Scroll>
              <HomeHero />
              <HomeSpotlight />
              <HomeQuote />
            </Scroll>
            {/* <Html className="w-screen -top-[50vh] -left-[50vw]">
              <div className="relative w-full text-white flex items-start">
                <NavAlt
                  siteBranding={siteBranding}
                  navItems={navItems}
                  contactLink={contactLink}
                  contact={contact}
                  altBrandingColour={true}
                />
              </div>
            </Html> */}
            <Scroll html>
              <div className="flex flex-col w-full !transform-none">
                {/* nav */}
                <div className="fixed left-0 top-0 z-10">
                  <MainNav
                    siteBranding={siteBranding}
                    navItems={navItems}
                    contactLink={contactLink}
                    contact={contact}
                    altBrandingColour={true}
                  />
                </div>

                {/* 1 */}
                <div className="h-screen flex relative w-full">
                  <div className="w-auto min-w-max absolute left-5 sm:left-[calc(50%-75px)] lg:left-[calc(50%+150px)] -bottom-32 lg:bottom-6 flex items-center z-10">
                    <PeelButton className="text-xs mr-6">
                      BOOK AN INTRO CALL
                    </PeelButton>
                    <PeelButton className="text-xs">VIEW WORK</PeelButton>
                  </div>
                </div>

                {/* 2 */}
                <div className="h-screen flex relative w-full">
                  <div className="w-auto min-w-max absolute bottom-6 left-5 flex items-center z-10">
                    <PeelButton className="text-xs">PLAY VIDEO</PeelButton>
                  </div>
                </div>

                {/* 3 */}
                <div className="h-screen flex relative w-full">
                  <div className="absolute left-0 top-[35vh] w-full">
                    <HomeShowcase
                      works={home["workShowcase"]?.["workShowcase"] ?? []}
                    />
                  </div>
                </div>
              </div>
            </Scroll>
            <Preload />
          </Lens>
        </ScrollControls>
      </Canvas>
    </>
  );
}
