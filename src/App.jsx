// useful hooks, comment these in, when needed:
// import { useStates } from './utilities/states.js';
// import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

export default function App() {

  return <BrowserRouter>
    <header>
      <h1>Ironboy films</h1>
      {/* <Menu/> */}
    </header>
  </BrowserRouter>;
}