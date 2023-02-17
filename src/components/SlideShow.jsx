import { useEffect } from "react";
import { useStates } from "../utilities/states.js";

export default function SlideShow({ children }) {
  const switchSlideAfterMs = 120000;

  const l = useStates({
    slideShown: 0,
    withTransition: false,
    interval: false,
  });

  useEffect(() => {
    const keyListener = (e) => {
      e.which === 37 && back(); // left arrow key
      e.which === 39 && forward(); // right arrow key
    };
    window.addEventListener("keydown", keyListener);
    clearAndSetInterval();
    // the function you return from use effect
    // will run when the component unmount
    // - make sure to clean up intervals, listeners etc.
    return () => {
      clearInterval(l.interval);
      window.removeEventListener("keydown", keyListener);
    };
  }, []);

  function clearAndSetInterval() {
    clearInterval(l.interval);
    l.interval = setInterval(forward, switchSlideAfterMs);
  }

  function back() {
    if (l.withTransition) {
      return;
    }
    clearAndSetInterval();
    l.withTransition = true;
    l.slideShown--;
  }

  function forward() {
    if (l.withTransition) {
      return;
    }
    clearAndSetInterval();
    l.withTransition = true;
    l.slideShown++;
  }

  function transitionEnd() {
    l.withTransition = false;
    if (l.slideShown < 0) {
      l.slideShown = children.length - 1;
    }
    if (l.slideShown >= children.length) {
      l.slideShown = 0;
    }
  }

  return (
    <>
      <div className="slideShow">
        <div
          className={
            "slideShowInner " + (l.withTransition ? "withTransition" : "")
          }
          style={{
            left: -((l.slideShown + 1) * 100) + "%",
            width: children.length + 2 + "00%",
          }}
          onTransitionEnd={transitionEnd}
        >
          {[children[children.length - 1], ...children, children[0]].map(
            (slide) => (
              <div style={{ width: 100 / (children.length + 2) + "%" }}>
                {slide}
              </div>
            )
          )}
        </div>
      </div>
      <div className="slideShowControls">
        <button disabled={l.withTransition} onClick={back}>
          &lt;
        </button>
        <span>
          {(l.slideShown < 0 && children.length) ||
            (l.slideShown >= children.length && 1) ||
            l.slideShown + 1}{" "}
          / {children.length}
        </span>
        <button disabled={l.withTransition} onClick={forward}>
          &gt;
        </button>
      </div>
    </>
  );
}
