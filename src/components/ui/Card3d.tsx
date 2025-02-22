import { cn } from "@/lib/utils";
import { Card } from "./card";

const Card3D = ({ children, className = "" }: any) => (
  <Card
    className={cn(
      "relative bg-white dark:bg-slate-800 rounded-xl",
      "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
      "hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
      "dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]",
      "dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]",
      "transform hover:-translate-y-1 transition-all duration-300",
      "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:rounded-xl",
      "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/5 after:to-transparent after:rounded-xl",
      "dark:before:from-white/10 dark:after:from-black/200",
      className
    )}
  >
    <div className="relative z-10">{children}</div>
  </Card>
);
export default Card3D;
