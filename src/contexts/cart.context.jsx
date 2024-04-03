import { createContext, useReducer } from "react";

// Function to add an item to the cart
const addCartItem = (cartItems, productToAdd) => {
    // Find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // If found, increment quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }

    // Return new array with modified cartItems/new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

// Function to remove an item from the cart
const removeItemCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

// Function to clear an item from the cart
const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

// Create a context for cart state
export const CartContext = createContext({
    setIsCartOpen: () => { },
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    isCartOpen: true,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
})

const CART_ACTION_TYPES={
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN:'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};


const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            }

        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`)
    }

}

// CartProvider component to manage cart state
export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, isCartOpen, cartCount, cartTotal } = state;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch({ type: 'SET_CART_ITEMS', payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }})
    }


    // Function to add an item to the cart
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    // Function to remove an item from the cart
    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeItemCart(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    // Function to clear an item from the cart
    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen=(bool)=>{
        dispatch({type:CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool})
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartCount, cartTotal }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}
