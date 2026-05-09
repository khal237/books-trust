import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plane, MapPin } from "lucide-react";
import { PageFrame } from "@/components/pour-toi/PageFrame";

export const Route = createFileRoute("/italy")({
  head: () => ({
    meta: [
      { title: "Un jour, l'Italie — Pour Toi" },
      { name: "description", content: "Une promesse." },
    ],
  }),
  component: Italy,
});

const CITIES = [
  { name: "Roma", note: "main dans la main" },
  { name: "Firenze", note: "au coucher du soleil" },
  { name: "Venezia", note: "en gondole" },
];

function Italy() {
  return (
    <PageFrame>
      {/* Plane trail background */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-50"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M -50 450 Q 250 200 500 350 T 1050 150"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="1.2"
          strokeDasharray="6 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      </svg>
      <motion.div
        className="pointer-events-none absolute z-0"
        initial={{ x: "-10%", y: "75%", rotate: -15 }}
        animate={{ x: "110%", y: "10%", rotate: -25 }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      >
        <Plane className="h-8 w-8 text-gold" />
      </motion.div>

      <div className="relative z-10 w-full text-center">
        <motion.h1
          className="font-display text-burgundy"
          style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Un jour, l'<span className="font-script text-rose-deep">Italie</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-10 max-w-2xl font-body italic leading-[1.85] text-burgundy-soft"
          style={{ fontSize: "1.15rem" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Ce n'est pas une promesse en l'air. Un jour, on prendra cet avion ensemble.
          On marchera dans les ruelles de Rome au coucher du soleil. On mangera des
          pâtes en silence, juste parce qu'elles sont trop bonnes pour parler. On
          regardera Florence depuis une colline et tu me diras « j'arrive pas à
          croire qu'on est là ». Et moi je te répondrai : « moi non plus ».
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CITIES.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, rotate: -6, y: 20 }}
              animate={{ opacity: 1, rotate: 0, y: 0 }}
              transition={{ delay: 1.2 + i * 0.25, duration: 0.7, ease: "easeOut" }}
              className="rounded-xl border border-rose-soft bg-white/50 px-6 py-7 backdrop-blur-md"
            >
              <MapPin className="mx-auto h-6 w-6 text-gold" strokeWidth={1.4} />
              <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.18em] text-burgundy">
                {c.name}
              </h3>
              <p className="mt-1 font-body italic text-burgundy-soft">{c.note}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mx-auto mt-12 max-w-xl font-body italic text-burgundy"
          style={{ fontSize: "1.1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          En attendant on tient bon. On finit ces partiels. On se soigne. Et après,
          l'Italie nous attend si cette confiance s'etablis.
        </motion.p>
      </div>
    </PageFrame>
  );
}
