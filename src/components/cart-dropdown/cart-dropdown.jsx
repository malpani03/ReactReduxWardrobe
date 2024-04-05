import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import CartItem from "../cart-item/cart-item";
import "./cart-dropdown.scss"
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartDropDown=()=>{

    const dispatch=useDispatch();

    const isCartOpen = useSelector(selectIsCartOpen);
    const navigate=useNavigate();

    const goToCheckOutHandler=()=>{
        dispatch(setIsCartOpen(!isCartOpen));
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