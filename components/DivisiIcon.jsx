import { Clapperboard, Crown, FileText, HandHeart, Landmark, Lightbulb, ScrollText, ShieldCheck, Sprout, Users, Wallet } from "lucide-react";

const peta = {
  bph: Crown,
  politik: Landmark,
  sosial: Users,
  kastrat: ScrollText,
  adkesma: ShieldCheck,
  sosma: HandHeart,
  psdm: Sprout,
  ekraf: Lightbulb,
  multimedia: Clapperboard,
  keuangan: Wallet,
  sekretaris: FileText
};

export default function DivisiIcon({ name, className }) {
  const Icon = peta[name] ?? Users;
  return <Icon className={className} aria-hidden />;
}
