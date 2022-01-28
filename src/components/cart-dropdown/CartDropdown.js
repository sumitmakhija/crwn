import React from 'react';
import CustomButton from '../custom-button/CustomButton';
import './CartDropdown.scss'
import CartItem from '../cart-item/cart-item';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.Selectors';
import { createStructuredSelector } from 'reselect';
import {Link} from 'react-router-dom';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({cartItems,dispatch}) => {
  return (<div className='cart-dropdown'>
    <div className='cart-items'>
        {  cartItems.length?(
            cartItems.map(cartItem=>(<CartItem key={cartItem.id} item={cartItem}/>))
        ):
            <span className='empty-message'>your cart is empty</span>
        }
    </div>
    <CustomButton><Link to="/checkout" onClick={()=>dispatch(toggleCartHidden())}>GO TO CHECKOUT</Link></CustomButton>

  </div>
)};
const mapStateToProps=createStructuredSelector({
        cartItems: selectCartItems

});
export default connect(mapStateToProps)(CartDropdown);
 