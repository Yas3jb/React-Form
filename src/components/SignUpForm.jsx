import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (formValidation()) {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            body: JSON.stringify({ username, password }),
          }
        );
        const result = await response.json();
        setToken(result.token);
        console.log(result);
        setSuccessMessage(result.message);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  // Form validation

  function formValidation() {
    let message = "";
    if (!username) {
      message += "Please enter a username. ";
    } else if (username.length > 8) {
      message += "Username must be at least 8 characters long. ";
    }
    if (message) {
      setError(message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  return (
    <div className="form-container">
      <h2>Sign Up!</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
