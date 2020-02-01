import React from "react";
import PrescriptionForm from "../components/PrescriptionForm";

function EditPrescription(props) {
  const { location, history } = props;
  const { state } = location;
  const { prescription } = state;
  return (
    <React.Fragment>
      <h1 className="container mx-auto my-5 font-semibold text-xl tracking-tight">
        Add Prescription
      </h1>
      <div className="container mx-auto border p-3">
        <PrescriptionForm prescription={prescription} history={history} />
      </div>
    </React.Fragment>
  );
}

export default EditPrescription;
