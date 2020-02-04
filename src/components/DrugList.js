import React from "react";
import { connect } from "react-redux";
import DrugListItem from "./DrugListItem";

function DrugList(props) {
  const { loading, drugs } = props;

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Drug</th>
          <th className="px-4 py-2">Description</th>
          <th className="px-4 py-2">View detail</th>
        </tr>
      </thead>
      <tbody>
        {loading && <p>LOADING</p>}
        {drugs.map(drug => (
          <DrugListItem key={drug.id} drug={drug} />
        ))}
      </tbody>
    </table>
  );
}

const mapStateToProps = state => ({
  loading: state.drugListReducer.loading,
  drugs: state.drugListReducer.drugs
});

export default connect(mapStateToProps)(DrugList);
