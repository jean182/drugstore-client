import React from "react";
import { Link } from "react-router-dom";

function PrescriptionListItem(props) {
  const { deleteAction, prescription } = props;
  const {
    additionalNotes,
    dose,
    drug,
    firstName,
    frequency,
    id,
    lastName
  } = prescription;
  const { genericName } = drug;

  function onDelete(event) {
    event.preventDefault();
    deleteAction(prescription.id);
  }
  return (
    <tr>
      <td className="border px-4 py-2">{`${firstName} ${lastName}`}</td>
      <td className="border px-4 py-2">{genericName}</td>
      <td className="border px-4 py-2">
        {dose}
        <span className="lowercase text-indigo-500">mg</span>
      </td>
      <td className="border px-4 py-2">{frequency} per day</td>
      <td className="border px-4 py-2">{additionalNotes}</td>
      <td className="border px-4 py-2">
        <Link
          to={{
            pathname: `/prescription/${id}/edit`,
            state: {
              prescription
            }
          }}
        >
          Edit
        </Link>
        <button className="ml-3" type="button" onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default PrescriptionListItem;
