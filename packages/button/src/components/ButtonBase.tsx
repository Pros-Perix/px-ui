import React from 'react';

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const ButtonBase: React.FC<ButtonBaseProps> = ({ children, className = '', ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
