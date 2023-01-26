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
//    insert menu objects here
    ]
  });


  return <BrowserRouter>
    <header>
      <h1>Ironboy films</h1>
      <Menu/>
    </header>
  </BrowserRouter>;
}