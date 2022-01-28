import React from 'react'
import SHOP_DATA from './Shop_data';
import Preview_collection from '../components/preview_collection/Preview_collection';

class ShopPage extends React.Component {
   constructor(props){
       super(props);

       this.state={
           collections:  SHOP_DATA
       }
   }


   render(){
       const {collections}=this.state;
       return(
            collections.map(({id,...otherCollectionprops})=>(
                <Preview_collection key={id} {...otherCollectionprops}/>
            ))
        )
   }
}

export default ShopPage;