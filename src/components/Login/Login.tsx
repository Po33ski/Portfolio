import {auth, provider} from '../../config/firebase';
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import './Login.css';
// This component handles the log in pop up
// On the project has been used google authentication
export const Login = () => {
    const navigate = useNavigate();
    
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        .then(() => {console.log("logged in")})
        .catch((error) => {
            console.log(error);
            navigate("/login");
        });
        navigate("/"); // redirection to home page (calculator)
    };

    return (
      <div className="login-container">
        <div className="login-card">
          <p>Sign In with Google To Continue</p>
          <div className="button-container">
            <button onClick={signInWithGoogle}>Sign In With Google</button>
          </div>
        </div>
    </div>
    );
};


