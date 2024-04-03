import {useEffect} from "react";
import { useDispatch } from "react-redux";

import { Routes, Route} from "react-router-dom";
import { onAuthStateChangedListner, createUserDocumentFromAuth } from "./utils/firebase/firebase.util";
import Home from "./routes/Home";
import Navigation from "./routes/Navigation/navigation";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/Shop/Shop";
import Checkout from "./routes/checkout/Checkout";
import {setCurrentUser} from './store/user/user.action'

const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChangedListner((user) => {
        if (user) {
            // If user is authenticated, create user document in Firebase
            createUserDocumentFromAuth(user);
        }
        // Set the current user state
        dispatch(setCurrentUser(user));
    });

    return unsubscribe;
}, [dispatch]); 
  return (
  <Routes>
    <Route path="/" element={<Navigation/>}>
      <Route index element={<Home/>}/>
      <Route path="shop/*" element={<Shop/>}/>
      <Route path="auth" element={<Authentication/>}/>
      <Route path="checkout" element={<Checkout/>}/>
    </Route>
    </Routes>
  );
};
export default App;
