import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";
import "../../Style/Category.css";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const { auth } = useAuth();
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [newName, setNewName] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const setToken = (token) => {
    localStorage.setItem("token", token);
  };

  const getAllCategories = async () => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token || auth.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:8000/api/category/get-all-categories",
        config
      );

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      const headers = {
        Authorization: `Bearer ${token || auth.token}`,
        "Content-Type": "application/json",
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/category/create-category",
        { name },
        { headers }
      );

      if (data.success) {
        getAllCategories();
        setName("");
      } else {
        console.log(data); // Log the data to check the response received
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error", error.response.data);
        alert("An error occurred while creating the category");
      } else if (error.request) {
        console.error("No response received from the server", error.request);
        alert("No response received from the server");
      } else {
        console.error("An error occurred", error.message);
        alert("An error occurred while making the request");
      }
    }
  };

  // handle delete category

  const handleDelete = async (slug) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (shouldDelete) {
        const token = getToken();
        const headers = {
          Authorization: `Bearer ${token || auth.token}`,
        };

        const { data } = await axios.delete(
          `http://localhost:8000/api/category/delete-category/${slug}`,
          { headers }
        );

        if (data.success) {
          getAllCategories();
        } else {
          console.log(data); // Log the data to check the response received
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error", error.response.data);
        alert("An error occurred while deleting the category");
      } else if (error.request) {
        console.error("No response received from the server", error.request);
        alert("No response received from the server");
      } else {
        console.error("An error occurred", error.message);
        alert("An error occurred while making the request");
      }
    }
  };
  //handle Confirm delete

  //handle update
  const handleUpdate = async (slug, newName) => {
    try {
      const token = getToken();
      const headers = {
        Authorization: `Bearer ${token || auth.token}`,
        "Content-Type": "application/json",
      };

      const { data } = await axios.put(
        `http://localhost:8000/api/category/update-category/${slug}`,
        { name: newName },
        { headers }
      );

      if (data.success) {
        getAllCategories();
      } else {
        console.log(data); // Log the data to check the response received
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error", error.response.data);
        alert("An error occurred while updating the category");
      } else if (error.request) {
        console.error("No response received from the server", error.request);
        alert("No response received from the server");
      } else {
        console.error("An error occurred", error.message);
        alert("An error occurred while making the request");
      }
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token && auth.token) {
      setToken(auth.token);
    }
    getAllCategories();
  }, [auth.token]);

  return (
    <Layout>
      <h1 className="header-z">Create Category</h1>
      <div>
        <CategoryForm
          handleSubmit={handleSubmit}
          value={name}
          setValue={setName}
        />
      </div>
      <table className="category-table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.name}</td>
              <td>
                <button
                  className="button-style"
                  onClick={() => {
                    const newCategoryName = prompt(
                      "Enter the new category name",
                      category.name
                    );
                    if (newCategoryName) {
                      handleUpdate(category.slug, newCategoryName);
                    }
                  }}
                >
                  EDIT
                </button>
                <button
                  className="button-style-delete"
                  onClick={() => handleDelete(category.slug)}
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default CreateCategory;
