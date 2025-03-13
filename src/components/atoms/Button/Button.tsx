import { Button, ButtonProps } from "@mui/material";

export interface AtomButtonProps extends ButtonProps {
  label?: string;
}

const AtomButton: React.FC<AtomButtonProps> = ({ label, ...props }) => (
  <Button
    variant="contained"
    disableFocusRipple
    {...props}
  >
    {label}
  </Button>
);

export default AtomButton;
