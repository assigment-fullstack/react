import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, []);

  return children ? children : <Outlet />;
}
