import { cn } from '@/lib/utils';
type CardProps = {
  title: string;
  content: string;
};

function Card({ title, content, className }: CardProps) {
  return (
    <>
      <div
        className={cn(
          `bg-foreground flex flex-col gap-2 text-background p-5 rounded-2xl flex-1 max-h-90`,
          className
        )}>
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="text-xl">{content}</p>
      </div>
    </>
  );
}

export { Card };
