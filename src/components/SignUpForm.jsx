import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (formValidation()) {
      try {
        const response = await fetch(
          "https://fsa-jwt-practice.herokuapp.com/signup",
          {
            method: "POST",
            body: JSON.stringify({ username: username, password: password }),
          }
        );
        const result = await response.json();
        setToken(result.token);
        console.log(result);
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
    <div>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}
