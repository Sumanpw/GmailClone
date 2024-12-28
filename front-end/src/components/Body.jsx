import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.app);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Body;
