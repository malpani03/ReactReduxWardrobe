import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useSelector} from "react-redux";
import { selectCategoriesLoading } from "../../store/categories/category.selector";
import CategoryPreview from "../../components/category-preview/category-preview";
import Spin from "../../components/spinner/spinner";
const CategoriesPreview = () => {
  const categoriesMap=useSelector(selectCategoriesMap);
  const isLoading=useSelector(selectCategoriesLoading);

  return (
    <>
      {isLoading? (<Spin/>):(
        Object.keys(categoriesMap).map((title) => {
          const products=categoriesMap[title];
          return(
          <CategoryPreview key={title} title={title} products={products}/>
          );
          })
      )
      }

    </>
  );
};

export default CategoriesPreview;
