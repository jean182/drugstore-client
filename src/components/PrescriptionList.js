import React from "react";
import { connect } from "react-redux";
import PrescriptionListItem from "./PrescriptionListItem";

function PrescriptionList(props) {
  const { prescriptions } = props;

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">User</th>
          <th className="px-4 py-2">Drug</th>
          <th className="px-4 py-2">Dose</th>
          <th className="px-4 py-2">Frequency</th>
        </tr>
      </thead>
      <tbody>
        {prescriptions.map(prescription => (
          <PrescriptionListItem
            key={prescription.id}
            prescription={prescription}
          />
        ))}
      </tbody>
    </table>
  );
}

const mapStateToProps = state => ({
  prescriptions: state.prescriptionListReducer.prescriptions
});

export default connect(mapStateToProps)(PrescriptionList);
