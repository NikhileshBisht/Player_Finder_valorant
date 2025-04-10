import React, { useState } from "react";
import back from "../../material/intro.mp4";
import styles from "./Intro.module.scss";
import Info from "./Info"
import Team from './Team'
import axios from 'axios';

const Intro = () => {
  const [isStart, setIsStart] = useState(false);
  const [isTeam, setIsTeam] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [isinfo, setIsinfo] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', loginData.username);
      formData.append('password', loginData.password);
  
      const response = await axios.post('http://localhost:8000/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      setError("");
      setIsLogin(false);
    } catch (err) {
      console.error(err.response?.data);
      setError("Invalid username or password");
    }
  };
  
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/register', registerData);
      setError("");
      setIsRegister(false);
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className={styles.videoContainer}>
      <video autoPlay loop muted className={styles.backgroundVideo}>
        <source src={back} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={styles.content}>
        {error && <div className={styles.error}>{error}</div>}
        
        {!token ? (
          <>
            {isLogin ? (
              <div className={styles.authForm}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  <button type="submit" className={styles.button49}>Login</button>
                </form>
                <p>
                  Don't have an account?{" "}
                  <button onClick={() => { setIsLogin(false); setIsRegister(true); }} className={styles.linkButton}>
                    Register
                  </button>
                </p>
              </div>
            ) : isRegister ? (
              <div className={styles.authForm}>
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={registerData.username}
                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  />
                  <button type="submit" className={styles.button49}>Register</button>
                </form>
                <p>
                  Already have an account?{" "}
                  <button onClick={() => { setIsRegister(false); setIsLogin(true); }} className={styles.linkButton}>
                    Login
                  </button>
                </p>
              </div>
            ) : (
              <>
                <h1>Welcome to Valorant Player Finder</h1>
                <button
                  className={styles.button49}
                  role="button"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
              </>
            )}
          </>
        ) : (
          <>
            {isTeam && isinfo && <Team />}
            {isPlayer && isinfo && <Info />}

            {!isTeam && !isPlayer && (
              <>
                {isStart ? (
                  <>
                    <h1>Searching... for</h1>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10%",
                      }}
                    >
                      <button
                        className={styles.button49}
                        role="button"
                        onClick={() => {
                          setIsTeam(true);
                          setIsinfo(true);
                          setIsStart(false);
                        }}
                      >
                        Team
                      </button>
                      <button
                        className={styles.button49}
                        role="button"
                        onClick={() => {
                          setIsPlayer(true);
                          setIsinfo(true);
                          setIsStart(false);
                        }}
                      >
                        Players
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h1>Welcome to Valorant Player Finder</h1>
                    <button
                      className={styles.button49}
                      role="button"
                      onClick={() => setIsStart(true)}
                    >
                      Click to Start
                    </button>
                    <button
                      className={styles.button49}
                      role="button"
                      onClick={handleLogout}
                      style={{ marginTop: '20px' }}
                    >
                      Logout
                    </button>
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Intro;
