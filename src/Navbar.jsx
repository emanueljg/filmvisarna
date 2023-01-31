import { useStates } from './utilities/states';
import { NavLink } from 'react-router-dom';

export default function Menu() {


  // Connect to the main state so we can read the menu
  // (that has been declared in the App component)
  const s = useStates('main');

  return  <nav>
    {/* Loop through the menu and display menu items */}
    {s.menu.map(({ label, path }) =>
      label ? <NavLink to={path}>{label}</NavLink> : null
    )}
  </nav>;
}