import Header from "./Header";
import { Helmet } from "react-helmet";

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Kakda Sophorn</title>
      </Helmet>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
