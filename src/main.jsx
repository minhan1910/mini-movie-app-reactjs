/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StarRating from "./Components/StarRating.jsx";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movies was rated {movieRating} stars</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <App />
    // {/* <StarRating
    //   maxRating={5}
    //   messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    // />
    // <StarRating
    //   maxRating={10}
    //   size={24}
    //   color="red"
    //   className="test"
    //   defaultRating={3}
    // /> */}

    // {/* <Test /> */}
  // </React.StrictMode>
);
