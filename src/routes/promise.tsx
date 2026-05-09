import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { PageFrame } from "@/components/pour-toi/PageFrame";

export const Route = createFileRoute("/promise")({
  head: () => ({
    meta: [
      { title: "Et pour nous — Pour Toi" },
      { name: "description", content: "Une promesse pour nous deux." },
    ],
  }),
  component: PromisePage,
});

const PARAS = [
  "Tu m'as dit que je faisais partie des choses qui te stressent. Je t'entends. Je ne le prends pas mal.",
  "Tu n'as pas besoin d'être parfaite avec moi. Tu n'as pas besoin de répondre vite. Tu n'as pas besoin d'être de bonne humeur. Tu peux pleurer, te taire, disparaître quelques heures, douter, re-douter. Je ne pars pas.",
  "Prends soin de toi en premier. Ta santé mentale, ton sommeil, tes études. Si tu sens que c'est trop lourd, parle à quelqu'un  un médecin, un psy, ta famille, moi. Demander de l'aide, c'est être courageuse.",
  "Et même quand tu ne crois plus en toi  moi, je crois en toi.",
];

function PromisePage() {
  return (
    <PageFrame className="bg-mesh">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 30%, oklch(0.32 0.085 15 / 0.35) 100%)",
        }}
      />
      <div className="relative z-10 w-full text-center">
        <motion.div
          className="mx-auto mb-6 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="gold-divider h-px w-20" />
          <HeartHandshake className="h-5 w-5 text-gold" />
          <span className="gold-divider h-px w-20" />
        </motion.div>

        <motion.h1
          className="font-display text-burgundy"
          style={{ fontSize: "clamp(2.4rem, 7vw, 4.5rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Et pour <span className="font-script text-rose-deep">nous</span>
        </motion.h1>

        <div className="mx-auto mt-12 max-w-2xl space-y-7 text-left">
          {PARAS.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.6, duration: 1 }}
              className="font-body leading-[1.85] text-burgundy"
              style={{ fontSize: "1.18rem" }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.p
          className="font-script mt-12 text-rose-deep"
          style={{ fontSize: "2.4rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1 }}
        >
          À toi, toujours.
        </motion.p>
      </div>
    </PageFrame>
  );
}
