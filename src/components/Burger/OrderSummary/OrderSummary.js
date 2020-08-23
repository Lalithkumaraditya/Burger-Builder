import React,{Component} from 'react';
import Aux from '../../../hoc/Aux'
import Button from './../../UI/Button/Button';
import './OrderSummary.css';
import DrinkLogo from '../DrinkLogo/DrinkLogo'
class  OrderSummary  extends Component {

    componentDidUpdate(){
        console.log('[Order,suumary] willUpdate');
    }

    render(){
        const ingredientSummary=Object.keys(this.props.ingredients)
        .map(igKey=>{
             return <li key={igKey}><span style={{textTransform:'capitalize'}}>
             {igKey} </span> :
             {this.props.ingredients[igKey]}</li>
        });
        
            
      const Drink= (this.props.price >= 300) ? <div>
      <DrinkLogo/>
      </div>:<div></div> ;
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
            {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price}</strong></p>
            <p>Continue to Checkout ?</p>
            <div>{Drink}</div>
            <Button btnType='Danger' clicked={this.props.purchaseCanceled}>Cancel</Button>
            <Button btnType='Success' clicked={this.props.purchaseContinued}>Continue</Button>
        
            </Aux>
        );
    }
}
export default OrderSummary;