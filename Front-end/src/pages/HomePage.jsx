import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const { auth } = useAuth();

  return (
    <Layout>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(auth, null, 5)}</pre>
    </Layout>
  );
};

export default HomePage;
