import React from "react";
import PrescriptionList from "../components/PrescriptionList";

function PrescriptionListPage() {
  return (
    <React.Fragment>
      <h1 className="container mx-auto my-5 font-semibold text-xl tracking-tight">
        Prescription List
      </h1>
      <div className="container mx-auto border p-3">
        <PrescriptionList />
      </div>
    </React.Fragment>
  );
}

export default PrescriptionListPage;
