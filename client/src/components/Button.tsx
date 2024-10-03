type Props = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ children, onClick }: Props) => {
  return (
    <button
      role="button"
      aria-label="Click to perform an action"
      onClick={onClick}
      className="flex text-text cursor-pointer items-center rounded-base border-2 border-border dark:border-darkBorder bg-main px-4 py-2 text-sm font-base shadow-light dark:shadow-dark transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none dark:hover:shadow-none"
    >
      {children}
    </button>
  );
};

export default Button;
