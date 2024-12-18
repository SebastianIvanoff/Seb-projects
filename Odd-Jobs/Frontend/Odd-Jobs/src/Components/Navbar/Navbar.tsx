import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { NavLink } from "react-router-dom";
import { logout } from "../../Store/authSlice";
import DarkModeButton from "./Dark Mode/DarkModeButton";

const Navbar: React.FC = () => {
  const { token, userName } = useSelector((state: RootState) => state.auth); // Get userName from the store
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout()); // No arguments needed
  };

  return (
    <nav>
      {token ? (
        <div>
          <span>Welcome, {userName}</span> {/* Display userName */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <span>You are not logged in</span>
        </div>
      )}
      <NavLink to={"/login"}>Log in</NavLink>

      <DarkModeButton />
    </nav>
  );
};

export default Navbar;
