import React from "react";
import { useStates } from "../utilities/states";
import { useState } from "react";

import { Link, useParams, Routes, Route } from "react-router-dom";

export default function Booking() {
  const { moviePath } = useParams();
  const s = useStates("main");
  let order = s.orderform;

  function handleSubmit(event) {
    event.preventDefault();
    order.error = null;
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

  return (
    <>
      <div className="biljetter">
        <h2>Välj antal biljetter</h2>
        <div></div>
      </div>
    </>
  );
}
