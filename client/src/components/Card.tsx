type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => {
  return (
    <div className="rounded-base border-2 border-border dark:border-darkBorder bg-main font-base w-[350px] h-[200px] p-4">
      {children}
    </div>
  );
};

export default Card;
