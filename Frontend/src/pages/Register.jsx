import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import register2Img from "../assets/register2.png";
import wraithImg from '../assets/wraith.png';
import deltaImg from '../assets/delta.png';
import wImg from '../assets/w.jpg';

import '../styles/Register.css';

function Register() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (savedUser) {
      navigate('/Register');
    }
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value.trim();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;
    const repeatPassword = event.target.repeatPassword.value;
    const staySignedIn = event.target.staySignedIn.checked;

    const newErrors = {};

    if (!username) newErrors.username = "El nombre de usuario es obligatorio.";
    else if (username.length < 3) newErrors.username = "Debe tener al menos 3 caracteres.";

    if (!email) newErrors.email = "El email es obligatorio.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = "Email no válido.";
    }

    if (!password) newErrors.password = "La contraseña es obligatoria.";
    else if (password.length < 6) newErrors.password = "Debe tener al menos 6 caracteres.";

    if (password !== repeatPassword) newErrors.repeatPassword = "Las contraseñas no coinciden.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (staySignedIn) {
      localStorage.setItem('user', username);
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', username);
      localStorage.removeItem('user');
    }

    navigate('/dashboard');
  };

  return (
    <div className="container">
      <div className="left-panel">
        <img src={register2Img} alt="Desert Background" className="background" />
        <img src={wraithImg} alt="Wraith Logo" className="game-title" />
        <h1>WRAITH</h1>
        <p className="studio">
          <img src={deltaImg} alt="Delta Logo" className="studio-logo" />
          DELTA STUDIO
        </p>
      </div>

      <div className="right-panel">
        <img src={wImg} alt="Logo" className="logo" />
        <h2 className="register-title">Register</h2>
        <form id="registerForm" onSubmit={handleSubmit} noValidate>
          <input type="text" id="username" name="username" placeholder="USERNAME" />
          {errors.username && <p className="error">{errors.username}</p>}

          <input type="email" id="email" name="email" placeholder="EMAIL" />
          {errors.email && <p className="error">{errors.email}</p>}

          <input type="password" id="password" name="password" placeholder="PASSWORD" />
          {errors.password && <p className="error">{errors.password}</p>}

          <input type="password" id="repeatPassword" name="repeatPassword" placeholder="CONFIRM PASSWORD" />
          {errors.repeatPassword && <p className="error">{errors.repeatPassword}</p>}

          <label className="stay-signed">
            <input type="checkbox" id="staySignedIn" name="staySignedIn" />
            Stay signed in
          </label>
          <button type="submit" className="submit-btn">➜</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
