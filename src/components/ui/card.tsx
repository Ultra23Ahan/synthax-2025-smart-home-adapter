type CardProps = {
  title: string;
  content: string;
};

function Card({ title, content }: CardProps) {
  return (
    <>
      <div className="bg-foreground flex flex-col gap-2 text-background p-5 rounded-2xl flex-2 min-h-5 max-h-[20%]">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="text-xl">{content}</p>
      </div>
    </>
  );
}

export { Card };
