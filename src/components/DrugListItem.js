import React from "react";
import { Link } from "react-router-dom";

function DrugListItem(props) {
  const { drug } = props;
  const { id, genericName, description } = drug;

  return (
    <tr>
      <td className="border px-4 py-2">{genericName}</td>
      <td className="border px-4 py-2">{description} per day</td>
      <td className="border px-4 py-2">
        <Link
          to={{
            pathname: `/drugs/${id}/`,
            state: {
              drug
            }
          }}
        >
          View Detail
        </Link>
      </td>
    </tr>
  );
}

export default DrugListItem;
