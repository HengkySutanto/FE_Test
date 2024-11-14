import React from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '../auth/AuthProvider';

export default function Navbar() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  let { pathname } = useLocation();

  console.log({pathname})
  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };
  return (
    <div className="bg-[#f8f8f8]">
      <div className="container-wrapper h-[50px] flex justify-between items-center">
        <div className="font-bold">
          {token && pathname === '/dashboard' ? 'Warehouse Management System' : 'GIRI MAS INDAH'}
        </div>
        {token ? (
          <div className="flex gap-5 items-center">
            {pathname !== '/dashboard' && (
              <NavLink to={`/dashboard`} className={`hover:text-gray-500`}>Dashboard</NavLink>
            )}
            <div className="relative">
              <img src='Bell.svg' className='relative' />
              <div className="px-[3px] py-[1px] text-[.5rem] text-white bg-red-500 rounded-full absolute top-0 right-0 translate-x-2 -translate-y-2">11</div>
            </div>
            <div className='avatar flex gap-3 items-center relative py-1'>
              <img src='avatar.svg' />
              <div className="user">User</div>
              <div className="logout hidden absolute z-10 bottom-0 right-0 translate-y-full cursor-pointer bg-gray-200 p-2 rounded-lg">
                <div className='px-2 hover:bg-gray-50 rounded-md' onClick={handleLogout}>Logout</div>
              </div>
            </div>
          </div>
        )
          : <NavLink to='/login' className="flex gap-2">Login</NavLink>
        }
      </div>
    </div>
  )
}
