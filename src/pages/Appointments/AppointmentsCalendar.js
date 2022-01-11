/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { mapKeys } from "lodash";
import { CircularProgress, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FullCalendar from "@fullcalendar/react";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ModalForm from "../../components/shared/ModalForm";
import CreateForm from "../../components/appointments/CreateForm";
import UpdateForm from "../../components/appointments/UpdateForm";
import { getAppointments } from "../../actions/appointments";

const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  },
}));

// eslint-disable-next-line no-unused-vars
const AppointmentsCalendar = ({ location, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState({});
  const appointments = useSelector((state) => state.appointments);

  const updatedAppointments = appointments.data.map((appointment) => {
    const test = mapKeys(appointment, (value, key) => {
      if (key === "start_date" || key === "end_date") {
        return key.replace("_date", "");
      }
      return key;
    });
    return test;
  });

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const handleCreateModal = () => {
    setOpenCreateModal(!openCreateModal);
  };

  const handleUpdateModal = () => {
    setOpenUpdateModal(!openUpdateModal);
  };

  const handleDateSelect = (selectInfo) => {
    setSelectedApp(selectInfo);
    handleCreateModal();
  };

  const handleEventClick = (clickInfo) => {
    setSelectedApp({
      appEvent: clickInfo.event,
      objectValues: clickInfo.event.toPlainObject(),
    });
    handleUpdateModal();
  };

  const renderEventContent = (eventInfo) => (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );

  return (
    <>
      {appointments.isFetching
        ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        )
        : (
          <Fade in={!appointments.isFetching}>
            <>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
                timeZone="America/Bogota"
                slotMinTime="06:00:00"
                slotMaxTime="20:00:00"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                initialView="timeGridWeek"
                selectable
                selectMirror
                dayMaxEvents
                initialEvents={updatedAppointments} // alternatively, use the `events` setting to fetch from a feed
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
              />
              <ModalForm
                formComponent={() => <CreateForm toggleForm={handleCreateModal} appointment={selectedApp} />}
                modalProps={{ maxWidth: "sm" }}
                title="Create Appointment"
                handleModal={handleCreateModal}
                open={openCreateModal}
              />
              <ModalForm
                formComponent={() => <UpdateForm toggleForm={handleUpdateModal} appointment={selectedApp} />}
                modalProps={{ maxWidth: "sm" }}
                title="Update Appointment"
                handleModal={handleUpdateModal}
                open={openUpdateModal}
              />
            </>
          </Fade>
        )}
    </>
  );
};

export default AppointmentsCalendar;

AppointmentsCalendar.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

AppointmentsCalendar.defaultProps = {
  location: {},
  history: {},
};
