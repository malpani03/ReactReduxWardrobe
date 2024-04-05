import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesLoading, selectCategoriesMap } from "../../store/categories/category.selector";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card";
import Spin from "../../components/spinner/spinner";
import "./category.scss";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>
            {isLoading ? (
                <Spin /> // Render spinner while loading
            ) : (
                <div className="category-container">
                    {products &&
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>
            )}
        </>
    );
};

export default Category;
