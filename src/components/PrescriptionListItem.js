import React from "react";
import { Link } from "react-router-dom";

function PrescriptionListItem(props) {
  const { prescription } = props;
  const { dose, drug, firstName, frequency, id, lastName } = prescription;
  const { genericName } = drug;
  return (
    <tr>
      <td className="border px-4 py-2">{`${firstName} ${lastName}`}</td>
      <td className="border px-4 py-2">{genericName}</td>
      <td className="border px-4 py-2">{dose}</td>
      <td className="border px-4 py-2">{frequency}</td>
      <td className="border px-4 py-2">
        <Link
          to={{
            pathname: `/${id}/edit`,
            state: {
              prescription
            }
          }}
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}

export default PrescriptionListItem;
