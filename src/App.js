import React from 'react';
import Homepage from './pages/Homepage';
import './App.css';
import {Route,Switch, Routes,Navigate} from 'react-router-dom';
import ShopPage from './pages/Shop';
import Header from './components/Header/Header';
import Signinandsignup from './pages/sign-in-and-sign-up/Sign-in-and-sign-up';
import {auth, createUserProfileDocument} from './components/firebase/firebase.utils'
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.Selectors';
import {createStructuredSelector} from 'reselect'
import CheckOut from './pages/checkout/checkOut';





class App extends React.Component {
 

  unsubscribeFromAuth=null

  componentDidMount() {

    const {setCurrentUser}=this.props;
    this.unsubscribeFromAuth=auth.onAuthStateChanged( async userAuth=>{
      if(userAuth){
        const userRef =await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot=>{
          
            this.props.setCurrentUser({
              id:snapShot.id,
              ...snapShot.data()
            });
          });
          // console.log(this.state)
       
      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
  return (
    <div >
    <Header/>
<Routes>
      <Route exact path="/shop" element={<ShopPage/>}>
      

      </Route>
      <Route exact path="/checkout" element={<CheckOut/>}>
      </Route>
      {this.props.currentUser? <Route exact path="/" element={<Homepage />}></Route>:<Route exact path="/signin"
         element={<Signinandsignup/>}></Route>}

    </Routes>
 
    
    </div>
  );
}
};
const mapStateToProps=createStructuredSelector({
  currentUser: selectCurrentUser
})
const mapDispatchToProps=dispatch=>({
  setCurrentUser: user=>dispatch(setCurrentUser(user))
});

export default  connect(mapStateToProps,mapDispatchToProps)(App);
