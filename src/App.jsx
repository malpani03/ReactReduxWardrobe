import {useEffect} from "react";
import { useDispatch } from "react-redux";

import { Routes, Route} from "react-router-dom";
import Home from "./routes/Home";
import Navigation from "./routes/Navigation/navigation";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/Shop/Shop";
import Checkout from "./routes/checkout/Checkout";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(checkUserSession())
}, []); 
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
