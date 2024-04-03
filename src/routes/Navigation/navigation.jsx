import { Fragment, useState, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import BrandLogo from './BrandLogo'; // Assuming this is a component for rendering a brand logo
import { SignOutUser } from '../../utils/firebase/firebase.util'; // Assuming this is a function for signing out a user
import { selectCurrentUser } from '../../store/user/user.selector';
import CardIcon from '../../components/cart-icon/cart-icon';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown';
import "./navigation.scss";

const Navigation = () => {
  // Accessing currentUser from UserContext
  const currentUser=useSelector(selectCurrentUser)
  const isCartOpen=useSelector(selectIsCartOpen);
  

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
            <span className='nav-link' onClick={SignOutUser}>
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
    </Fragment>
  );
};

export default Navigation;
