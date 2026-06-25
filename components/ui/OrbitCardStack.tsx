"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, type Transition } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

export interface OrbitStackItem {
  name: string;
  role: string;
  description: string;
  accent?: string;
  initials?: string;
  stat?: string;
  image?: string;
}

interface OrbitCardStackProps {
  items?: OrbitStackItem[];
  className?: string;
  cardClassName?: string;
  defaultActiveIndex?: number;
  spread?: number;
  lift?: number;
  onActiveChange?: (item: OrbitStackItem, index: number) => void;
}

function clampIndex(index: number, length: number) {
  return Math.min(Math.max(index, 0), Math.max(length - 1, 0));
}

function getInitials(item: OrbitStackItem) {
  if (item.initials) return item.initials;
  return item.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Portrait({ item }: { item: OrbitStackItem }) {
  const initials = getInitials(item);

  if (item.image) {
    return (
      <div className="relative flex aspect-[1.36] w-full overflow-hidden rounded-[1.45rem] border border-black/[0.08] bg-black/[0.045]">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-4 right-4 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white">
          {initials}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-[1.36] w-full overflow-hidden rounded-[1.45rem] border border-black/[0.08] bg-black/[0.045]"
      style={{ "--accent": item.accent ?? "#f3f1ea" } as CSSProperties}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,var(--accent),transparent_24%),radial-gradient(circle_at_85%_72%,rgba(255,255,255,0.5),transparent_28%)] opacity-45" />
      <div className="absolute inset-x-8 bottom-0 h-[72%] rounded-t-[999px] border-2 border-zinc-950 bg-[#f7f5ef]" />
      <div className="absolute left-1/2 top-[22%] size-24 -translate-x-1/2 rounded-[45%_55%_48%_52%] border-2 border-zinc-950 bg-[#f5f2eb]">
        <div className="absolute left-1/2 top-[42%] h-2 w-10 -translate-x-1/2 rounded-full bg-zinc-950 opacity-80" />
        <div className="absolute left-[27%] top-[34%] size-2 rounded-full bg-zinc-950" />
        <div className="absolute right-[27%] top-[34%] size-2 rounded-full bg-zinc-950" />
        <div className="absolute left-1/2 top-[52%] h-6 w-4 -translate-x-1/2 rounded-b-full border-b-2 border-zinc-950" />
        <div
          className="absolute -top-5 left-1/2 h-9 w-24 -translate-x-1/2 rounded-t-full border-2 border-b-0 border-zinc-950"
          style={{ backgroundColor: item.accent ?? "#f3f1ea" }}
        />
      </div>
      <div className="absolute bottom-4 right-4 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white">
        {initials}
      </div>
    </div>
  );
}

export function OrbitCardStack({
  items = [],
  className,
  cardClassName,
  defaultActiveIndex = 0,
  spread = 168,
  lift = 34,
  onActiveChange,
}: OrbitCardStackProps) {
  const shouldReduceMotion = useReducedMotion();
  const safeItems = items.length ? items : [];
  if (safeItems.length === 0) return null;

  const defaultIndex = clampIndex(defaultActiveIndex, safeItems.length);
  const [expanded, setExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [raisedIndex, setRaisedIndex] = useState(defaultIndex);
  const raiseTimeoutRef = useRef<number | null>(null);

  const center = (safeItems.length - 1) / 2;
  const transition: Transition = shouldReduceMotion
    ? { duration: 0.01 }
    : { type: "spring", stiffness: 350, damping: 30, mass: 0.7 };

  const collapseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (raiseTimeoutRef.current) window.clearTimeout(raiseTimeoutRef.current);
      if (collapseTimeoutRef.current) window.clearTimeout(collapseTimeoutRef.current);
    };
  }, []);

  const activateCard = (item: OrbitStackItem, index: number) => {
    setActiveIndex(index);
    onActiveChange?.(item, index);
    if (raiseTimeoutRef.current) window.clearTimeout(raiseTimeoutRef.current);
    raiseTimeoutRef.current = window.setTimeout(() => {
      setRaisedIndex(index);
    }, 100);
  };

  return (
    <div
      className={cn("group relative flex w-full max-w-sm flex-col items-center", className)}
      onMouseEnter={() => {
        if (collapseTimeoutRef.current) window.clearTimeout(collapseTimeoutRef.current);
        setExpanded(true);
      }}
      onMouseLeave={() => {
        collapseTimeoutRef.current = window.setTimeout(() => setExpanded(false), 200);
      }}
      onClick={() => {
        if (!expanded) {
          if (collapseTimeoutRef.current) window.clearTimeout(collapseTimeoutRef.current);
          setExpanded(true);
        }
      }}
    >
      <div className="relative mb-8 grid h-[320px] w-full max-w-[280px] place-items-center">
        {safeItems.map((item, index) => {
          const isActive = index === activeIndex;
          const isRaised = index === raisedIndex;
          const offset = index - activeIndex;

          const distanceToActive = Math.abs(offset);
          const y = expanded ? Math.max(0, distanceToActive * 8 - 4) : distanceToActive * 12;
          let x = 0;
          let r = 0;

          if (expanded) {
            x = (index - center) * spread;
            r = (index - center) * 12;
          } else {
            // Un-expanded: fan out slightly so they don't perfectly overlap
            x = offset * 24;  // Slight shift to the right
            r = offset * 4;   // Slight tilt
          }

          const scale = expanded ? 1 : 1 - distanceToActive * 0.05;
          const zIndex = safeItems.length - distanceToActive + (isRaised && expanded ? 10 : 0);

          return (
            <motion.div
              key={item.name}
              className={cn(
                "absolute inset-0 flex origin-bottom cursor-pointer flex-col rounded-[2rem] border border-black/10 bg-[#f7f5ef] p-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] outline-none will-change-transform focus-visible:ring-2 focus-visible:ring-zinc-400 touch-manipulation",
                !expanded && !isActive && "pointer-events-none",
                cardClassName
              )}
              style={{ zIndex }}
              initial={false}
              animate={{
                y: y - (isRaised && expanded ? lift : 0),
                x,
                rotateZ: r,
                scale,
              }}
              transition={transition}
              onClick={() => {
                if (!expanded) setExpanded(true);
                activateCard(item, index);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!expanded) setExpanded(true);
                  activateCard(item, index);
                }
              }}
              tabIndex={expanded ? 0 : -1}
              role="button"
              aria-pressed={isActive}
            >
              <Portrait item={item} />
              <div className="mt-3 flex flex-col px-1 pb-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-900">{item.name}</span>
                  {item.stat && (
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium text-zinc-600">
                      {item.stat}
                    </span>
                  )}
                </div>
                <span className="mt-1 text-xs font-medium text-zinc-500">{item.role}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="relative h-24 w-full">
        {safeItems.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={item.name}
              initial={false}
              animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 8,
                scale: isActive ? 1 : 0.96,
              }}
              transition={{ ...transition, duration: 0.2 }}
              className={cn("absolute inset-0 flex flex-col items-center text-center", !isActive && "pointer-events-none")}
            >
              <p className="text-sm text-zinc-400">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
