import { cn } from '@/lib/utils';
import Image from 'next/image';
type LogoParams = {
  size: number;
  className: string;
};
function Logo({ size, className }: LogoParams) {
  /* converts px to rem */
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={size * 4}
      height={size * 4}
      className={cn(className)}
    />
  );
}

export { Logo };
