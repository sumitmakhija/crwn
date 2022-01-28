import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config={
    apiKey: "AIzaSyCHa__TTfRtF51lbumxvcYsz92lCKK91FE",
    authDomain: "crwn-db-868f4.firebaseapp.com",
    projectId: "crwn-db-868f4",
    storageBucket: "crwn-db-868f4.appspot.com",
    messagingSenderId: "259963068447",
    appId: "1:259963068447:web:a590240a3746401067752a"
  };


  export const createUserProfileDocument = async (userAuth,additionalData)=>{
      if(!userAuth) return;
      const  userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot= await userRef.get();
      
      if(!snapShot.exists){
          const {displayName,email}=userAuth;
          const createdAt=new Date();
          try{
                await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                })
          }catch(error){
              console.log('error while creating user', error.message);

          }
      }

      return userRef;
  }


  firebase.initializeApp(config);

  export const auth=firebase.auth();
  export const firestore=firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle=()=>auth.signInWithPopup(provider);

  export default firebase;