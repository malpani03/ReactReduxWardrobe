import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import CartItem from "../cart-item/cart-item";
import "./cart-dropdown.scss"
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

const CartDropDown=()=>{

    const navigate=useNavigate();

    const goToCheckOutHandler=()=>{
        navigate('/checkout')
    }
    const cartItems=useSelector(selectCartItems);
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}/>
                ))}
            </div>
            <Button onClick={goToCheckOutHandler}>Checkout</Button>
        </div>
    )
}

export default CartDropDown