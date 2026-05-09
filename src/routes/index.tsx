import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { PageFrame } from "@/components/pour-toi/PageFrame";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pour Toi — une lettre pour ma princesse" },
      { name: "description", content: "Une lettre intime et cinématique." },
    ],
  }),
  component: Cover,
});

const TITLE = "Pour Toi";

function Cover() {
  return (
    <PageFrame>
      {/* Ornamental frame */}
      <svg
        className="pointer-events-none absolute inset-6 z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.rect
          x="1.5"
          y="1.5"
          width="97"
          height="97"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="0.18"
          strokeDasharray="400"
          initial={{ strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* Corner flourishes */}
      {[
        "top-4 left-4",
        "top-4 right-4 rotate-90",
        "bottom-4 right-4 rotate-180",
        "bottom-4 left-4 -rotate-90",
      ].map((pos, i) => (
        <motion.svg
          key={i}
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className={`pointer-events-none absolute z-0 ${pos}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 + i * 0.15, duration: 0.8 }}
        >
          <path
            d="M2 2 Q 30 2 30 30 M2 2 L 24 12 M2 2 L 12 24 M2 14 Q 14 14 14 2"
            fill="none"
            stroke="var(--color-gold)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </motion.svg>
      ))}

      {/* Floating botanicals */}
      {[
        { top: "12%", left: "8%", delay: 0 },
        { top: "20%", right: "6%", delay: 0.3 },
        { bottom: "18%", left: "10%", delay: 0.6 },
        { bottom: "12%", right: "8%", delay: 0.9 },
      ].map((p, i) => (
        <motion.svg
          key={i}
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className="pointer-events-none absolute z-0 opacity-50"
          style={p}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        >
          <motion.path
            d="M40 70 Q 30 50 40 30 Q 50 50 40 70 M40 50 Q 25 45 20 30 M40 50 Q 55 45 60 30 M40 35 Q 32 28 35 18 M40 35 Q 48 28 45 18"
            fill="none"
            stroke="var(--color-rose-deep)"
            strokeWidth="0.6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 + i * 0.2 }}
          />
        </motion.svg>
      ))}

      <div className="relative z-10 text-center">
        <motion.p
          className="text-overline mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Une lettre pour
        </motion.p>

        <h1
          className="font-display text-burgundy"
          style={{
            fontSize: "clamp(4rem, 14vw, 8rem)",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          {TITLE.split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.7, ease: "easeOut" }}
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {ch}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="font-script mt-2 text-rose-deep"
          style={{ fontSize: "clamp(2.2rem, 6vw, 3.5rem)" }}
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 1.8, duration: 1.6, ease: "easeOut" }}
        >
          ma princesse
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
        >
          <span className="gold-divider h-px w-24" />
          <Crown className="h-5 w-5 text-gold" />
          <span className="gold-divider h-px w-24" />
        </motion.div>

        <motion.p
          className="mt-12 font-body text-sm italic text-burgundy-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.4, 0.8] }}
          transition={{ delay: 3, duration: 3, repeat: Infinity }}
        >
          Touche l'écran pour ouvrir
        </motion.p>
      </div>
    </PageFrame>
  );
}
