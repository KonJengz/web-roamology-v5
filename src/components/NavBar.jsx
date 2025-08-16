import { Plane } from "lucide-react";
import { NotebookText } from "lucide-react";
import { UserRound } from "lucide-react";
import { NavLink } from "react-router";

function NavBar() {
  const menus = [
    {
      id: 1,
      text: "MY_TRAVEL",
      path: "/",
      icon: <Plane strokeWidth={2} width={20} />,
    },
    {
      id: 2,
      text: "GERMAN",
      path: "/german",
      icon: <NotebookText strokeWidth={2} width={20} />,
    },
    {
      id: 3,
      text: "ABOUT_ME",
      path: "/aboutme",
      icon: <UserRound strokeWidth={2} width={20} />,
    },
  ];

  return (
    <nav className="border-y border-roamology flex-center gap-6 py-2 mt-8">
      {menus.map((item) => (
        <NavLink
          className="text-roamology hover:text-roamology/60 duration-200 flex items-center gap-1 cursor-pointer"
          key={item.id}
          to={item.path}
        >
          {item.icon}
          {item.text}
        </NavLink>
      ))}
    </nav>
  );
}
export default NavBar;
