import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.scss"
import { ReactComponent as Logo } from "../../assets/crown.svg"
import { auth } from '../firebase/firebase.utils';
import CartIcon from '../cart-icon/CartIcon';
import { connect } from 'react-redux';
import CartDropdown from '../cart-dropdown/CartDropdown';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/cart/cart.Selectors';
import { selectCurrentUser } from '../../redux/user/user.Selectors';

const Header = ({ currentUser, hidden }) => {
    return (
        <div className='header'>
            <Link className="logo-container" to="/">
                < Logo className='logo' />

            </Link>
            <div className='options'>
                <Link className='option' to='./shop'>SHOP</Link>
                <Link className='option' to='./shop'>CONTACT</Link>
                {
                    currentUser ?
                        <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                        :
                        <Link className='option' to='/signin'>SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {
                hidden ? null :

                    <CartDropdown />
            }

        </div>
    )

}
//we can simply write state but for more destructuring and fetching from root reducer we will use this method. and instead of currentUser:state.user.currentUser we will do only currentUser.
const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
