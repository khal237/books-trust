import { type ReactNode, type MouseEvent } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { motion, usePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Sparkles } from "./Sparkles";
import { ROMAN, indexOf, nextPath, ORDER } from "@/lib/pour-toi/pages";

interface PageFrameProps {
  children: ReactNode;
  tapToContinue?: boolean;
  className?: string;
}

// ─── Animation variants ───────────────────────────────────────────────────────
// Exiting page (z:20, on top)  rotates away fast  → reveals entering page below.
// Entering page (z:1, below)   rotates in slowly  → settles with a paper snap.
// Both play simultaneously (mode="sync") = real book leafing effect.

const pageVariants = {
  initial: {
    rotateY: 90,
    filter: "brightness(0.55) saturate(0.8)",
    opacity: 1,
  },
  animate: {
    rotateY: 0,
    filter: "brightness(1) saturate(1)",
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1.05, 0.36, 1] as const,
    },
  },
  exit: {
    rotateY: -90,
    filter: "brightness(0.35) saturate(0.6)",
    opacity: 1,
    transition: {
      duration: 0.38,
      ease: [0.65, 0.05, 0.9, 0.1] as const,
    },
  },
};

const shadowOverlayVariants = {
  initial: { opacity: 0.65 },
  animate: { opacity: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
  exit:    { opacity: 0.85, transition: { duration: 0.38 } },
};

const catchVariants = {
  initial: { opacity: 0.45 },
  animate: { opacity: 0, transition: { duration: 0.45 } },
  exit:    { opacity: 0, transition: { duration: 0.1 } },
};

export function PageFrame({
  children,
  tapToContinue = true,
  className = "",
}: PageFrameProps) {
  // isPresent=false → this is the EXITING page (on top, z:20, rotates away)
  // isPresent=true  → this is the ENTERING page (below, z:1, rotates in)
  const [isPresent] = usePresence();

  const navigate = useNavigate();
  const location = useLocation();
  const idx   = indexOf(location.pathname);
  const total = ORDER.length;
  const isLast = idx >= total - 1;

  const handleTap = (e: MouseEvent<HTMLDivElement>) => {
    if (!tapToContinue) return;
    const target = e.target as HTMLElement;
    if (target.closest("button, a, input, textarea, [data-no-tap]")) return;
    navigate({ to: nextPath(location.pathname) });
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onClick={handleTap}
      style={{
        // Absolute so both pages occupy the same viewport slot simultaneously.
        position: "absolute",
        inset: 0,
        // Exiting page on top so it visually sweeps away and reveals page below.
        zIndex: isPresent ? 1 : 20,
        // 3-D hinge on the left spine
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        // Layered shadow: base drop + right-edge thickness + soft diffusion
        boxShadow:
          "0 48px 96px -32px oklch(0.32 0.085 15 / 0.55), " +
          "8px  0  28px  -4px oklch(0.22 0.05 15 / 0.32), " +
          "20px 0  50px -10px oklch(0.22 0.05 15 / 0.16)",
      }}
      className={`relative w-full overflow-hidden bg-mesh ${
        tapToContinue ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* ── Paper texture ──────────────────────────────────────────────── */}
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-30" />

      {/* ── Spine: binding shadow + narrow gold highlight ───────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-14"
        style={{
          background: [
            "linear-gradient(90deg, oklch(0.87 0.07 78 / 0.42) 0px, oklch(0.87 0.07 78 / 0.06) 3px, transparent 7px)",
            "linear-gradient(90deg, oklch(0.19 0.05 15 / 0.58) 0%, oklch(0.19 0.05 15 / 0.11) 60%, transparent 100%)",
          ].join(", "),
        }}
      />

      {/* ── Right edge: stacked-pages depth ────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-4"
        style={{
          background: [
            "linear-gradient(270deg, oklch(0.22 0.05 15 / 0.18) 0px, transparent 4px)",
            "linear-gradient(270deg, oklch(0.96 0.01 10 / 0.4) 1px, oklch(0.90 0.02 10 / 0.2) 2px, transparent 6px)",
          ].join(", "),
        }}
      />

      {/* ── Turn shadow (simulates the turning page blocking light below) ─ */}
      <motion.div
        aria-hidden
        variants={shadowOverlayVariants}
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-full"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.18 0.04 15 / 0.55) 0%, oklch(0.18 0.04 15 / 0.18) 35%, transparent 70%)",
        }}
      />

      {/* ── Light catch on trailing edge during entry ───────────────────── */}
      <motion.div
        aria-hidden
        variants={catchVariants}
        className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/4"
        style={{
          background:
            "linear-gradient(270deg, oklch(0.99 0.008 85 / 0.32), transparent)",
        }}
      />

      <Sparkles count={28} />

      {/* ── Scrollable content area ─────────────────────────────────────── */}
      {/*   Separate from the outer div so sparkles / nav stay fixed while  */}
      {/*   long pages (affirmations, favorites) can scroll on mobile.       */}
      <div
        className="absolute inset-0 z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col items-center justify-center px-6 py-20" style={{ minHeight: "100dvh" }}>
          {children}
        </div>
      </div>

      {/* ── Page indicator (stays fixed, doesn't scroll) ─────────────────── */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-40 -translate-x-1/2 font-display text-sm tracking-[0.4em] text-gold">
        {ROMAN[idx]} <span className="opacity-60">/</span> {ROMAN[total - 1]}
      </div>

      {/* ── Navigation (stays fixed, doesn't scroll) ────────────────────── */}
      {!isLast &&
        (tapToContinue ? (
          <motion.div
            className="pointer-events-none absolute bottom-6 right-6 z-40 flex items-center gap-2 font-body text-sm italic text-burgundy-soft"
            animate={{ opacity: [0.4, 1, 0.4], x: [0, 4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span>touche pour continuer</span>
            <ChevronRight className="h-4 w-4 text-gold" />
          </motion.div>
        ) : (
          <motion.button
            onClick={() => navigate({ to: nextPath(location.pathname) })}
            className="absolute bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-gold/70 bg-cream/90 px-5 py-2.5 font-display text-xs uppercase tracking-[0.28em] text-gold shadow-sm backdrop-blur-sm transition-shadow hover:border-gold hover:shadow-[0_4px_18px_-6px_oklch(0.74_0.11_80/0.45)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.7 }}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Tourner la page
            <ChevronRight className="h-3.5 w-3.5" />
          </motion.button>
        ))}

      {/* ── Corner fold hint ─────────────────────────────────────────────── */}
      {tapToContinue && !isLast && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 z-40"
          style={{
            width: 72,
            height: 72,
            background:
              "linear-gradient(225deg, oklch(0.93 0.04 78 / 0.6) 0%, oklch(0.88 0.06 78 / 0.22) 35%, transparent 60%)",
            borderTopLeftRadius: "50%",
          }}
        />
      )}
    </motion.div>
  );
}
