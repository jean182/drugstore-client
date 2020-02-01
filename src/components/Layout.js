import React from "react";
import Header from "./Header";

function LayoutWrapper(props) {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
      <footer>Footer</footer>
    </div>
  );
}

export default LayoutWrapper;
