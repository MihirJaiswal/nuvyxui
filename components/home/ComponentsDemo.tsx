import React from "react";
import { BentoGrid } from "../../registry/ui/bento-grid";
import { AnimatedGradientBg } from "../../registry/ui/animated-gradient-bg";
import { ChevronRight, Code, Rocket, Sparkles } from "lucide-react";
import { DynamicRipple } from "../../registry/ui/dynamic-ripple";
import Link from "next/link";
import InteractiveTerminal from "../../registry/ui/terminal";
import { Rbutton } from "../ui/Rbutton";
import InteractiveKeyboard from "../../registry/ui/keyboard";
import { ImageScanner } from "../../registry/ui/image-scanner";
import LampHeading from "../../registry/ui/lamp-heading";
import { Particles } from "../ui/particles";
import { TwitterCard } from "./TweetCard";
import { Matrix } from "./Matrix";
import { MorphingBlob } from "../../registry/ui/morphing-blob";

export const ComponentsDemo = () => {
  return (
    <div className="container max-w-7xl mx-auto px-6">
      <h2 className="text-3xl sm:text-5xl text-center lg:text-5xl font-extrabold tracking-tight leading-tight">
        Component Demos
      </h2>
      <h3 className="mx-auto mb-8 mt-2 text-balance text-center text-base md:text-lg font-medium tracking-tight text-foreground/80">
        These are a few components that you can easily plug into your next
        project.
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BentoGrid
          className="lg:col-span-2 hover:scale-[1.01] overflow-hidden shadow-2xl transition-all duration-300 border border-zinc-800 h-[550px] rounded-xl"
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          dark
          component={
            <div className="rounded-xl overflow-hidden relative w-full h-full bg-gradient-to-br from-zinc-900 to-black">
              <div className="w-full h-76 overflow-hidden overscroll-none bg-zinc-800 rounded-t-lg shadow-lg">
                <div className="bg-zinc-900 p-1 rounded-t-lg flex items-center justify-between border-b border-zinc-700">
                  <div className="flex space-x-2 ml-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-zinc-400">Terminal</div>
                  <div className="w-12"></div>
                </div>
                <div className="bg-black h-76 overflow-hidden overscroll-none">
                  <InteractiveTerminal
                    autoExecute={true}
                    command="sudo hack -m"
                    className="rounded-none font-mono text-sm pb-2"
                    repeat={true}
                    variant="custom"
                    customTheme={{
                      container: "bg-black text-green-500",
                      header:
                        "bg-green-950/40 text-green-500 border-green-500/20",
                      output: "bg-black text-green-500",
                      button: "bg-gray-950 text-green-500",
                    }}
                    icon={<Code className="mr-1 mt-1 text-green-500 w-4 h-4" />}
                    steps={[
                      "Booting exploit frames...",
                      "Scanning for Issues...",
                      "Bypassing security...",
                      "Unlocking files...",
                    ]}
                    finalMessage={`
⚠️  ACCESS GRANTED  ⚠️
      `}
                    promptSymbol="#"
                    stepDelay={500}
                  />
                </div>
              </div>

              <div className="flex-grow bg-black relative w-full flex items-center justify-end lg:justify-start">
                <div className="transform scale-70 md:scale-80 origin-center lg:origin-top -mt-6 lg:mt-0">
                  <InteractiveKeyboard
                    layout="standard"
                    showFunctionKeys={false}
                    showNavigationCluster={false}
                    activeKeys={["Enter"]}
                    activeKeyGlowColor="#22c55e"
                    activeKeyGlowIntensity={2}
                    theme="cyberpunk"
                    keyPressAnimationDuration={800}
                    allowPhysicalKeyboard={true}
                    perspective={800}
                    rotateX={15}
                  />
                </div>
              </div>
              <div className="absolute bottom-2 right-4">
                <div className="px-2 py-1 bg-zinc-800 rounded text-xs text-green-400 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  ONLINE
                </div>
              </div>
            </div>
          }
        />

        <BentoGrid
          className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl border border-zinc-200 dark:border-zinc-800"
          height="h-full"
          enableDescription={false}
          enableTitle={false}
          component={
            <DynamicRipple
              theme="purple"
              intensity={2}
              speed={1}
              reactToCursor
              autoAnimate
              rounded="xl"
              className="w-full h-full min-h-[300px] p-6 flex items-center justify-center bg-white dark:bg-black"
            >
              <Particles
                className="absolute inset-0 z-0"
                quantity={70}
                ease={80}
                color="#ffffff"
                refresh
              />
              <div className="relative flex flex-col items-center justify-center">
                <ImageScanner
                  image="/logo.png"
                  scanType="line"
                  scanColor="purple"
                  repeating={true}
                  scanSpeed={3}
                  className="w-48 h-48 rounded-lg border-2 border-purple-200 dark:border-purple-900"
                />
                <div className="text-center mt-3 w-full flex flex-col items-center justify-center gap-3">
                  <LampHeading
                    text="Nuvyx UI"
                    gradientColors={{ from: "#6e15ad", to: "#d413ad" }}
                    direction="above"
                    lineHeight={3}
                    glowIntensity={0.7}
                    className="text-2xl font-bold"
                  />
                </div>
              </div>
            </DynamicRipple>
          }
        />

        <BentoGrid
          className="rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border"
          height="h-full"
          enableDescription={false}
          enableTitle={false}
          component={<TwitterCard />}
        />
        <BentoGrid
          dark
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="lg:col-span-2 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-zinc-200/50 dark:border-zinc-800/50 tracking-wider"
          title="Animated Gradient Background"
          description="Customizable gradient backgrounds with mesh pattern. Interactive and visually striking."
          component={
            <div className="relative w-full h-full overflow-hidden">
              <AnimatedGradientBg
                colors={["#a806ba", "#ec4899", "#8b5cf6", "#06b6d4"]}
                pattern="mesh"
                blur={25}
                speed={2}
                opacity={0.9}
                position="absolute"
                size="full"
                zIndex={0}
                animate
                intensity={2}
                className="bg-gradient-to-b from-white/10 to-50% dark:from-gray-950/20 dark:from-[-25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
                <Sparkles className="mb-4 h-10 w-10 drop-shadow-lg animate-pulse text-white/90" />
                <span className="text-lg md:text-3xl text-center font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                  ANIMATED GRADIENT
                </span>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-purple-500/20 blur-xl" />
              <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-blue-500/20 blur-xl" />
            </div>
          }
        />

        <BentoGrid
          title="Matrix Code Rain"
          description="Digital rain effect inspired by The Matrix, creating a mesmerizing cyberpunk atmosphere."
          enableDescription={false}
          enableTitle={false}
          height="h-full"
          className="rounded-2xl lg:col-span-2 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-zinc-200 dark:border-zinc-800"
          component={<Matrix />}
        />

        <BentoGrid
          enableDescription={false}
          enableTitle={false}
          height="h-72"
          className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-black transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border border-zinc-200 dark:border-zinc-800"
          component={
            <div className="h-72 flex items-center justify-center">
              <Particles
                className="absolute inset-0 z-0"
                quantity={70}
                ease={80}
                color="#ffffff"
                refresh
              />
              <div className="flex w-full items-center justify-center min-h-screen bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-black">
                <MorphingBlob
                  theme="custom"
                  customColors={{
                    from: "#48176e",
                    via: "#5c176e",
                    to: "#69176e",
                  }}
                  complexity={5}
                  speed={3}
                  hoverEffect={true}
                  clickEffect={true}
                  pulse={false}
                  glow={false}
                  opacity={90}
                  glowIntensity={5}
                  smooth={true}
                  effect3D={true}
                >
                  <div className="text-center flex flex-col items-center justify-center">
                    <Rocket className="h-10 w-10" />
                    <p className="text-white text-lg mt-3 font-bold">
                      Interact with me!
                    </p>
                  </div>
                </MorphingBlob>
              </div>
            </div>
          }
        />
      </div>

      <div className="relative mt-8 flex w-full flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 my-16 px-8">
        <Link href="/docs" rel="noopener noreferrer">
          <Rbutton className="bg-slate-900 dark:bg-white dark:text-black no-underline flex space-x-2 group cursor-pointer relative hover:shadow-2xl transition duration-200 shadow-zinc-900 p-px font-semibold text-white px-4 py-2 h-14 w-full items-center justify-center rounded-2xl text-center text-sm sm:w-52">
            All Components
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Rbutton>
        </Link>
      </div>
    </div>
  );
};
