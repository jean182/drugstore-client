import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditPrescription from "../pages/EditPrescription";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import NewPrescription from "../pages/NewPrescription";
import PrescriptionListPage from "../pages/PrescriptionListPage";
import { getDrugList } from "../redux/modules/drugList";
import { getPrescriptionList } from "../redux/modules/prescriptionList";

function AppRouter(props) {
  const {
    getDrugs,
    getPrescriptions,
    loadingDrugs,
    loadingPrescriptions
  } = props;
  useEffect(() => {
    getDrugs();
    getPrescriptions();
  }, [getDrugs, getPrescriptions]);
  if (loadingDrugs || loadingPrescriptions) return null;
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/add" exact component={NewPrescription} />
        <Route path="/prescriptions" exact component={PrescriptionListPage} />
        <Route path="/:id/edit" exact component={EditPrescription} />
      </Layout>
    </Router>
  );
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  loadingDrugs: state.drugListReducer.loading,
  loadingPrescriptions: state.prescriptionListReducer.loading
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getDrugs: getDrugList,
      getPrescriptions: getPrescriptionList
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
