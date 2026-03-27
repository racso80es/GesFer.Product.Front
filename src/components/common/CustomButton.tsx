import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export interface CustomButtonProps extends ButtonProps {
  customProp?: boolean;
}

const StyledButton = styled(Button)<CustomButtonProps>(({ theme, customProp }) => ({
  ...(customProp && {
    border: `2px solid ${theme.palette.secondary.main}`,
  }),
}));

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default CustomButton;
