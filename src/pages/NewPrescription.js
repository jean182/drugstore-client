import React from "react";
import PrescriptionForm from "../components/Form";

function NewPrescription() {
  return (
    <React.Fragment>
      <h1 className="container mx-auto my-5 font-semibold text-xl tracking-tight">
        Add Prescription
      </h1>
      <div className="container mx-auto border p-3">
        <PrescriptionForm />
      </div>
    </React.Fragment>
  );
}

export default NewPrescription;
