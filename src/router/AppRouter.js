import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import NewPrescription from "../pages/NewPrescription";

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Home} />
        <Route path="/add" exact component={NewPrescription} />
      </Layout>
    </Router>
  );
}

export default AppRouter;
