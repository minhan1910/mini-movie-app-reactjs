/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from "./Button";
import { useState } from "react";
import SummaryWatchedMovie from "./SummaryWatchedMovie";
import WatchedMovieList from "./WatchedMovieList";

// Removed This
function WatchedBox() {
  const [isOpen2, setIsOpen2] = useState(true);

  function handleSetIsOpen2() {
    setIsOpen2((isOpen) => !isOpen);
  }
  return (
    <div className="box">
      <Button classNames="btn-toggle" onClick={handleSetIsOpen2}>
        {isOpen2 ? "–" : "+"}
      </Button>

      {isOpen2 && (
        <>
          {/* <SummaryWatchedMovie watched={watched} />
          <WatchedMovieList watched={watched} /> */}
        </>
      )}
    </div>
  );
}

export default WatchedBox;
