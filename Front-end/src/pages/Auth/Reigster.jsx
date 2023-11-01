import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value.trim());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value.trim());
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value.trim());
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value.trim());
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/auth/register`, {
        name,
        email,
        password,
        address,
        phone,
      });
      if (res) {
        alert("Registration successfully registered");
        navigate("/");
      } else {
        alert(res.data.error); // Alert the error message from the response
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again."); // Alert a generic error message
    }
    // Clear input fields after registration
    setName("");
    setEmail("");
    setPassword("");
    setAddress("");
    setPhone("");
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form className="register-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          className="input-field"
          value={name}
          onChange={handleNameChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <input
          type="text"
          placeholder="Phone number"
          className="input-field"
          value={phone}
          onChange={handlePhoneChange}
          required
        />
        <textarea
          placeholder="Address"
          className="address-field"
          value={address}
          onChange={handleAddressChange}
          required
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
