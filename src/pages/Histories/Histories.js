import React, { memo } from "react";
import HistoriesLayout from "./HistoriesLayout";

const Patients = memo((props) => (
  <HistoriesLayout {...props} />
));

export default Patients;
