import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PrescriptionListItem from "./PrescriptionListItem";
import { removePrescription } from "../redux/modules/prescriptionList";

function PrescriptionList(props) {
  const { deleteAction, loading, prescriptions } = props;

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">User</th>
          <th className="px-4 py-2">Drug</th>
          <th className="px-4 py-2">Dose</th>
          <th className="px-4 py-2">Frequency</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading && <p>LOADING</p>}
        {prescriptions.map(prescription => (
          <PrescriptionListItem
            key={prescription.id}
            prescription={prescription}
            deleteAction={deleteAction}
          />
        ))}
      </tbody>
    </table>
  );
}

const mapStateToProps = state => ({
  loading: state.prescriptionListReducer.loading,
  prescriptions: state.prescriptionListReducer.prescriptions
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteAction: removePrescription
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionList);
