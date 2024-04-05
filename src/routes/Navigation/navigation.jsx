import { Fragment, useState, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import BrandLogo from './BrandLogo'; // Assuming this is a component for rendering a brand logo
import { SignOutUser } from '../../utils/firebase/firebase.util'; // Assuming this is a function for signing out a user
import { selectCurrentUser } from '../../store/user/user.selector';
import CardIcon from '../../components/cart-icon/cart-icon';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./navigation.scss";

const Navigation = () => {
  // Accessing currentUser from UserContext
  const currentUser=useSelector(selectCurrentUser)
  const isCartOpen=useSelector(selectIsCartOpen);
  const [alertOpen, setAlertOpen] = useState(false); // State for alert message
  

  // Function to handle sign out
  const handleSignOut = () => {
    // Perform sign out operation
    SignOutUser();

    // Display success message
    setAlertOpen(true);
  };

  // Function to close the alert
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <BrandLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>

          {currentUser ? (
            <span className='nav-link' onClick={handleSignOut}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to='/auth'>
              SIGN IN
            </Link>
          )}
          <CardIcon/>
        </div>
        {isCartOpen && <CartDropDown/>}
      </div>
      <Outlet />
      {/* Success alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity="success"
        >
          Signed out successfully!
        </MuiAlert>
      </Snackbar>
    </Fragment>
  );
};

export default Navigation;
