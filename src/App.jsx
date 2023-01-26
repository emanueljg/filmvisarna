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
        { label: 'Start page', path: '/', Component: null },
        { label: 'About', path: '/tickets', Components: null },
        { label: 'Theatres', path: '/theatres', Components: null },
        { label: 'Snacks', path: '/snacks', Components: null },
    ]
  });

  return <BrowserRouter>
    <header>
      <h1>Ironboy films</h1>
      <Menu/>
    </header>
  </BrowserRouter>;
}
