import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import axios from '../../../axios.orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index'

class ContactData  extends Component{

state ={
   orderForm:{

        name:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Name'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        street:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Street'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
            },
        zipcode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'ZIP Code'
            },
            value:'',
            validation:{
                required:true,
                minLength:5,
                maxLength:5
            },
            valid:false,
            touched:false
        },
        country:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Country'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        email:{ 
            elementType:'input',
        elementConfig:{
            type:'email',
            placeholder:'Your Email'
        },
        value:'',
        validation:{
            required:true
        },
        valid:false,
        touched:false
    },
        deliveryMethod:{ 
            elementType:'select',
        elementConfig:{
           options:[{value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}]
        },
        value:'fastest',
        valid:true,
         validation:{},
    },
   },
   formIsValid:false

}

orderHandler =(event)=>{
    event.preventDefault();
    
    //console.log('total price'+ this.props.totalPrice);

    const formData={};
    for(let formElementIdentifier in this.state.orderForm ){
        formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
    }
    const order={

        ingredients:this.props.ings,
        price:this.props.price,
        orderData:formData
        
    }
    this.props.onOrderBurger(order)
   
}
checkValidity(value,rules){
let isValid=true;
if(rules.required){
    isValid=value.trim()!=='' && isValid;
}
if(rules.minLength){
   isValid=value.length>=rules.minLength && isValid
}
if(rules.maxLength){
    isValid=value.length<=rules.maxLength && isValid
}
return isValid;
}
inputChangedHandler=(event,inputIdentifier)=>{
    // console.log(event.target.value);
   
 const updatedOrderForm={
     ...this.state.orderForm
    }
    const updatedFormElement={...updatedOrderForm[inputIdentifier]};
    updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
   // console.log('updateIdentifier',updatedOrderForm[inputIdentifier]);
    updatedFormElement.value=event.target.value;
    updatedFormElement.touched=true;
   // console.log('orderForm',updatedOrderForm)
   //console.log(updatedFormElement);
   let formIsValid=true;
   for(let inputIdentifier in updatedOrderForm){
       formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;
       console.log(formIsValid);

   }
    updatedOrderForm[inputIdentifier]=updatedFormElement;

    this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
  //  console.log('updatedOrderForm',updatedOrderForm)
}

    
    render() { 
        const formElementsArray=[];
        for(let key in this.state.orderForm){
        
            formElementsArray.push({
          id:key,
        config:this.state.orderForm[key] 
    });
  //  console.log('key',this.state.orderForm)
}
let form=(
    <form onSubmit={this.orderHandler}>
    {formElementsArray.map(formElement=>(
        
        <Input      
             key={formElement.id} elementtype={formElement.config.elementType}
            elementconfig={formElement.config.elementConfig}
             value={formElement.config.value} 
             changed={(event)=>this.inputChangedHandler(event,formElement.id)}
             invalid={!formElement.config.valid}
             shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
             />
            
        ))}
        <div>{this.invalid ? <p>kjnjknj</p> : null}</div>
        <Button  btnType="Success" clicked={this.orderHandler}
        disabled={!this.state.formIsValid} >ORDER</Button>
        </form>
        );
        if(this.props.loading){
            form=<Spinner/>;
        }
        return(
            <div className="ContactData">
            <h4>Enter your contact data</h4>
            {form}
            </div>
            );
        }
        
    }
    const mapStateToProps=state=>{
        return{
         ings:state.burgerBuilder.ingredients,
         price:state.burgerBuilder.totalPrice,
         loading:state.order.loading
        }
    }

//     const mapDispatchToProps=dispatch=>{
// onOrderBurger:(orderData)=>dispatch(actions.purchaseBurgerStart(orderData))       

//     };
const mapDispatchToProps= dispatch =>{
    return{

        onOrderBurger : (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
    };
        export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios) );