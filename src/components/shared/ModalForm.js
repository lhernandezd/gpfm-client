/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Dialog, DialogTitle, DialogContent, useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogOrigin: {
    [theme.breakpoints.up("md")]: {
      left: "calc(0% + 100px)",
    },
  },
  dialogOriginMd: {
    left: "calc(0%)",
  },
}));

const ModalForm = memo(({
  title, formComponent: FormComponent, handleModal, open, modalProps,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const setClass = modalProps?.maxWidth === "md" ? classes.dialogOriginMd : classes.dialogOrigin;
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullScreen={fullScreen}
      open={open}
      onClose={handleModal}
      aria-labelledby="form-dialog-add"
      classes={{
        paper: setClass,
      }}
      maxWidth={modalProps?.maxWidth || "sm"}
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
  formComponent: PropTypes.node,
  modalProps: PropTypes.object,
};

ModalForm.defaultProps = {
  modalProps: {},
};
