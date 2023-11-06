import Layout from "../../components/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Select, Card } from "antd";
import "../../Style/Product.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState([]);
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setProducts(data.product.products);
      setId(data.product._id);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setDescription(data.product.description);
      setShipping(data.product.shipping);
      setCategory(data.product.category);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  console.log("Shipping : ", shipping);
  useEffect(() => {
    getSingleProduct();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Corrected typo

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token || auth.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:8000/api/product/update-product/${id}`,
        productData,
        config // Added the config
      );

      if (data.success) {
        alert("Product update successfully");
        navigate("/policy");
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
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

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout>
      <form className="wrapper-whole">
        <h1>Update Product</h1>
        <div className="select-container">
          <Select
            className="custom-select"
            bordered
            placeholder="Select a category"
            size="large"
            onChange={(value) => {
              setCategory(value);
            }}
            value={category}
          >
            {categories.map((categoryItem) => (
              <Select.Option key={categoryItem._id} value={categoryItem._id}>
                {categoryItem.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className="photo-upload-container">
          <label className="photo-upload-label">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              hidden
            />
          </label>
        </div>
        <div className="product-photo-container">
          {photo ? (
            <div className="product-photo-wrapper">
              <img
                src={URL.createObjectURL(photo)}
                alt="product-photo"
                className="product-photo"
              />
            </div>
          ) : (
            <div className="product-photo-wrapper">
              <img
                src={`http://localhost:8000/api/product/get-photo/${id}`}
                alt="product-photo"
                className="product-photo"
              />
            </div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={name}
            placeholder="write a name"
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="input-container">
          <textarea
            type="text"
            value={description}
            placeholder="Write a description"
            className="form-control form-textarea"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type="number"
            value={price}
            placeholder="Write a price"
            className="form-control form-input"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="input-container">
          <input
            type="number"
            value={quantity}
            placeholder="Write a quantity"
            className="form-control form-input"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="input-container">
          <Select
            bordered
            placeholder="Select Shipping"
            size="large"
            showSearch
            onChange={(value) => {
              setShipping(value);
            }}
            value={shipping ? "yes" : "no"}
          >
            <Option value="0">No</Option>
            <Option value="1">Yes</Option>
          </Select>
        </div>
        <button onClick={handleUpdate}>UPDATE</button>
      </form>
    </Layout>
  );
};

export default UpdateProduct;
