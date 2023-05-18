import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface HintDialogProps {
  open: boolean;
  setOpen: Function;
  content: string;
}

const HintDialog: React.FC<HintDialogProps> = ({ setOpen, open, content }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      maxWidth={"xs"}
      PaperProps={{
        sx: {
          border: "1px solid #F3FB8C",
          backgroundColor: "primary.dark",
          color: "white",
        },
      }}
    >
      <DialogTitle variant="h4" color={'textPrimary'} sx={{ textAlign: "center" }}>
        {"HINT!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fs: "20px", color: "textPrimary" }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose} color={"secondary"}>
          Thanks
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HintDialog;
