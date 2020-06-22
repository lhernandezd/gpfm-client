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
    text: "Clients",
    href: "/clients",
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
