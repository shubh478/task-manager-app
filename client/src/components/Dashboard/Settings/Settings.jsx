import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Settings.module.css";
import NameIcon from "../../../assets/NameIcon.svg";
import LockIcon from "../../../assets/LockIcon.svg";
import ViewIcon from "../../../assets/ViewIcon.svg";
import axios from "axios";

const ChangePassword = () => {
  const navigate = useNavigate();
  const Name = localStorage.getItem("name");
  const [formData, setFormData] = useState({
    name: Name,
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const { name, oldPassword, newPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      setError("All fields are required");
      return;
    }

    console.log("change password :", localStorage);
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = token;
      console.log(token);
      if (!token) {
        console.log("Token missing");
        return;
      }

      const response = await axios.post("/api/users/changepassword", formData);
      console.log(response.data);

      toast.success("Password changed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);

      setError("Password change failed. Please try again later.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerContent}>
        <ToastContainer />
        <div className={styles.text}>
          <h2>Settings</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={NameIcon} alt="" className={styles.icon} />
              <div className={styles.inpuText}>
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                  placeholder="Name"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={LockIcon} alt="" className={styles.icon} />
              <input
               type={showPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={handleChange}
                required
                placeholder="Old Password"
              />
              <div
                className={styles.viewIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={ViewIcon} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={LockIcon} alt="" className={styles.icon} />
              <input
                type={showPassword1 ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                required
                placeholder=" New Password"
              />
              <div
                className={styles.viewIcon}
                onClick={() => setShowPassword1(!showPassword1)}
              >
                <img src={ViewIcon} alt="" className={styles.viewIcon} />
              </div>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button}>
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
