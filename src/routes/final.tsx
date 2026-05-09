import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { PageFrame } from "@/components/pour-toi/PageFrame";

export const Route = createFileRoute("/final")({
  head: () => ({
    meta: [
      { title: "Une dernière chose — Pour Toi" },
      { name: "description", content: "Touche le cœur." },
    ],
  }),
  component: Final,
});

function Final() {
  const [rained, setRained] = useState(false);

  const hearts = useMemo(
    () =>
      Array.from({ length: 44 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.2,
        duration: 4 + Math.random() * 4,
        size: 16 + Math.random() * 32,
        rotate: -40 + Math.random() * 80,
        opacity: 0.5 + Math.random() * 0.5,
      })),
    [rained],
  );

  return (
    <PageFrame tapToContinue={false}>
      {/* Heart rain */}
      <AnimatePresence>
        {rained && (
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ y: -80, opacity: 0, rotate: h.rotate }}
                animate={{ y: "110vh", opacity: h.opacity, rotate: h.rotate + 30 }}
                transition={{ duration: h.duration, delay: h.delay, ease: "easeIn" }}
                className="absolute"
                style={{ left: `${h.left}%` }}
              >
                <Heart
                  style={{ width: h.size, height: h.size }}
                  className="text-rose-deep"
                  fill="currentColor"
                  strokeWidth={1}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full text-center">
        <motion.h1
          className="font-display text-burgundy"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Une dernière <span className="font-script text-rose-deep">chose</span>...
        </motion.h1>

        <motion.button
          data-no-tap
          onClick={() => setRained(true)}
          className="mt-16 inline-flex items-center justify-center"
          aria-label="Touche le cœur"
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            className="absolute h-40 w-40 rounded-full bg-rose-soft/50 blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Heart
              className="text-rose-deep drop-shadow-[0_8px_24px_oklch(0.62_0.13_10/0.45)]"
              style={{ width: 140, height: 140 }}
              fill="currentColor"
              strokeWidth={1}
            />
          </motion.span>
        </motion.button>

        <motion.p
          className="mt-10 font-body italic text-burgundy-soft"
          style={{ fontSize: "1.1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {rained ? "" : "Touche le cœur."}
        </motion.p>

        <AnimatePresence>
          {rained && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1.2 }}
              className="relative z-30 mt-10"
            >
              <p
                className="font-display text-burgundy"
                style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", letterSpacing: "0.04em" }}
              >
                ....
              </p>
              <p className="font-script mt-2 text-rose-deep" style={{ fontSize: "2.2rem" }}>
                Repose-toi maintenant.
              </p>
              <Link
                to="/"
                data-no-tap
                className="mt-10 inline-block font-display text-xs uppercase tracking-[0.4em] text-gold underline-offset-8 hover:underline"
              >
                relire depuis le début
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageFrame>
  );
}
