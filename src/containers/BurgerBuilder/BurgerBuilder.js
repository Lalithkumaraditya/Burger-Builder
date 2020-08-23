import React,{Component} from 'react';
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios.orders';
import * as actionTypes from '../../store/actions.js';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state={
           purchasing:false,
           loading:false,
           error:false
        }
    }
    componentDidMount () { 
//         axios.get('https://react-my-burger-b7891.firebaseio.com/ingredients.json')
//         .then(response=>{
//            this.setState({
//              ingredients:response.data
//            });
//         })
//         .catch(errpr=>{
// this.setState({error:true})
//         });
    }
    purchaseHandler=()=>{
        this.setState({purchasing:!(this.state.purchasing)});
}

purchaseCancelHandler=()=>{
    this.setState({purchasing:false});
}
    updatePurchaseState(ingredients){
        const sum=Object.keys(ingredients)
        .map(igkey =>{
          return ingredients[igkey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum >0;
    }
purchaseContinueHandler =()=>{
   // alert('You Continue');
//    this.setState({loading:true});
//    const order={
//        ingredients:this.state.ingredients,
//        price:this.state.totalPrice,
//        customer:{
//            name:'Lalith Kumar',
//            address:{
//                street:'dwaraka nagar',
//                zipcode:'517101',
//                country:'India'

//            },
//            email:'test@gmail.com'
//        },
//        deliveryMethod:'fastes'
//    }
//    axios.post('/orders.json',order)
//    .then(response => {this.setState({loading:false,purchasing:false});})
//    .catch(error =>
//     {this.setState({loading:false,purchasing:false});});

this.props.history.push('/checkout');

}
    render(){
        const disabledInfo={
          //  ...this.state.ingredients
          ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null;

        
        
        let burger= this.state.error ?<p>Ingradients cant be loaded</p> : <Spinner/>
        if(this.props.ings){

             burger=( 
                <Aux><Burger ingredients={this.props.ings}/>
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemove}
                disabled={disabledInfo}
                price={this.props.price}
                purchaseable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                />
                </Aux>
                );
                orderSummary = <OrderSummary ingredients={this.props.ings}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price}
                />;
        }
        if(this.state.loading){
            orderSummary=<Spinner/>;

        }
        return(

            <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} > 
            {orderSummary}
            </Modal>
          {burger}
            </Aux>
        );
    }

}
const mapStateToProps=state=>{
    return{
        ings:state.ingredients,
        price:state.totalPrice
    };
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>{dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName})},
        onIngredientRemove:(ingName)=>{dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})}
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));