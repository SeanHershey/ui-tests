"use client";

import Typewriter from "typewriter-effect";
import { Red_Hat_Mono, Xanh_Mono } from "next/font/google";
import { useThemeStore } from "../store/themeStore";
import { SunIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const BORDER_TEXT = "INFORMATION CRITICISM MOMENT ".repeat(20);

const getRandomColoredText = (text: string) => {
  const words = text.split(" ");
  return words
    .map((word) => {
      // 5% chance for red, 5% chance for green, 90% chance for default color
      const random = Math.random();
      if (random < 0.05) {
        return `<span class="text-red-500">${word}</span>`;
      } else if (random < 0.1) {
        return `<span class="text-lime-500">${word}</span>`;
      }
      return word;
    })
    .join(" ");
};

const CyclingLetter = ({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const [index, setIndex] = React.useState(0);
  const letters = "BORDER TEXT".split("").filter((l) => l !== " ");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % letters.length);
    }, 100);
    return () => clearInterval(interval);
  });

  return (
    <p
      className={`absolute blur-[0.5px] ${
        position === "top-left"
          ? "right-0.5 -bottom-1.5"
          : position === "top-right"
            ? "-bottom-1.5 left-0.5"
            : position === "bottom-left"
              ? "-top-1.5 right-0.5"
              : "-top-1.5 left-0.5"
      }`}
    >
      {letters[index]}
    </p>
  );
};

const EdgeBlock = ({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const theme = useThemeStore((state) => state.theme);
  const bgColor = theme === "dark" ? "bg-neutral-900" : "bg-amber-50";

  return (
    <div className={`absolute ${position} z-20 h-6 w-6 ${bgColor}`}>
      <div className={`absolute inset-0 ${bgColor}`} />
    </div>
  );
};

const AnimatedText = () => {
  const theme = useThemeStore((state) => state.theme);
  const bgColor = theme === "dark" ? "bg-neutral-900" : "bg-amber-50";
  const [coloredText, setColoredText] = React.useState(BORDER_TEXT);

  React.useEffect(() => {
    setColoredText(getRandomColoredText(BORDER_TEXT));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-12 text-lg select-none">
      {/* Edge blocks */}
      <EdgeBlock position="top-left" />
      <EdgeBlock position="top-right" />
      <EdgeBlock position="bottom-left" />
      <EdgeBlock position="bottom-right" />

      {/* Corner blocks to hide overlap */}
      <div
        className={`absolute top-0 left-0 z-20 h-5.5 w-5.5 shadow-[inset_-4px_0_8px_rgba(0,0,0,0.03)] ${bgColor}`}
        style={{
          fontFamily:
            theme === "dark"
              ? "var(--font-red-hat-mono)"
              : "var(--font-xanh-mono)",
        }}
      >
        <CyclingLetter position="top-left" />
      </div>
      <div
        className={`absolute top-0 right-0 z-20 h-5.5 w-5.5 shadow-[inset_4px_0_8px_rgba(0,0,0,0.03)] ${bgColor}`}
        style={{
          fontFamily:
            theme === "dark"
              ? "var(--font-red-hat-mono)"
              : "var(--font-xanh-mono)",
        }}
      >
        <CyclingLetter position="top-right" />
      </div>
      <div
        className={`absolute bottom-0 left-0 z-20 h-5.5 w-5.5 shadow-[inset_-4px_0_8px_rgba(0,0,0,0.03)] ${bgColor}`}
        style={{
          fontFamily:
            theme === "dark"
              ? "var(--font-red-hat-mono)"
              : "var(--font-xanh-mono)",
        }}
      >
        <CyclingLetter position="bottom-left" />
      </div>
      <div
        className={`absolute right-0 bottom-0 z-20 h-5.5 w-5.5 shadow-[inset_4px_0_8px_rgba(0,0,0,0.03)] ${bgColor}`}
        style={{
          fontFamily:
            theme === "dark"
              ? "var(--font-red-hat-mono)"
              : "var(--font-xanh-mono)",
        }}
      >
        <CyclingLetter position="bottom-right" />
      </div>
      {/* Top border: left to right, seamless start */}
      <div className="absolute top-0 left-0 flex w-full justify-center overflow-hidden whitespace-nowrap">
        <span
          className="animate-marquee-x-cw-seamless tracking-widest drop-shadow"
          style={{
            fontFamily:
              theme === "dark"
                ? "var(--font-red-hat-mono)"
                : "var(--font-xanh-mono)",
          }}
          dangerouslySetInnerHTML={{ __html: coloredText }}
        />
      </div>
      {/* Bottom border: right to left */}
      <div className="absolute bottom-0 left-0 flex w-full justify-center overflow-hidden whitespace-nowrap">
        <span
          className="animate-marquee-x-ccw tracking-widest drop-shadow"
          style={{
            fontFamily:
              theme === "dark"
                ? "var(--font-red-hat-mono)"
                : "var(--font-xanh-mono)",
          }}
          dangerouslySetInnerHTML={{ __html: coloredText }}
        />
      </div>
      {/* Left border: bottom to top */}
      <div
        className="absolute top-0 left-0 flex h-full flex-col justify-center overflow-hidden whitespace-nowrap"
        style={{ writingMode: "vertical-rl" }}
      >
        <span
          className="animate-marquee-y-ccw tracking-widest drop-shadow"
          style={{
            fontFamily:
              theme === "dark"
                ? "var(--font-red-hat-mono)"
                : "var(--font-xanh-mono)",
          }}
          dangerouslySetInnerHTML={{ __html: coloredText }}
        />
      </div>
      {/* Right border: top to bottom, seamless start */}
      <div
        className="absolute top-0 right-0 flex h-full flex-col justify-center overflow-hidden whitespace-nowrap"
        style={{ writingMode: "vertical-rl" }}
      >
        <span
          className="animate-marquee-y-cw-seamless tracking-widest drop-shadow"
          style={{
            fontFamily:
              theme === "dark"
                ? "var(--font-red-hat-mono)"
                : "var(--font-xanh-mono)",
          }}
          dangerouslySetInnerHTML={{ __html: coloredText }}
        />
      </div>
      <style jsx>{`
        @keyframes marquee-x-cw-seamless {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-x-cw-seamless {
          display: inline-block;
          min-width: 200%;
          animation: marquee-x-cw-seamless 12s linear infinite;
        }
        @keyframes marquee-x-ccw {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-x-ccw {
          display: inline-block;
          min-width: 200%;
          animation: marquee-x-ccw 12s linear infinite;
        }
        @keyframes marquee-y-cw-seamless {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-marquee-y-cw-seamless {
          display: inline-block;
          min-height: 200%;
          animation: marquee-y-cw-seamless 12s linear infinite;
        }
        @keyframes marquee-y-ccw {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-marquee-y-ccw {
          display: inline-block;
          min-height: 200%;
          animation: marquee-y-ccw 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

const StockLines = () => {
  const [lines, setLines] = React.useState<
    Array<{
      id: number;
      points: Array<{ x: number; y: number }>;
      dx: number;
      dy: number;
    }>
  >([]);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  React.useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    // Create initial lines with constant speeds in pixel space
    const margin = 10;
    const initialLines = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      points: [
        {
          x: Math.random() * (dimensions.width - 2 * margin) + margin,
          y: Math.random() * (dimensions.height - 2 * margin) + margin,
        },
      ],
      dx: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 2 + 1),
      dy: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 2 + 1),
    }));
    setLines(initialLines);
  }, [dimensions]);

  React.useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    const margin = 100;
    // Animation loop
    const interval = setInterval(() => {
      setLines((prevLines) =>
        prevLines.map((line) => {
          const lastPoint = line.points[line.points.length - 1];
          if (!lastPoint) return line;

          let newDx = line.dx;
          let newDy = line.dy;

          if (Math.random() < 0.15) newDy = -newDy;

          let newX = lastPoint.x + newDx;
          let newY = lastPoint.y + newDy;

          // Bounce off walls using pixel-based coordinates
          if (newX < margin || newX > dimensions.width - margin) {
            newDx = -newDx;
            newX = Math.max(margin, Math.min(dimensions.width - margin, newX));
          }
          if (newY < margin || newY > dimensions.height - margin) {
            newDy = -newDy;
            newY = Math.max(margin, Math.min(dimensions.height - margin, newY));
          }

          // Keep only last 100 points for the trail
          const newPoints = [
            ...line.points,
            {
              x: newX,
              y: newY,
            },
          ].slice(-200);

          return {
            ...line,
            points: newPoints,
            dx: newDx,
            dy: newDy,
          };
        }),
      );
    }, 16); // 60fps for smooth animation

    return () => clearInterval(interval);
  }, [dimensions]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0">
      {dimensions.width > 0 &&
        dimensions.height > 0 &&
        lines.map((line) => {
          const first = line.points[0];
          const last = line.points[line.points.length - 1];
          // Color logic for each segment
          const color =
            first &&
            last &&
            first.y !== undefined &&
            last.y !== undefined &&
            first.y > last.y
              ? "#7DCE00"
              : "#FA2C37";
          return (
            <svg
              key={line.id}
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
              style={{ overflow: "visible" }}
            >
              {line.points.length > 1 &&
                line.points.map((p, i, arr) => {
                  if (i === 0) return null;
                  const prev = arr[i - 1];
                  if (!prev) return null;
                  // Fade: newer segments are more opaque
                  const opacity = i / arr.length;
                  return (
                    <line
                      key={i}
                      x1={prev.x}
                      y1={prev.y}
                      x2={p.x}
                      y2={p.y}
                      stroke={color}
                      strokeWidth={2}
                      strokeOpacity={opacity}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  );
                })}
            </svg>
          );
        })}
    </div>
  );
};

const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  variable: "--font-red-hat-mono",
  weight: ["400", "500", "600", "700"],
});

const xanhMono = Xanh_Mono({
  subsets: ["latin"],
  variable: "--font-xanh-mono",
  weight: ["400"],
});

export default function HomePage() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <main
      className={`${theme === "dark" ? redHatMono.variable : xanhMono.variable} ${
        theme === "dark" ? "bg-neutral-900" : "bg-amber-50"
      } ${theme === "dark" ? "text-lime-100" : "text-neutral-900"}`}
    >
      <button
        onClick={toggleTheme}
        className="hover:bg-opacity-80 fixed top-2 right-2 rounded-lg p-2 transition-colors"
      >
        {theme === "dark" ? (
          <SunIcon />
        ) : (
          <Image src="/moon.svg" alt="moon" width={24} height={24} />
        )}
      </button>
      <div className="flex h-screen w-screen items-center justify-center">
        <h1
          className="text-4xl font-light"
          style={{
            fontFamily:
              theme === "dark"
                ? "var(--font-red-hat-mono)"
                : "var(--font-xanh-mono)",
          }}
        >
          <Typewriter
            options={{
              strings: ["HELLO, WORLD!"],
              autoStart: true,
              cursor: "",
              loop: true,
            }}
          />
        </h1>
        <AnimatedText />
        <StockLines />
      </div>
    </main>
  );
}
