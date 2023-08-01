import { Link } from 'react-router-dom';
import {auth} from "../../config/firebase";
import {useAuthState} from 'react-firebase-hooks/auth';  // npm install react-firebase-hooks
import {signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

// This is the Navbar components
// It represents navbar of the page
// This returns navbar with properly pages
export const Navbar = () => {
   //It gives the information about  user
   const [user] = useAuthState(auth);
   const navigate = useNavigate();
   // This funtion uses the other funtion sigOut from firebase
   const signUserOut = async () => {
      navigate("/");
      await signOut(auth);
   };
  return (
    <nav>
      <ul>
        {!user ? (
          <ul>
            <li>
              <Link to="/login"> Login </Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calculator">Calories Calulator</Link>
            </li>
          </ul>
          ) : (
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/calculator">Calories Calulator</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/create-diet">Create Diet</Link>
            </li>
            <li>
              <Link to="/my-diets">Show Diets</Link>
            </li>
            <li>
              <Link to="/create-post">Create Post</Link>
            </li>
          </ul>
        )}
        <div className="user">
          {user && (
            <ul>
              <li>
              <p> {user?.displayName} </p>
              </li>
              <li>
              <img src={user?.photoURL || ""} width="30" height="30"/>
              </li>
              <li>
              <button onClick={signUserOut}> Log Out</button>
              </li>
            </ul>
        )}
        </div>        
      </ul>
    </nav>
  );
};
