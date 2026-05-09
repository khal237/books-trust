import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, Heart, Sparkles as SparklesIcon, Flower, Crown, Sun, type LucideIcon } from "lucide-react";
import { PageFrame } from "@/components/pour-toi/PageFrame";

export const Route = createFileRoute("/affirmations")({
  head: () => ({
    meta: [
      { title: "Tu es tellement — Pour Toi" },
      { name: "description", content: "Six rappels pour toi." },
    ],
  }),
  component: Affirmations,
});

interface Card {
  numeral: string;
  icon: LucideIcon;
  title: string;
  desc: string;
}

const CARDS: Card[] = [
  { numeral: "I", icon: Star, title: "Plus forte que tu ne le crois", desc: "Tu portes des choses lourdes en silence depuis longtemps. C'est ça, la vraie force  pas l'absence de douleur, mais continuer malgré." },
  { numeral: "II", icon: Heart, title: "Plus belle que tu ne le vois", desc: "Quand tu te regardes, tu vois ce qui ne va pas. Moi je vois la fille qui me fait sourire avant même qu'elle parle." },
  { numeral: "III", icon: SparklesIcon, title: "Plus aimée que tu ne le sens", desc: "La dépression te chuchote que tu ne mérites rien. Elle ment. Tu es aimée, profondément, et tu le mérites pleinement." },
  { numeral: "IV", icon: Flower, title: "Plus douce que tu ne le penses", desc: "Ta tendresse est rare. Le monde a besoin de filles qui sentent les choses fort." },
  { numeral: "V", icon: Sun, title: "Plus brillante que tes notes", desc: "Que tes partiels se passent bien ou pas, ça ne change rien à qui tu es. Tu vaux infiniment plus qu'un bulletin." },
  { numeral: "VI", icon: Crown, title: "Une princesse, sans couronne", desc: "Pas besoin d'une tour, ni de cheveux longs. Tu es ma Raiponce — celle qui voit la lumière même les jours sombres." },
];

function Affirmations() {
  return (
    <PageFrame>
      <div className="w-full text-center">
        <motion.h1
          className="font-display text-burgundy"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Tu es <span className="font-script text-rose-deep">tellement</span>
        </motion.h1>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.numeral}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col items-center rounded-xl border border-rose-soft bg-white/40 p-6 text-center shadow-[0_4px_24px_-8px_oklch(0.62_0.13_10/0.25)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_12px_36px_-8px_oklch(0.62_0.13_10/0.35)]"
              >
                <span className="absolute left-0 right-0 top-0 mx-auto h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                <span className="font-display text-sm tracking-[0.3em] text-gold">{c.numeral}</span>
                <Icon className="mt-3 h-8 w-8 text-gold" strokeWidth={1.4} />
                <h3 className="mt-4 font-display text-[1.4rem] leading-tight text-burgundy">
                  {c.title}
                </h3>
                <p className="mt-3 font-body italic leading-relaxed text-burgundy-soft">
                  {c.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageFrame>
  );
}
