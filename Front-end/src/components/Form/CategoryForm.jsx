import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Make sure to call preventDefault here
    handleSubmit(e, value);
  };

  return (
    <form onSubmit={handleFormSubmit} className="category-form">
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter new Category"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="input-style"
        />
      </div>
      <button type="submit" className="button-style">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
