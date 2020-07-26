import React, { memo } from "react";
import PatientsLayout from "./PatientsLayout";

const Patients = memo((props) => (
  <PatientsLayout {...props} />
));

export default Patients;
