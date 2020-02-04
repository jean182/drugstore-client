import React from "react";
import DrugList from "../components/DrugList";

function DrugListPage() {
  return (
    <React.Fragment>
      <h1 className="container mx-auto my-5 font-semibold text-xl tracking-tight">
        Drug List
      </h1>
      <div className="container mx-auto">
        <DrugList />
      </div>
    </React.Fragment>
  );
}

export default DrugListPage;
