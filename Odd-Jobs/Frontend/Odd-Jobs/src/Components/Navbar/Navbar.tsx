import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/store";
import { NavLink } from "react-router-dom";
import { logout } from "../../Store/authSlice";
import DarkModeButton from "./Dark Mode/DarkModeButton";


const Navbar: React.FC = () => {
  const { token, userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout()); // No arguments needed
  };


  
  return (
    <nav>
      {token ? (
        <div>
          <span>Welcome, User {userId}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <span>you are not logged in</span>
        </div>
      )}
      <NavLink to={"/login"}>Log in</NavLink>

      <DarkModeButton />
    </nav>
  );
};

export default Navbar;
