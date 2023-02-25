import { useStates } from "../utilities/states";
import { useEffect } from "react";
import { kebabify } from "../utilities/kebabify";
import { createCategoryList } from "../utilities/createCategoryList";
import { createShowingsList } from "../utilities/createShowingsList";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import AboutUs from "./AboutUs";
import MovieDetail from "./MovieDetail";
import Tickets from "./Tickets";
import Footer from "./Footer";
import Header from "./Header";
import Booking from "./Booking";

export default function App() {
  function ScrollToTop({ children }) {
    let location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return children;
  }

  // Declare a state "main" that we can use in as many components as we want
  const s = useStates("main", {
    confirmationNumber: "",
    orderForm: {
      email: "",
      phoneNumber: "",
      numberOfAdults: 0,
      numberOfSeniors: 0,
      numberOfChildren: 0,
      submitted: false,
      error: null,
    },

    // A menu used for the main menu and for routing
    menu: [
      { path: "/", Component: Home },
      { label: "Biljetter", path: "/tickets", Component: Tickets },
      { label: "Om oss", path: "/about-us", Component: AboutUs },
      { path: "/movie/:moviePath", Component: MovieDetail },
      { path: "/movie/:moviePath/booking", Component: Booking },
    ],
    movies: [],
    categories: [],
    showing: [],
  });

  useEffect(() => {
    (async () => {
      let movies = await (await fetch("/api/detailed_movies")).json();
      for (let movie of movies) {
        movie.path = "/movie/" + kebabify(movie.title);
      }
      s.movies = movies;
      s.categories = createCategoryList(movies);
      s.showing = createShowingsList(movies);
    })();
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <header>
          <Header />
        </header>
        <main>
          {/* Routing - display the correct component */}
          <Routes>
            {s.menu.map(({ path, Component }) => (
              <Route path={path} element={<Component />} />
            ))}
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </ScrollToTop>
    </BrowserRouter>
  );
}
