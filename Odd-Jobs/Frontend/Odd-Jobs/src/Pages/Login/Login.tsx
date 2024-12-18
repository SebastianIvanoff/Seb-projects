import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../Store/store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../Store/authSlice";

interface LoginData {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    userName: "",
    password: "",
  });

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = res.data;

      dispatch(login({ token: data.token, userId: data.userId }));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-title">
        <h1>Logga in</h1>
      </div>

      <form className="form-group" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="userNAme" className="form-label">
            Username:
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="form-control"
            placeholder="Username..."
            value={loginData.userName}
            onChange={handelChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Password..."
            value={loginData.password}
            onChange={handelChange}
          />
        </div>
        <div className="form-button">
          <Link to={"/register"} className="form-link">
            Register
          </Link>
          <button className="form-btn">Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
