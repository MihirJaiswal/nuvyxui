"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TechStack = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const techItems = [
    {
      label: "React",
      svg: (
        <svg
          role="img"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="React"
          className="size-10"
          fill="currentColor"
        >
          <title>React</title>
          <path d="m16 13.146c-1.573 0-2.854 1.281-2.854 2.854s1.281 2.854 2.854 2.854 2.854-1.281 2.854-2.854-1.281-2.854-2.854-2.854zm-7.99 8.526-.63-.156c-4.688-1.188-7.38-3.198-7.38-5.521s2.693-4.333 7.38-5.521l.63-.156.177.625c.474 1.635 1.083 3.229 1.818 4.771l.135.281-.135.286c-.734 1.536-1.344 3.13-1.818 4.771zm-.921-9.74c-3.563 1-5.75 2.536-5.75 4.063s2.188 3.057 5.75 4.063c.438-1.391.964-2.745 1.578-4.063-.615-1.318-1.141-2.672-1.578-4.063zm16.901 9.74-.177-.625c-.474-1.635-1.083-3.229-1.818-4.766l-.135-.286.135-.286c.734-1.536 1.344-3.13 1.818-4.771l.177-.62.63.156c4.688 1.188 7.38 3.198 7.38 5.521s-2.693 4.333-7.38 5.521zm-.657-5.677c.641 1.385 1.172 2.745 1.578 4.063 3.568-1.005 5.75-2.536 5.75-4.063s-2.188-3.057-5.75-4.063c-.438 1.385-.964 2.745-1.578 4.063zm-16.255-4.068-.177-.625c-1.318-4.646-.917-7.979 1.099-9.141 1.979-1.141 5.151.208 8.479 3.625l.453.464-.453.464c-1.182 1.229-2.26 2.552-3.229 3.958l-.182.255-.313.026c-1.703.135-3.391.406-5.047.813zm2.531-8.838c-.359 0-.677.073-.943.229-1.323.766-1.557 3.422-.646 7.005 1.422-.318 2.859-.542 4.313-.672.833-1.188 1.75-2.323 2.734-3.391-2.078-2.026-4.047-3.172-5.458-3.172zm12.787 27.145c-.005 0-.005 0 0 0-1.901 0-4.344-1.427-6.875-4.031l-.453-.464.453-.464c1.182-1.229 2.26-2.552 3.229-3.958l.177-.255.313-.031c1.703-.13 3.391-.401 5.052-.813l.63-.156.177.625c1.318 4.646.917 7.974-1.099 9.135-.49.281-1.042.422-1.604.411zm-5.464-4.505c2.078 2.026 4.047 3.172 5.458 3.172h.005c.354 0 .672-.078.938-.229 1.323-.766 1.563-3.422.646-7.005-1.422.318-2.865.542-4.313.667-.833 1.193-1.75 2.323-2.734 3.396zm7.99-13.802-.63-.161c-1.661-.406-3.349-.677-5.052-.813l-.313-.026-.177-.255c-.969-1.406-2.047-2.729-3.229-3.958l-.453-.464.453-.464c3.328-3.417 6.5-4.766 8.479-3.625 2.016 1.161 2.417 4.495 1.099 9.141zm-5.255-2.276c1.521.141 2.969.365 4.313.672.917-3.583.677-6.24-.646-7.005-1.318-.76-3.797.406-6.401 2.943.984 1.073 1.896 2.203 2.734 3.391zm-10.058 20.583c-.563.01-1.12-.13-1.609-.411-2.016-1.161-2.417-4.49-1.099-9.135l.177-.625.63.156c1.542.391 3.24.661 5.047.813l.313.031.177.255c.969 1.406 2.047 2.729 3.229 3.958l.453.464-.453.464c-2.526 2.604-4.969 4.031-6.865 4.031zm-1.588-8.567c-.917 3.583-.677 6.24.646 7.005 1.318.75 3.792-.406 6.401-2.943-.984-1.073-1.901-2.203-2.734-3.396-1.453-.125-2.891-.349-4.313-.667zm7.979.838c-1.099 0-2.224-.047-3.354-.141l-.313-.026-.182-.26c-.635-.917-1.24-1.859-1.797-2.828-.563-.969-1.078-1.958-1.557-2.969l-.135-.286.135-.286c.479-1.01.995-2 1.557-2.969.552-.953 1.156-1.906 1.797-2.828l.182-.26.313-.026c2.234-.188 4.479-.188 6.708 0l.313.026.182.26c1.276 1.833 2.401 3.776 3.354 5.797l.135.286-.135.286c-.953 2.021-2.073 3.964-3.354 5.797l-.182.26-.313.026c-1.125.094-2.255.141-3.354.141zm-2.927-1.448c1.969.151 3.885.151 5.859 0 1.099-1.609 2.078-3.302 2.927-5.063-.844-1.76-1.823-3.453-2.932-5.063-1.948-.151-3.906-.151-5.854 0-1.109 1.609-2.089 3.302-2.932 5.063.849 1.76 1.828 3.453 2.932 5.063z" />
        </svg>
      ),
      color: "text-black dark:text-neutral-200",
      hoverColor: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      label: "Next.js",
      svg: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-4 w-4 flex-shrink-0 stroke-1 text-neutral-500 md:h-10 md:w-10"><path d="M9 15v-6l7.745 10.65a9 9 0 1 1 2.255 -1.993"></path><path d="M15 12v-3"></path></svg>
      ),
      color: "text-black dark:text-neutral-200",
      hoverColor: "text-gray-800 dark:text-white",
      bgColor: "bg-gray-500/10",
    },
    {
      label: "Tailwind CSS",
      svg: (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Tailwind css"
          className="size-10"
          fill="currentColor"
        >
          <title>Tailwind CSS</title>
          <path d="m12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.176-1.194-2.537-2.576-5.512-2.576z" />
        </svg>
      ),
      color: "text-black dark:text-neutral-200",
      hoverColor: "text-teal-400",
      bgColor: "bg-teal-500/10",
    },
    {
      label: "Motion",
      svg: (
        <svg
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Motion"
          className="size-10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>Motion</title>
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12l-8 -8v16l16 -16v16l-4 -4" />
          <path d="M20 12l-8 8l-4 -4" />
        </svg>
      ),
      color: "text-black dark:text-neutral-200",
      hoverColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:mt-4 md:mb-10 w-full max-w-4xl mx-auto md:px-4">
      <div className="w-full">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none bg-gradient-to-br from-slate-50/20 to-transparent rounded-xl"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
          }}
        />

        <div
          ref={containerRef}
          className="relative flex flex-col items-center justify-center rounded-lg md:p-2"
        >
          <div
            className="md:px-5"
            style={{
              perspective: "1200px",
            }}
          >
            <div className="grid grid-cols-4 gap-2">
              {techItems.map((item, index) => {
                const isHovered = hoveredIndex === index;

                return (
                  <motion.div
                    key={index}
                    className={`relative group flex flex-col items-center justify-center px-4 transition-all duration-300 ease-out ${item.color} hover:${item.hoverColor}`}
                    initial={{ y: 0 }}
                    whileHover={{
                      y: -8,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      },
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      zIndex: isHovered ? 50 : 10,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.div
                      className={`relative p-2 rounded-xl transition-colors duration-300`}
                      animate={{
                        rotateY: isHovered ? [0, 5, 0, -5, 0] : 0,
                        rotateX: isHovered ? [0, 5, 0, -5, 0] : 0,
                      }}
                      transition={{
                        duration: isHovered ? 2 : 0.3,
                        repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }}
                    >
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-xl opacity-30 blur-md"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                          exit={{ opacity: 0 }}
                          style={{
                            background: `radial-gradient(circle, ${getComputedColor(
                              item.color,
                            )}, transparent 70%)`,
                          }}
                        />
                      )}

                      <motion.div>
                        {React.cloneElement(item.svg, {
                          className: `size-10 md:size-12 transition-all duration-300`,
                        })}
                      </motion.div>
                    </motion.div>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.span
                          className="absolute -bottom-6 whitespace-nowrap text-xs sm:text-sm font-medium"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getComputedColor(colorClass: string) {
  switch (colorClass) {
    case "text-cyan-500":
      return "rgba(6, 182, 212, 0.5)";
    case "text-sky-500":
      return "rgba(14, 165, 233, 0.5)";
    case "text-teal-500":
      return "rgba(20, 184, 166, 0.5)";
    case "text-purple-500":
      return "rgba(168, 85, 247, 0.5)";
    case "text-slate-500":
      return "rgba(100, 116, 139, 0.5)";
    default:
      return "rgba(100, 116, 139, 0.5)";
  }
}

export default TechStack;
