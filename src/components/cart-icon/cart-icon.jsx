import React from 'react';
import './cart-icon.scss'; // Import stylesheet
import CartLogo from './CartLogo'; // Import CartLogo component
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => {
        // Toggle the isCartOpen state in Redux store
        dispatch(setIsCartOpen(!isCartOpen));
    }

    return (
        <div className="cart-icon-container" onClick={toggleIsCartOpen}>
            <CartLogo className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
};

export default CartIcon; // Export CartIcon component
