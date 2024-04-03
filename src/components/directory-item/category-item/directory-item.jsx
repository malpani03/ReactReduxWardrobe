import "./directory-item.scss";
import { useNavigate } from "react-router-dom";

const Directoryitem=({category})=>{
    const{imageUrl,title,route}=category;
    const navigate=useNavigate();

    const onNavigateHandler=()=>navigate(route)
    return(
        <div className="directory-item-container" onClick={onNavigateHandler}>
          <div
            className="background-image"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="body">
            <h2 className="display-1">{title}</h2>
            <p>Shop now</p>
          </div>
        </div>
    )
}

export default Directoryitem