import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Style/Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim());
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value.trim());
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value.trim());
  };

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/auth/send-verification`, {
        email,
      });
      setVerificationSent(true);
    } catch (error) {
      console.log(error);
      alert("Failed to send the verification code. Please try again.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/auth/change-password`,
        {
          email,
          newPassword,
          verificationCode,
        }
      );
      if (res.data.message === "Password successfully changed") {
        alert("Password successfully changed");
        navigate("/login");
      } else {
        alert(res.data.message); // Alert the message from the response
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again."); // Alert a generic error message
    }
    // Clear input fields after changing the password
    setEmail("");
    setNewPassword("");
    setVerificationCode("");
    setVerificationSent(false);
  };

  return (
    <div className="register-container">
      <h2>Change Password</h2>
      {!verificationSent ? (
        <form className="register-form" onSubmit={handleSendVerificationCode}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" className="register-button">
            Send Verification Code
          </button>
        </form>
      ) : (
        <form className="register-form" onSubmit={handleChangePassword}>
          <input
            type="text"
            placeholder="Verification Code"
            className="input-field"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="input-field"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <button type="submit" className="register-button">
            Change Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
