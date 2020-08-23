/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { startCase, get } from "lodash";
import { useDispatch } from "react-redux";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  Paper, Breadcrumbs, Typography, Link, IconButton,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import AddIcon from "@material-ui/icons/Add";
import ModalForm from "./ModalForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 50,
    padding: "0 20px",
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    marginRight: 5,
  },
  breadcrumb: {
    width: "100%",
    "& li:last-child": {
      flexGrow: 1,
    },
  },
  breadcrumbItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  breadcrumbSubItem: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    "&:hover": {
      color: fade(theme.palette.primary.light, 1),
    },
  },
}));

const MainDirection = ({
  classes, text, actions, state, model, add, handleModal,
}) => {
  const dispatch = useDispatch();
  const refreshAction = get(actions, "refresh", false);
  const refreshID = get(state, `${model}_id`, "");
  return (
    <>
      <div className={classes.breadcrumbSubItem}>
        <Typography color="textPrimary" variant="subtitle1" component="p" className={classes.title}>
          {startCase(text)}
        </Typography>
        {refreshAction && <AutorenewIcon className={classes.icon} fontSize="small" color="primary" onClick={() => refreshAction && dispatch(refreshAction(refreshID))} />}
      </div>
      {add
        && (
          <IconButton
            edge="end"
            aria-label="Add"
            onClick={handleModal}
            color="primary"
          >
            <AddIcon className={classes.icon} fontSize="small" />
          </IconButton>
        )}
    </>
  );
};

const DynamicDirection = memo(({
  routes, actions, views, location, model, modalComponents, modalProps,
}) => {
  const classes = useStyles();
  const routesLength = routes.length;
  const locationState = get(location, "state", false);
  const addForm = get(modalComponents, "add", false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return routesLength > 0 && (
    <>
      <Paper className={classes.paper} square>
        <Breadcrumbs
          classes={{
            root: classes.breadcrumb,
            li: classes.breadcrumbItem,
          }}
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {routesLength === 1
            ? (
              <MainDirection
                classes={classes}
                text={routes[0].title}
                actions={actions}
                state={locationState}
                model={model}
                add={!!addForm}
                handleModal={handleModal}
              />
            )
            : routes.map((route, index) => {
              if (index === routesLength - 1) {
                return (
                  <MainDirection
                    key={index}
                    classes={classes}
                    text={route.title}
                    actions={actions}
                    state={locationState}
                    model={model}
                    handleModal={handleModal}
                  />
                );
              }
              return (
                <Link key={index} color="inherit" component={RouterLink} to={route.path}>
                  {startCase(route.title)}
                </Link>
              );
            })}
        </Breadcrumbs>
      </Paper>
      <ModalForm
        formComponent={addForm}
        modalProps={modalProps}
        title={`Add ${startCase(model)}`}
        handleModal={handleModal}
        open={openModal}
      />
    </>
  );
});

export default DynamicDirection;

DynamicDirection.propTypes = {
  routes: PropTypes.array,
  actions: PropTypes.object,
  views: PropTypes.array,
  location: PropTypes.object,
  model: PropTypes.string,
  modalComponents: PropTypes.object,
  modalProps: PropTypes.object,
};

DynamicDirection.defaultProps = {
  routes: [],
  actions: null,
  views: [],
  model: null,
  location: null,
  modalComponents: {},
  modalProps: {},
};

MainDirection.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  model: PropTypes.string,
  actions: PropTypes.object,
  state: PropTypes.any.isRequired,
  add: PropTypes.bool,
  handleModal: PropTypes.func.isRequired,
};

MainDirection.defaultProps = {
  model: null,
  actions: {},
  add: false,
};
