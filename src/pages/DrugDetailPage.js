import React from "react";
import DrugDetail from "../components/DrugDetail";

function DrugDetailPage(props) {
  const { location } = props;
  const { state } = location;
  const { drug } = state;
  return (
    <React.Fragment>
      <DrugDetail drug={drug} />
    </React.Fragment>
  );
}

export default DrugDetailPage;
