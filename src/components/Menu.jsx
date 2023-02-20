import { useStates } from "../utilities/states";
import { NavLink } from "react-router-dom";

export default function Menu() {
  const s = useStates("main");

  return (
    <nav>
      {s.menu.map(({ label, path }) => (
        <NavLink to={path}>{label}</NavLink>
      ))}
    </nav>
  );
}
