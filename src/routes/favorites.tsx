import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Utensils, GlassWater, Fish, Crown, Castle, Mic, Flame, MapPin,
  Flower, Tv, Swords, Heart, type LucideIcon,
} from "lucide-react";
import { PageFrame } from "@/components/pour-toi/PageFrame";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Tout ce que tu aimes — Pour Toi" },
      { name: "description", content: "Ton univers." },
    ],
  }),
  component: Favorites,
});

interface Item { icon: LucideIcon; title: string; note: string; }

const ITEMS: Item[] = [
  { icon: Utensils,   title: "Poulet pané",         note: "ton meal préféré" },
  { icon: GlassWater, title: "Jus d'orange",        note: "toujours frais" },
  { icon: Fish,       title: "Les poissons",        note: "ton animal fav, vise le background" },
  { icon: Crown,      title: "Raiponce",            note: "ta princesse" },
  { icon: Castle,     title: "Flynn Rider",         note: "(j'avoue je suis jaloux)" },
  { icon: Mic,        title: "Billie Eilish",       note: "ton celeb crush" },
  { icon: Flame,      title: "Latto",               note: "ta queen" },
  { icon: MapPin,     title: "L'Italie",            note: "notre futur voyage" },
  { icon: Flower,     title: "Le rose",             note: "ta couleur" },
  { icon: Tv,         title: "Shameless",           note: "ta série" },
  { icon: Swords,     title: "Seven Deadly Sins",   note: "ton anime" },
  { icon: Heart,      title: "Manger",              note: "ton hobby préféré" },
];

function Favorites() {
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
          Tout ce que <span className="font-script text-rose-deep">tu aimes</span>
        </motion.h1>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {ITEMS.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.55 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col items-center rounded-xl border border-rose-soft bg-white/40 p-5 text-center backdrop-blur-md transition-all duration-300 hover:border-gold hover:shadow-[0_10px_28px_-12px_oklch(0.62_0.13_10/0.35)]"
              >
                <motion.span
                  whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 0.6 }}
                  className="text-gold"
                >
                  <Icon className="h-8 w-8" strokeWidth={1.4} />
                </motion.span>
                <h3 className="mt-3 font-display text-lg leading-tight text-burgundy">
                  {it.title}
                </h3>
                <p className="mt-1 font-body text-sm italic text-burgundy-soft">
                  {it.note}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageFrame>
  );
}
