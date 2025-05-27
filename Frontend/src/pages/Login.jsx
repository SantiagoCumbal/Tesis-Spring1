import { useEffect, useCallback } from "react";
import deltaImg from '../assets/delta.png';
import fondo from "../assets/fondo.jpg";
import logo from "../assets/logo.png";
import flecha from "../assets/felcha.png";
import wraith from "../assets/wraith.png";
import { Link, useNavigate } from "react-router-dom";


import "../styles/Login.css";

const CLIENT_ID = "34989899076-4ruvk9qrm3svqq4hgtpplku85qjms6oh.apps.googleusercontent.com";

const Login = () => {
  const navigate = useNavigate();

  const handleCredentialResponse = useCallback(async (response) => {
    const googleToken = response.credential;

    try {
      const res = await fetch("http://localhost:4000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: googleToken }),
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data);
      if (data.success) {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Error al enviar token al backend:", err);
    }
  }, [navigate]);

  useEffect(() => {
      if (window.google) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        ux_mode: "popup",
      });

      window.google.accounts.id.renderButton(
        document.getElementById("customGoogleBtnContainer"),
        { theme: "outline", size: "large" }
      );
    }
  }, [handleCredentialResponse]);


  return (
    <nav>
      <div className="panel-left">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Sign In</h2>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />

          <div className="form-check justify-between">
            <div className="d-flex align-items-center">
              <input type="checkbox" id="staySigned" className="form-check-input" />
              <label htmlFor="staySigned" className="form-check-label ms-2">
                Stay signed in
              </label>
            </div>
            <Link to="/register" className="register-link">
              Register
            </Link>
          </div>

          <div className="buttons-container">
            <div id="customGoogleBtnContainer"></div>

            <button type="submit" className="btn-submit" aria-label="Sign in">
              <img src={flecha} alt="Ir" />
            </button>
          </div>
        </form>
      </div>

      <div
        className="panel-right"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <img src={wraith} alt="Wraith" className="wraith" />
        <p className="studio">
                  <img src={deltaImg} alt="Delta Logo" className="studio-logo" />DELTA STUDIO</p>
      </div>
    </nav>
  );
};

export default Login;

