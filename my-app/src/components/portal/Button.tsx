// components/portal/Button.tsx
import { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded shadow hover:shadow-lg transition-shadow duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
