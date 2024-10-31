function Button({
  children,
  onClick,
  type = "button",
  theme = "dark"
}: ButtonProps): JSX.Element {
  return (
    <button onClick={onClick} className={`btn btn-active ${theme === "dark" ? "bg-gray-800 text-gray-50" : "bg-gray-100 text-gray-800 hover:bg-gray-500 hover:text-gray-50"}`} type={type}>
      {children}
    </button>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  theme?: "light" | "dark";
}

export default Button;
