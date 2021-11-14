import React, { memo } from "react";
import AppointmentsLayout from "./AppointmentsLayout";

const Appointments = memo((props) => (
  <AppointmentsLayout {...props} />
));

export default Appointments;
