import { useEffect } from "react";
import { Route,Routes } from "react-router-dom";
import { useDispatch} from "react-redux";
import CategoriesPreview from "../categories-preview/categories-preview";
import Category from "../category/category";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.util";
import { setCategories } from "../../store/categories/category.action";
import "./Shop.scss";

const Shop = () => {

  const dispatch=useDispatch();
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoriesArray));
    };

    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=":category" element={<Category/>}/>
    </Routes>
  );
};

export default Shop;