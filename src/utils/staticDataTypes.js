import HomeIcon from "@material-ui/icons/Home";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import BusinessIcon from "@material-ui/icons/Business";

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
    text: "Appointments",
    href: "/appointments",
    IconComponent: CalendarTodayIcon,
  },
  {
    text: "Companies",
    href: "/companies",
    IconComponent: BusinessIcon,
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
  { name: "o" },
  { name: "a" },
  { name: "b" },
  { name: "ab" },
];
