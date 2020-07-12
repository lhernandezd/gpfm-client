import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Dialog, DialogTitle, DialogContent, useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogOrigin: {
    [theme.breakpoints.up("sm")]: {
      left: "calc(0% + 100px)",
    },
  },
}));

const ModalForm = memo(({
  title, formComponent: FormComponent, handleModal, open,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullScreen={fullScreen}
      open={open}
      onClose={handleModal}
      aria-labelledby="form-dialog-add"
      classes={{
        paper: classes.dialogOrigin,
      }}
    >
      <DialogTitle id="form-dialog-add">{title}</DialogTitle>
      <DialogContent>
        {FormComponent && <FormComponent toggleForm={handleModal} />}
      </DialogContent>
    </Dialog>
  );
});

export default ModalForm;

ModalForm.propTypes = {
  handleModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/require-default-props
  formComponent: PropTypes.node,
};
