import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

export interface CustomButtonProps extends ButtonProps {
  /**
   * Additional custom prop indicating if the button should be styled differently
   * (for demonstration purposes of TypeScript interface extending)
   */
  isHighlighted?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  isHighlighted = false,
  children,
  sx,
  ...props
}) => {
  return (
    <Button
      {...props}
      sx={{
        ...(isHighlighted && {
          border: '2px solid',
          borderColor: 'secondary.main',
          boxShadow: 2,
        }),
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
