import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircleHeart, Quote } from "lucide-react";
import { PageFrame } from "@/components/pour-toi/PageFrame";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "Quand tu as besoin de moi — Pour Toi" },
      { name: "description", content: "Un message différent à chaque fois." },
    ],
  }),
  component: Messages,
});

const MESSAGES = [
  "Si tu lis ça à 3h du matin et que tu n'arrives pas à dormir : respire. Demain, tu n'auras pas à être forte. Tu auras juste à te réveiller. C'est déjà énorme.",
  "Tes partiels, c'est juste un examen. Pas un jugement sur ta valeur. Que tu aies 5 ou 18, tu restes la fille que j'aime.",
  "Quand la dépression te dit « il va se lasser de toi »  c'est elle qui parle, pas la réalité. Je ne me lasse pas. Je ne me lasserai pas.",
  "T'as le droit d'être fatiguée. T'as le droit de ne pas vouloir parler. Reposer son esprit, c'est aussi une forme de courage.",
  "Pense à toi enfant. Cette petite fille mérite que tu sois douce avec toi-même aujourd'hui.",
  "Tu n'as pas raté ta vie. Tout est encore possible, même si aujourd'hui ça ne semble pas l'être.",
  "Allah ne te donne pas plus que ce que tu peux porter. Cette épreuve, tu vas la traverser, in cha Allah.",
  "Quand tu te sens petite, rappelle-toi : Raiponce a passé 18 ans dans une tour avant de découvrir qui elle était. Ton moment arrive.",
  "Tu ne m'embêtes JAMAIS avec tes émotions. C'est exactement ça, aimer quelqu'un  être là pour les jours difficiles aussi.",
  "Tu mérites du repos. Tu mérites du jus d'orange frais. Tu mérites un câlin de 20 minutes. Tu mérites toutes les petites choses.",
  "Tes amies t'aiment. Ta famille t'aime. Moi je t'aime. Tu n'es pas seule.",
  "Si tu te sens vraiment mal  appelle-moi. Peu importe l'heure.",
  "Un jour, tu repenseras à cette période et tu seras fière d'avoir tenu bon.",
  "T'es magnifique en jogging. T'es magnifique sans maquillage. T'es magnifique tout le temps.",
  "Manger, dormir, boire de l'eau. Si tu fais ça aujourd'hui, c'est déjà une victoire.",
  "Je préfère mille fois être avec toi dans tes mauvais jours qu'avec n'importe qui d'autre dans ses meilleurs jours.",
];

function Messages() {
  const [idx, setIdx] = useState<number | null>(null);
  const [count, setCount] = useState(0);

  const draw = () => {
    let next = Math.floor(Math.random() * MESSAGES.length);
    if (next === idx) next = (next + 1) % MESSAGES.length;
    setIdx(next);
    setCount((c) => c + 1);
  };

  return (
    <PageFrame tapToContinue={false}>
      <div className="w-full text-center">
        <motion.h1
          className="font-display text-burgundy"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Quand tu as <span className="font-script text-rose-deep">besoin</span> de moi
        </motion.h1>
        <motion.p
          className="mt-4 font-body italic text-burgundy-soft"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Touche le bouton. Un message différent à chaque fois.
        </motion.p>

        <motion.button
          onClick={draw}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-gold bg-gradient-to-r from-burgundy to-burgundy-soft px-8 py-4 font-display text-cream shadow-[0_8px_28px_-10px_oklch(0.32_0.085_15/0.5)] transition-shadow hover:shadow-[0_14px_36px_-10px_oklch(0.32_0.085_15/0.6)]"
          style={{ letterSpacing: "0.18em", fontSize: "0.95rem" }}
        >
          <MessageCircleHeart className="h-5 w-5 text-gold-light" />
          Donne-moi un message
        </motion.button>

        <div className="mt-10 min-h-[200px]">
          <AnimatePresence mode="wait">
            {idx !== null && (
              <motion.div
                key={count}
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative mx-auto max-w-xl rounded-xl border border-gold/60 bg-cream p-10 shadow-[0_10px_30px_-12px_oklch(0.62_0.13_10/0.35)]"
              >
                <Quote className="absolute left-4 top-4 h-6 w-6 -scale-x-100 text-gold/70" />
                <Quote className="absolute bottom-4 right-4 h-6 w-6 text-gold/70" />
                <p className="font-body text-[1.25rem] italic leading-[1.7] text-burgundy">
                  {MESSAGES[idx]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageFrame>
  );
}
