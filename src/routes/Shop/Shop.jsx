import { useEffect } from "react";
import { Route,Routes } from "react-router-dom";
import { useDispatch} from "react-redux";
import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category";
import {fetchCategoriesStartAsync} from '../../store/categories/category.action'
import "./Shop.scss";

const Shop = () => {

  const dispatch=useDispatch();

  useEffect(() => {
      dispatch(fetchCategoriesStartAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=":category" element={<Category/>}/>
    </Routes>
  );
};

export default Shop;
