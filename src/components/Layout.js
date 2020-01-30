import React from "react";
import Header from "./Header";

// const Layout = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
// `

// const Container = styled.div`

// `

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
