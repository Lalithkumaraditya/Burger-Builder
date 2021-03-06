import React,{Component} from 'react';
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios.orders';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state={
           purchasing:false,
        
        }
    }
    componentDidMount () { 
       this.props.onInitIngredients()
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
    this.props.onInitPurchase();
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

        
        
        let burger= this.props.error ?<p>Ingradients cant be loaded</p> : <Spinner/>
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
        // if(this.state.loading){
        //     orderSummary=<Spinner/>;

        // }
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
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    };
}
const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded:(ingName)=>{dispatch(actions.addIngredient(ingName))},
        onIngredientRemove:(ingName)=>{dispatch(actions.removeIngredient(ingName))},
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase :() => dispatch(actions.purchaseInit())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));