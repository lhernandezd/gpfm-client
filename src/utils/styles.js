const modalFormStyles = (theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  progress: {
    borderRadius: "2px 2px 0 0",
  },
  progressSkeleton: {
    height: 4,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    padding: "8px 16px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    "& button:last-child": {
      marginLeft: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
});

export {
  modalFormStyles,
};
