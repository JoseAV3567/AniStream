// src/Layout.js

import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

// Este componente define la estructura que tendrán todas tus páginas
function Layout() {
  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
