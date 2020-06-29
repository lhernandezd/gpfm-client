import React, { memo } from "react";
import UsersLayout from "./UsersLayout";

const Users = memo((props) => (
  <UsersLayout {...props} />
));

export default Users;
