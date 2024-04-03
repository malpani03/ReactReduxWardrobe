import { createAction } from "../../utils/reducers/reducers.util";
import { CART_ACTION_TYPES } from "./cart.types";

// Function to add an item to the cart
const addCartItem = (cartItems = [], productToAdd) => {
  if (!productToAdd) return cartItems; // Validate productToAdd

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Function to remove an item from the cart
const removeItemCart = (cartItems = [], cartItemToRemove) => {
  if (!cartItemToRemove) return cartItems; // Validate cartItemToRemove

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (!existingCartItem) return cartItems; // If item doesn't exist, return cartItems

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
const clearCartItem = (cartItems = [], cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

// Action creator to add an item to the cart
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// Action creator to remove an item from the cart
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeItemCart(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// Action creator to clear an item from the cart
export const clearItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = clearCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
