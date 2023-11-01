import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import "../../Style/Admindashboard.css";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/auth/users"
        );
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log(users);
  const data = users;

  return (
    <div className="admin-menu-container">
      {/* {auth.user && (
        <div className="admin-details">
          <h3>Admin name : {auth.user.name}</h3>
          <span>Phone : {auth.user.phone}</span>
          <p>Email : {auth.user.email}</p>
        </div>
      )} */}

      <div className="admin-card">
        <p>Admin Panel</p>
        <br />
        <NavLink to="/create-product" className="admin-link-card">
          Create Product
        </NavLink>
        <br />
        <NavLink to="/create-category" className="admin-link-card">
          Create Category
        </NavLink>
      </div>

      <h1>Total Users :</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created</th>
            <th>Phone</th>
            <th>Address</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{new Date(item.createdAt).toLocaleString()}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMenu;
