import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "./firebase";

function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }
    } catch (firebaseError) {
      setError(firebaseError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <main className="screen">
        <div
          className="budget-panel"
          style={{
            maxWidth: "450px",
            margin: "80px auto",
          }}
        >
          <div className="step-label">
            TRAVELPILOT · ACCOUNT
          </div>

          <h1 className="screen-title">
            {isRegister ? "Create your " : "Welcome "}
            <span>account</span>
          </h1>

          <p>
            {isRegister
              ? "Create an account to start planning your trips."
              : "Log in to continue your travel planning journey."}
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">EMAIL</label>

            <input
              id="email"
              className="large-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <br />
            <br />

            <label htmlFor="password">PASSWORD</label>

            <input
              id="password"
              className="large-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={6}
              required
            />

            <br />
            <br />

            {error && (
              <p style={{ color: "crimson" }}>
                {error}
              </p>
            )}

            <button
              className="plan-button"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isRegister
                ? "Create Account"
                : "Login"}
            </button>
          </form>

          <br />

          <button
            type="button"
            onClick={() => {
              setIsRegister((current) => !current);
              setError("");
            }}
          >
            {isRegister
              ? "Already have an account? Login"
              : "New user? Create an account"}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Login;