import React from "react";
import Layout from "../components/Layout";
import "../style/Pagenotfound.css";

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="not-found-container">
        <h1 className="errors-404">404 Errors</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
