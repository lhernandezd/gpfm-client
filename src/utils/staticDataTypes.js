import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import BusinessIcon from "@material-ui/icons/Business";
import AssignmentIcon from "@material-ui/icons/Assignment";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";

export const navigationLinks = [
  {
    text: "Home",
    href: "/home",
    IconComponent: HomeIcon,
  },
  {
    text: "Users",
    href: "/users",
    IconComponent: AssignmentIndIcon,
  },
  {
    text: "Patients",
    href: "/patients",
    IconComponent: PeopleAltIcon,
  },
  {
    text: "Histories",
    href: "/histories",
    IconComponent: AssignmentIcon,
  },
  {
    text: "Appointments",
    href: "/appointments",
    IconComponent: CalendarTodayIcon,
  },
  {
    text: "Entities",
    href: "/entities",
    IconComponent: BusinessIcon,
  },
  {
    text: "Agreements",
    href: "/agreements",
    IconComponent: BusinessCenterIcon,
  },
];

export const roles = [
  { name: "admin" },
  { name: "user" },
];

export const documentTypes = [
  { name: "cc" },
  { name: "ti" },
  { name: "pa" },
];

export const genders = [
  { name: "male" },
  { name: "female" },
  { name: "No Binary" },
];

export const civilStatus = [
  { name: "single" },
  { name: "married" },
];

export const bloodTypes = [
  { name: "o-" },
  { name: "o+" },
  { name: "a-" },
  { name: "a+" },
  { name: "b-" },
  { name: "b+" },
  { name: "ab-" },
  { name: "ab+" },
];
