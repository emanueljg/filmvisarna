import React from "react";
import { useStates } from "../utilities/states";
import { useState } from "react";
import orderConfirmGenerate from "../utilities/random-order-confirmation";

import { Link, useParams, Routes, Route } from "react-router-dom";

export default function Booking() {
  const { moviePath } = useParams();
  const s = useStates("main");
  let order = s.orderForm;

  function handleSubmit(event) {
    event.preventDefault();
    order.error = null;
    if (
      order.numberOfChildren + order.numberOfAdults + order.numberOfSeniors ===
      0
    ) {
      order.error = "Choose at least one ticket!";
      return;
    }
    order.submitted = true;

    s.confirmationNumber = orderConfirmGenerate();
  }

  const movie = s.movies.find((movie) => movie.path === "/movie/" + moviePath);
  const description =
    movie &&
    movie.description
      .split("<p>")
      .map((x) => x.replace(/<\/p>/g, "")) // one array element per p tag
      .map((x) => <p className="movieDescription">{x}</p>); // new p tags as jsx

  const shownMovieAttrs = new Map();
  shownMovieAttrs.set("title", "Originaltitel");
  shownMovieAttrs.set("release", "Premiär");
  shownMovieAttrs.set("language", "Tal");
  shownMovieAttrs.set("subtitles", "Text");
  shownMovieAttrs.set("director", "Regi");
  shownMovieAttrs.set("actors", "Medverkande");
  for (const kv of Object.entries(movie || {})) {
    const shownAttr = shownMovieAttrs.get(kv[0]);
    // in-place replacement
    if (shownAttr) shownMovieAttrs[shownMovieAttrs.get(kv[0])] = kv[1];
    if (shownAttr) shownMovieAttrs[shownMovieAttrs.get(kv[0])] = kv[1];
  }

  return !order.submitted ? (
    <>
      <div className="bokning">
        <form onSubmit={handleSubmit}>
          <label>
            Epost:
            <input
              required
              placeholder="Din email"
              type="email"
              maxLength="50"
              {...order.bind("email")}
            />
          </label>
          <label>
            Tele:
            <input
              required
              placeholder="Ditt telefonnummer"
              type="text"
              minLength="8"
              maxLength="30"
              {...order.bind("phoneNumber")}
            />
          </label>

          <label>
            Antal barn
            <br />
            <button
              type="button"
              onClick={() =>
                order.numberOfChildren > 0 && order.numberOfChildren--
              }
            >
              -
            </button>
            <input
              type="number"
              min="0"
              max="10"
              {...order.bind("numberOfChildren")}
            />
            <button
              type="button"
              onClick={() =>
                order.numberOfChildren < 10 && order.numberOfChildren++
              }
            >
              +
            </button>
          </label>

          <label>
            Antal vuxen
            <br />
            <button
              type="button"
              onClick={() => order.numberOfAdults > 0 && order.numberOfAdults--}
            >
              -
            </button>
            <input
              type="number"
              min="0"
              max="10"
              {...order.bind("numberOfAdults")}
            />
            <button
              type="button"
              onClick={() =>
                order.numberOfAdults < 10 && order.numberOfAdults++
              }
            >
              +
            </button>
          </label>

          <label>
            Antal senior
            <br />
            <button
              type="button"
              onClick={() =>
                order.numberOfSeniors > 0 && order.numberOfSeniors--
              }
            >
              -
            </button>
            <input
              type="number"
              min="0"
              max="10"
              {...order.bind("numberOfSeniors")}
            />
            <button
              type="button"
              onClick={() =>
                order.numberOfSeniors < 10 && order.numberOfSeniors++
              }
            >
              +
            </button>
          </label>
          {order.error && <p className="error">{order.error}</p>}
          <button type="submit">Slutför din bokning</button>
        </form>
      </div>
    </>
  ) : (
    // if submitted
    <>
      <div className="bokning-klar">
        <h2>Tack så mycket för din bokning!</h2>
        <h3>Info</h3>
        <p>
          Din email:
          <br />
          {order.email}
        </p>
        <p>
          Ditt telefonnummer:
          <br />
          {order.phoneNumber}
        </p>
        <p>
          Antal barn biljetter.
          <br />
          {order.numberOfChildren}
        </p>
        <p>
          Antal vuxen biljetter.
          <br />
          {order.numberOfAdults}
        </p>
        <p>
          Antal senior biljetter.
          <br />
          {order.numberOfSeniors}
        </p>
        <h3>Boknings bekräftelse</h3>
        <h2>{moviePath}</h2>
        <p>Glöm inte att ta med detta bokningsnummer till föreställningen:</p>
        <p>{s.confirmationNumber}</p>
      </div>
    </>
  );
}
