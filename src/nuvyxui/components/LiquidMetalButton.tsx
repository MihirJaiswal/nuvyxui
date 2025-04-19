"use client";

import type React from "react";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "mercury" | "ripple" | "gradient";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  theme?:
    | "silver"
    | "gold"
    | "copper"
    | "mercury"
    | "steel"
    | "obsidian"
    | "emerald"
    | "ruby"
    | "sapphire"
    | "custom";
  customColors?: {
    base: string;
    highlight: string;
    shadow: string;
    text?: string;
    border?: string;
    glow?: string;
  };
  intensity?: 1 | 2 | 3 | 4 | 5;
  magnetic?: boolean;
  clickEffect?: boolean;
  asChild?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  shadow?: boolean | "sm" | "md" | "lg" | "xl";
  hoverAnimation?: boolean;
  textured?: boolean;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}

interface Droplet {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  life: number;
}

export function LiquidMetalButton({
  variant = "default",
  size = "md",
  theme = "silver",
  customColors,
  intensity = 3,
  magnetic = true,
  clickEffect = true,
  rounded = "md",
  shadow = true,
  hoverAnimation = true,
  textured = false,
  icon,
  iconAfter,
  className,
  children,
  onClick,
  ...props
}: LiquidMetalButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonDimensions, setButtonDimensions] = useState({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
  });
  const [droplets, setDroplets] = useState<Droplet[]>([]);
  const animationRef = useRef<number>(0);
  const lastRippleTime = useRef<number>(0);
  const dropletsRef = useRef<Droplet[]>([]);

  const intensityFactors = useMemo(
    () => ({
      1: 0.2,
      2: 0.4,
      3: 0.6,
      4: 0.8,
      5: 1.0,
    }),
    []
  );

  const themeColors = useMemo(
    () => ({
      silver: {
        base: "bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900",
        text: "text-gray-800 dark:text-gray-200",
        highlight: "rgba(255, 255, 255, 0.8)",
        shadow: "rgba(0, 0, 0, 0.3)",
        glow: "shadow-gray-400/50",
        border: "border-gray-400",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiLz48L3N2Zz4=')]",
      },
      gold: {
        base: "bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 dark:from-amber-700 dark:via-amber-800 dark:to-amber-900",
        text: "text-amber-900 dark:text-amber-200",
        highlight: "rgba(255, 235, 150, 0.8)",
        shadow: "rgba(120, 80, 0, 0.4)",
        glow: "shadow-amber-400/50",
        border: "border-amber-500",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMjU1LDIxNSwwLDAuMDIpIi8+PC9zdmc+')]",
      },
      copper: {
        base: "bg-gradient-to-b from-orange-200 via-orange-300 to-orange-600 dark:from-orange-700 dark:via-orange-800 dark:to-orange-900",
        text: "text-orange-900 dark:text-orange-200",
        highlight: "rgba(255, 200, 150, 0.8)",
        shadow: "rgba(120, 60, 0, 0.4)",
        glow: "shadow-orange-400/50",
        border: "border-orange-500",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMjU1LDE2MCwwLDAuMDIpIi8+PC9zdmc+')]",
      },
      mercury: {
        base: "bg-gradient-to-b from-blue-200 via-blue-300 to-blue-400 dark:from-blue-700 dark:via-blue-800 dark:to-blue-900",
        text: "text-blue-900 dark:text-blue-100",
        highlight: "rgba(200, 230, 255, 0.8)",
        shadow: "rgba(0, 50, 120, 0.4)",
        glow: "shadow-blue-400/50",
        border: "border-blue-400",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMTgwLDIzMCwyNTUsMC4wMikiLz48L3N2Zz4=')]",
      },
      steel: {
        base: "bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900",
        text: "text-slate-900 dark:text-slate-100",
        highlight: "rgba(220, 230, 240, 0.8)",
        shadow: "rgba(30, 40, 50, 0.4)",
        glow: "shadow-slate-400/50",
        border: "border-slate-500",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMjIwLDIyMCwyMjAsMC4wMikiLz48L3N2Zz4=')]",
      },
      obsidian: {
        base: "bg-gradient-to-b from-gray-600 via-gray-700 to-gray-900 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900",
        text: "text-gray-100 dark:text-gray-100",
        highlight: "rgba(180, 180, 180, 0.3)",
        shadow: "rgba(0, 0, 0, 0.5)",
        glow: "shadow-gray-900/70",
        border: "border-gray-700",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiLz48L3N2Zz4=')]",
      },
      emerald: {
        base: "bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-600 dark:from-emerald-700 dark:via-emerald-800 dark:to-emerald-900",
        text: "text-emerald-950 dark:text-emerald-100",
        highlight: "rgba(180, 255, 220, 0.7)",
        shadow: "rgba(0, 80, 60, 0.4)",
        glow: "shadow-emerald-500/50",
        border: "border-emerald-500",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMTAwLDI1NSwxNTAsMC4wMikiLz48L3N2Zz4=')]",
      },
      ruby: {
        base: "bg-gradient-to-b from-red-300 via-red-400 to-red-600 dark:from-red-700 dark:via-red-800 dark:to-red-900",
        text: "text-red-950 dark:text-red-100",
        highlight: "rgba(255, 200, 200, 0.7)",
        shadow: "rgba(100, 0, 0, 0.4)",
        glow: "shadow-red-500/50",
        border: "border-red-500",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMjU1LDEwMCwxMDAsMC4wMikiLz48L3N2Zz4=')]",
      },
      sapphire: {
        base: "bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-600 dark:from-indigo-700 dark:via-indigo-800 dark:to-indigo-900",
        text: "text-indigo-950 dark:text-indigo-100",
        highlight: "rgba(200, 200, 255, 0.7)",
        shadow: "rgba(40, 0, 100, 0.4)",
        glow: "shadow-indigo-500/50",
        border: "border-indigo-500",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMTUwLDE1MCwyNTUsMC4wMikiLz48L3N2Zz4=')]",
      },
      custom: {
        base: customColors?.base
          ? customColors.base.startsWith("#")
            ? `bg-[${customColors.base}]`
            : customColors.base
          : "bg-gradient-to-b from-gray-300 to-gray-400",
        text: customColors?.text || "text-gray-800",
        highlight: customColors?.highlight || "rgba(255, 255, 255, 0.8)",
        shadow: customColors?.shadow || "rgba(0, 0, 0, 0.3)",
        glow: customColors?.glow || "shadow-gray-400/50",
        border: customColors?.border || "border-gray-400",
        texture:
          "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiLz48L3N2Zz4=')]",
      },
    }),
    [customColors]
  );

  const currentTheme = useMemo(() => themeColors[theme], [theme, themeColors]);

  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
    xl: "px-6 py-3 text-xl",
    "2xl": "px-8 py-4 text-2xl",
  };

  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const shadowClasses = {
    true: "shadow-lg",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    false: "",
  };

  useEffect(() => {
    dropletsRef.current = droplets;
  }, [droplets]);

  useEffect(() => {
    if (!buttonRef.current || !canvasRef.current) return;

    const updateDimensions = () => {
      if (!buttonRef.current || !canvasRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();
      setButtonDimensions({
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left,
      });

      canvasRef.current.width = rect.width;
      canvasRef.current.height = rect.height;
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const createDroplet = useCallback(
    (x: number, y: number) => {
      if (!isHovered || (variant !== "mercury" && variant !== "ripple"))
        return false;

      const now = Date.now();
      if (now - lastRippleTime.current > 30) {
        const factor = intensityFactors[intensity];
        const size = Math.random() * 8 * factor + 3;

        setDroplets((prev) => {
          const newDroplets = [
            ...prev,
            {
              x,
              y,
              size,
              opacity: 0.7,
              speedX: (Math.random() - 0.5) * 2 * factor,
              speedY: (Math.random() - 0.5) * 2 * factor,
              life: 1.0,
            },
          ];
          return newDroplets.length > 25 ? newDroplets.slice(-25) : newDroplets;
        });

        lastRippleTime.current = now;
        return true;
      }

      return false;
    },
    [isHovered, variant, intensity, intensityFactors]
  );

  useEffect(() => {
    if (!isHovered) return;

    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });

      if (
        (variant === "mercury" || variant === "ripple") &&
        Math.random() > 0.6
      ) {
        createDroplet(x, y);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, variant, createDroplet]);

  useEffect(() => {
    if (!canvasRef.current || (variant !== "mercury" && variant !== "ripple"))
      return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    let frameCount = 0;

    const animate = () => {
      if (!isHovered) {
        ctx.clearRect(0, 0, buttonDimensions.width, buttonDimensions.height);
        return;
      }

      frameCount++;
      ctx.clearRect(0, 0, buttonDimensions.width, buttonDimensions.height);
      const currentDroplets = dropletsRef.current;
      const updatedDroplets = currentDroplets
        .map((droplet) => {
          const gravity = variant === "ripple" ? 0.08 : 0.02;

          return {
            ...droplet,
            x: droplet.x + droplet.speedX,
            y: droplet.y + droplet.speedY + gravity,
            speedX: droplet.speedX * 0.98,
            speedY: droplet.speedY * 0.98 + gravity,
            life: droplet.life - 0.015,
            size: droplet.size * 0.99,
          };
        })
        .filter((droplet) => droplet.life > 0);

      updatedDroplets.forEach((droplet) => {
        const gradientColor =
          variant === "mercury"
            ? ctx.createRadialGradient(
                droplet.x,
                droplet.y,
                0,
                droplet.x,
                droplet.y,
                droplet.size
              )
            : ctx.createRadialGradient(
                droplet.x,
                droplet.y,
                0,
                droplet.x,
                droplet.y,
                droplet.size * 1.2
              );

        if (variant === "mercury") {
          gradientColor.addColorStop(
            0,
            `rgba(240, 250, 255, ${droplet.life * 0.9})`
          );
          gradientColor.addColorStop(
            0.6,
            `rgba(180, 220, 255, ${droplet.life * 0.7})`
          );
          gradientColor.addColorStop(
            1,
            `rgba(100, 180, 255, ${droplet.life * 0.3})`
          );
        } else {
          gradientColor.addColorStop(
            0,
            `rgba(255, 255, 255, ${droplet.life * 0.8})`
          );
          gradientColor.addColorStop(
            0.7,
            `rgba(220, 230, 255, ${droplet.life * 0.5})`
          );
          gradientColor.addColorStop(
            1,
            `rgba(200, 210, 255, ${droplet.life * 0.1})`
          );
        }

        ctx.beginPath();
        ctx.arc(droplet.x, droplet.y, droplet.size, 0, Math.PI * 2);
        ctx.fillStyle = gradientColor;
        ctx.fill();
      });

      if (frameCount % 4 === 0) {
        setDroplets(updatedDroplets);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      if (ctx) {
        ctx.clearRect(0, 0, buttonDimensions.width, buttonDimensions.height);
      }
    };
  }, [isHovered, variant, buttonDimensions.width, buttonDimensions.height]);

  useEffect(() => {
    if (!magnetic || !isHovered) return;

    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const totalDistance = Math.sqrt(
        distanceX * distanceX + distanceY * distanceY
      );

      const maxDistance = Math.max(rect.width, rect.height) * 1.8;
      const factor = intensityFactors[intensity];
      const pullStrength =
        Math.max(0, 1 - totalDistance / maxDistance) * 15 * factor;

      if (totalDistance < maxDistance) {
        const moveX = (distanceX / totalDistance) * pullStrength;
        const moveY = (distanceY / totalDistance) * pullStrength;

        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
        button.style.transition =
          "transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)";
      } else {
        button.style.transform = "";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (button) {
        button.style.transform = "";
      }
    };
  }, [magnetic, isHovered, intensity, intensityFactors]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setDroplets([]);
    cancelAnimationFrame(animationRef.current);

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, buttonDimensions.width, buttonDimensions.height);
      }
    }

    if (buttonRef.current) {
      buttonRef.current.style.transform = "";
      buttonRef.current.style.transition = "transform 0.3s ease-out";
    }
  };

  const handleMouseDown = () => {
    if (!clickEffect) return;

    setIsPressed(true);

    if (variant === "mercury" || variant === "ripple") {
      const factor = intensityFactors[intensity];
      const newDroplets = Array.from({ length: 15 }).map(() => {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 * factor + 2;

        return {
          x: mousePosition.x,
          y: mousePosition.y,
          size: Math.random() * 12 * factor + 5,
          opacity: 0.9,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          life: 1.0,
        };
      });

      setDroplets((prev) => [...prev, ...newDroplets]);
    }
  };

  const handleMouseUp = () => {
    if (clickEffect) {
      setIsPressed(false);
    }
  };

  const getButtonClasses = useCallback(() => {
    switch (variant) {
      case "outline":
        return cn(
          "bg-transparent border-2",
          currentTheme.text,
          currentTheme.border
        );
      case "ghost":
        return cn(
          "bg-transparent hover:bg-gray-100/20 dark:hover:bg-gray-800/30",
          currentTheme.text
        );
      case "gradient":
        return cn(
          currentTheme.base,
          currentTheme.text,
          "bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-300"
        );
      case "mercury":
      case "ripple":
        return cn(
          currentTheme.base,
          currentTheme.text,
          "relative overflow-hidden"
        );
      default:
        return cn(currentTheme.base, currentTheme.text);
    }
  }, [variant, currentTheme]);

  const Comp = "button";

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 500);
  };

  return (
    <Comp
      ref={buttonRef}
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center font-medium transition-all duration-200",
        sizeClasses[size],
        roundedClasses[rounded],
        typeof shadow === "string"
          ? shadowClasses[shadow]
          : shadow
          ? shadowClasses.true
          : "",
        shadow && currentTheme.glow,
        getButtonClasses(),
        textured && currentTheme.texture,
        isPressed && "scale-95 transform",
        hoverAnimation && "hover:-translate-y-0.5 hover:brightness-105",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-opacity-75",
        "focus-visible:ring-offset-2 focus-visible:ring-opacity-75",
        "focus-visible:ring-blue-400 dark:focus-visible:ring-blue-500",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        willChange: "transform",
        transition: isHovered
          ? "transform 0.1s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.2s ease, opacity 0.2s ease"
          : "transform 0.3s ease-out, filter 0.3s ease, opacity 0.3s ease",
      }}
      {...props}
    >
      {(variant === "mercury" || variant === "ripple") && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none opacity-90"
          style={{ borderRadius: "inherit" }}
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="inline-flex">{icon}</span>}
        <span>{children}</span>
        {iconAfter && <span className="inline-flex">{iconAfter}</span>}
      </span>

      {variant !== "ghost" && variant !== "outline" && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ borderRadius: "inherit" }}
        >
          <div
            className="absolute inset-0 opacity-70 transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.highlight} 0%, transparent 50%, ${currentTheme.shadow} 100%)`,
              transform: isHovered
                ? `rotate(${
                    (mousePosition.x / buttonDimensions.width) * 45
                  }deg) scale(1.05)`
                : "rotate(0deg) scale(1)",
              transition: isHovered
                ? "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.2s ease"
                : "transform 0.4s ease-out, opacity 0.3s ease",
            }}
          />

          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(ellipse at ${
                isHovered
                  ? `${(mousePosition.x / buttonDimensions.width) * 100}% ${
                      (mousePosition.y / buttonDimensions.height) * 100
                    }%`
                  : "center"
              }, 
                           ${currentTheme.highlight} 0%, 
                           transparent 70%)`,
              transition: "opacity 0.3s ease",
              opacity: isHovered ? 0.6 : 0.2,
            }}
          />
        </div>
      )}

      {variant !== "ghost" && variant !== "outline" && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            borderRadius: "inherit",
            boxShadow:
              "inset 0 1px 3px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(255,255,255,0.2)",
          }}
        />
      )}
    </Comp>
  );
}
