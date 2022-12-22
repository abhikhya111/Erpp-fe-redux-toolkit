import React from "react";
import CategorySubConditonTop from "../CategorySubConditonTop";
import CategoryList from "./CategoryList";

const AddCategory = () => {
  return (
    <div className="bg-white">
      <CategorySubConditonTop topTitle="Add Category" />
      <CategoryList />
    </div>
  );
};

export default AddCategory;
