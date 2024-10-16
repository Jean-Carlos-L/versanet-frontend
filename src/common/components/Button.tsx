function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps): JSX.Element {
  return (
    <button onClick={onClick} className="btn btn-active" type={type}>
      {children}
    </button>
  );
}

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean; // Add the disabled prop
}

export default Button;
