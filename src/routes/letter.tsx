import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles as SparklesIcon, BookOpen } from "lucide-react";
import { PageFrame } from "@/components/pour-toi/PageFrame";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "Une lettre — Pour Toi" },
      { name: "description", content: "Avant de commencer, quelques mots." },
    ],
  }),
  component: Letter,
});

const PARAS = [
  "Je sais que tu traverses une période difficile. Je sais que la vie pèse, que les partiels te stressent, et que parfois tu te demandes si tu es à la hauteur  de tes études, de toi-même, de nous.",
  "Alors j'ai fait ce site. Pas pour te dire quoi penser. Pas pour effacer ce que tu ressens. Mais pour qu'il existe quelque part un endroit, à toi, où tu peux revenir quand la voix dans ta tête te ment.",
  "Tu n'as rien à prouver. Tu es déjà assez, exactement comme tu es aujourd'hui  fatiguée, stressée, doutante. Tu es assez.",
];

function Letter() {
  return (
    <PageFrame>
      <div className="w-full text-center">
        <motion.div
          className="mb-6 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <SparklesIcon className="h-4 w-4 text-gold" />
          <span className="text-overline">Une lettre pour toi</span>
          <SparklesIcon className="h-4 w-4 text-gold" />
        </motion.div>

        <motion.h1
          className="font-display text-burgundy"
          style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)", letterSpacing: "0.02em" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          Avant de <span className="font-script text-rose-deep">commencer</span>
        </motion.h1>

        <motion.div
          className="mx-auto mt-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="gold-divider h-px w-20" />
          <BookOpen className="h-4 w-4 text-gold" />
          <span className="gold-divider h-px w-20" />
        </motion.div>

        <div className="mx-auto mt-12 max-w-2xl space-y-7 text-left">
          {PARAS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.4, duration: 1 }}
              className="font-body leading-[1.85] text-burgundy-soft"
              style={{ fontSize: "1.15rem" }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.p
          className="font-script mt-12 text-rose-deep"
          style={{ fontSize: "2.2rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 1 }}
        >
          Pour toi, Malika 
        </motion.p>
      </div>
    </PageFrame>
  );
}
