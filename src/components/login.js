import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Logged in successfully", "success");
    }
    else {
      props.showAlert("Invalid details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 className="my-3 text-center">Login to continue to Notebook</h2>
      <form
        onSubmit={handleSubmit}
        className="container mt-5"
        style={{ maxWidth: "500px" }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={credentials.email}
            onChange={onChange}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={credentials.password}
            onChange={onChange}
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
