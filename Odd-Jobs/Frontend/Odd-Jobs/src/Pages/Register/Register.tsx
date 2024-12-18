import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterData {
  userName: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();

  const [RegisterData, setRegisterData] = useState<RegisterData>({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/users/register",
        RegisterData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/login");
    } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios-specific error handling
          setErrorMessage(
            error.response?.data?.message || "An error occurred during registration."
          );
        } else {
          // Fallback for non-Axios errors
          setErrorMessage("An unexpected error occurred.");
        }
        console.error(error);
      }
    };

  return (
    <>
      <div className="form-wrapper">
        <div className="form-title">
          <h1>Register</h1>
        </div>

        <form className="form-group" onSubmit={handleSubmit}>
          {/* {errorMessage && <p className="error-message"{errorMessage}></p>} */}

          <div className="form-field">
            <label htmlFor="userNAme" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              className="form-control"
              placeholder="Enter your username..."
              value={RegisterData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password..."
              value={RegisterData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password..."
              value={RegisterData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-bottom">
            <button className="form-btn">Registers</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
