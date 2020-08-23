import React from 'react';
import {withRouter} from 'react-router-dom';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger =(props) =>{
     let transformedInggredients=Object.keys(props.ingredients)
     .map(igKey=>{
         return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredient key={igKey+i} type={igKey} />
         });
     }).reduce((arr,el)=>{
         return arr.concat(el)
     },[]);
     console.log(transformedInggredients)
     if(transformedInggredients.length===0){
         transformedInggredients=<p>Please start adding Items</p>
     }
    return(
     <div className='Burger'>
<BurgerIngredient type='bread-top'/>
{transformedInggredients}
<BurgerIngredient type='bread-bottom'/>

     </div>
    );
};
export default withRouter(Burger);