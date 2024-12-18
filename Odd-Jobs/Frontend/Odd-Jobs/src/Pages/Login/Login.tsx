import { useState } from "react"; // Import useState to manage component state
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation and useNavigate for programmatic navigation
import { AppDispatch } from "../../Store/store"; // Import AppDispatch type for dispatching actions
import { useDispatch } from "react-redux"; // Import useDispatch to dispatch Redux actions
import axios from "axios"; // Import axios for making HTTP requests
import { login } from "../../Store/authSlice"; // Import the login action to update the Redux store

// Interface defining the structure of login data
interface LoginData {
  userName: string;
  password: string;
}

const Login: React.FC = () => {
  // Initialize dispatch and navigate hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // State for holding form data
  const [loginData, setLoginData] = useState<LoginData>({
    userName: "",
    password: "",
  });

  // Handle changes in form input fields
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value, // Update the specific field based on input name
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Send login data to the server via an HTTP POST request
      const res = await axios.post(
        "http://localhost:8080/api/users/login",
        loginData, // Pass login data as the request payload
        {
          headers: { "Content-Type": "application/json" }, // Specify the request content type
        }
      );
      const data = res.data; // Get the response data

      // Dispatch the login action to update Redux store with the received token and userId
      dispatch(login({ token: data.token, userId: data.userId }));

      // Navigate to the homepage upon successful login
      navigate("/");
    } catch (error) {
      // Handle any errors (e.g., incorrect credentials)
      console.log(error);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-title">
        <h1>Log in</h1>
      </div>

      {/* Form for login */}
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
            onChange={handelChange} // Update userName state on change
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
            autoComplete="new-password" // Prevent browser autofill
            value={loginData.password}
            onChange={handelChange} // Update password state on change
          />
        </div>
        <div className="form-bottom">
          {/* Link to the registration page */}
          <Link to={"/register"} className="form-link">
            Register
          </Link>
          {/* Submit button for logging in */}
          <button className="form-btn">Log in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
