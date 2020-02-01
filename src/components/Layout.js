import React from "react";
import Header from "./Header";

function LayoutWrapper(props) {
  return (
    <div className="relative min-h-screen">
      <div className="pb-2">
        <Header />
        <main className="my-4">{props.children}</main>
        <footer className="absolute w-100 bottom-0 h-2 text-base m-2 my-2">
          © {new Date().getFullYear()} Made by Jean Aguilar
        </footer>
      </div>
    </div>
  );
}

export default LayoutWrapper;
