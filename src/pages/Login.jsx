import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/auth/AuthProvider";
import LoginForm from "../components/login/LoginForm";
import { useEffect } from "react";

const Login = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
console.log({token})
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token])

  const handleLogin = () => {
    setToken("this is a test token");
    navigate("/dashboard", { replace: true });
  };

  // setTimeout(() => {
  //   handleLogin();
  // }, 3 * 1000);
  return (
    <div className="w-screen h-screen apply-center bg-gray-100">
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
};

export default Login;