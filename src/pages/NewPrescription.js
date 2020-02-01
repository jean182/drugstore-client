import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PrescriptionForm from "../components/PrescriptionForm";
import { newPrescription } from "../redux/modules/prescriptionList";

function NewPrescription(props) {
  const { add, history } = props;
  return (
    <React.Fragment>
      <h1 className="container mx-auto my-5 font-semibold text-xl tracking-tight">
        Add Prescription
      </h1>
      <div className="container mx-auto border p-3">
        <PrescriptionForm action={add} history={history} />
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      add: newPrescription
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(NewPrescription);
