import React from "react";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title }) => {
  return (
    <>
      <title>{title}</title>
      <Header/>
      <main style={{ minHeight: "90vh" }}>
        <Toaster />
        {children}
      </main>
    </>
  );
};

export default Layout;
