import { cn } from "@/lib/utils";
type LogoParams = {
  width: number;
  height: number;
};
function Logo({ width, height, className }: LogoParams) {
  return <img src="/logo.png" alt="Logo" className={cn(`w-${width} h-${height}`, className)} />;
}

export { Logo };
