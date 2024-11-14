import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/auth/AuthProvider";
import Navbar from "../components/general/Navbar";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child routes
  return (
    <>
      <Navbar />
      <div className='bg-[#f8f8f8] border-t-2'>
        <div className="container-wrapper">
          <div className='breadcrumb py-2 text-xs text-gray-500'>
            Stock Movement / Pemindahan Barang
          </div>
          <div className="text-lg title font-semibold">
            Pemindahan Barang
          </div>
        </div>
      </div>
      <div className="container-wrapper mt-5">
        <Outlet />
      </div>
    </>
  );
};