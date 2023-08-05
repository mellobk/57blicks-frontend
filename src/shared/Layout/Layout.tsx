// import { chakra } from "@chakra-ui/react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Outlet } from "shared/Router";

export const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="pt-20 md:pt-24 pb-4 md:pb-6">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};
