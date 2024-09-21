function Button({ children, onClick }: ButtonProps): JSX.Element {
   return (
      <button onClick={onClick} className="btn btn-active">
         {children}
      </button>
   )
}

interface ButtonProps {
   children: React.ReactNode;
   onClick: () => void;
}

export default Button;