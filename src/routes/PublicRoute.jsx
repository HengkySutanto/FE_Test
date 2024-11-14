import { Outlet } from "react-router-dom";
import Navbar from "../components/general/Navbar";

export const PublicRoute = () => {
  return (
    <>
      <Navbar />
      <div className="container-wrapper">
        <Outlet />
      </div>
    </>
  );
};