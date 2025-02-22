import { cn } from "@/lib/utils";
import { Card } from "./card";

const Card3D = ({ children, className = ""}) => (
  <Card className={cn(
    "relative bg-white/80 dark:bg-slate-900/80 rounded-xl backdrop-blur-lg",
    "shadow-[0_8px_30px_rgb(0,0,0,0.08)]", 
    "hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]",
    "dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]",
    "dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
    "transform hover:-translate-y-1 transition-all duration-300",
    "border border-sky-100/80 dark:border-sky-800/20",
    "before:absolute before:inset-0 before:bg-gradient-to-b before:from-sky-50/30 before:to-transparent before:rounded-xl before:pointer-events-none",
    "after:absolute after:inset-0 after:bg-gradient-to-t after:from-teal-50/30 after:to-transparent after:rounded-xl after:pointer-events-none",
    "dark:before:from-sky-900/10 dark:after:from-teal-900/10",
    className
  )}>
    <div className="relative z-10">
      {children}
    </div>
  </Card>
);

export default Card3D