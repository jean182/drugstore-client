import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PrescriptionForm from "../components/PrescriptionForm";
import { editPrescription } from "../redux/modules/prescriptionList";

function EditPrescription(props) {
  const { update, location, history } = props;
  const { state } = location;
  const { prescription } = state;
  return (
    <React.Fragment>
      <h1 className="container mx-auto my-5 font-semibold text-xl tracking-tight">
        Add Prescription
      </h1>
      <div className="container mx-auto border p-3">
        <PrescriptionForm
          prescription={prescription}
          history={history}
          action={update}
        />
      </div>
    </React.Fragment>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      update: editPrescription
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(EditPrescription);
