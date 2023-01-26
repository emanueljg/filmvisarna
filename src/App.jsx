// useful hooks, comment these in, when needed:
import { useStates } from './utilities/states.js';
// import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Menu from './Menu.jsx';

export default function App() {

  const s = useStates('main', {
    menu: [
        // no components are here yet so I'm setting them
        // as null as placeholders
        { label: 'Tickets', path: '/tickets', Component: null },
        { label: 'Movies', path: '/movies', Components: null },
        { label: 'Theatres', path: '/theatres', Components: null },
        { label: 'Snacks', path: '/snacks', Components: null },
    ]
  });

  return <BrowserRouter>
    <header>
      <h1>Ironboy films</h1>
      <div className="menubar">
        <Menu/>
      </div>
    </header>
  </BrowserRouter>;
}
